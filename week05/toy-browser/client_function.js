const net = require("net");

class Request {
  // method, url = host + port + path
  // body: k/v
  // headers
  constructor(options) {
    this.method = options.method || 'GET';
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || '/';
    this.body = options.body || {};
    this.headers = options.headers || {};
    if(!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    if(this.headers['Content-Type'] ===  'application/json') {
      this.bodyText = JSON.stringify(this.body);
    } else if(this.headers['Content-Type'] ===  'application/x-www-form-urlencoded') {
      this.bodyText = Object.entries(this.body).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&')
    }

    this.headers['Content-Length'] = this.bodyText.length;
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.entries(this.headers).map(([key, value]) => `${key}: ${value}`).join('\r\n')}\r
\r
${this.bodyText}`
  }

  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParse;
      if(connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString());
        })
      }
      connection.on('data', (data) => {
        parser.receive(data.toString())
        if(parser.isFinished) {
          resolve(parser.response);
        }
        connection.end();
      })
      connection.on('error', (err) => {
        reject(err);
        connection.end();
      })
      connection.on('end', () => {
        console.log('disconnected from server');
      })
    })
  }
}

class ResponseParse {
  constructor() {
    this.waiting_status_line = this.waiting_status_line.bind(this);
    this.waiting_status_line_end = this.waiting_status_line_end.bind(this);
    this.waiting_header_name = this.waiting_header_name.bind(this);
    this.waiting_header_space = this.waiting_header_space.bind(this);
    this.waiting_header_value = this.waiting_header_value.bind(this);
    this.waiting_header_line_end = this.waiting_header_line_end.bind(this);
    this.waiting_header_block_end = this.waiting_header_block_end.bind(this);
    this.waiting_body = this.waiting_body.bind(this);
    this.receiveChar = this.receiveChar.bind(this);

    this.statusLine = '';
    this.headers = {};
    this.headerName = '';
    this.headerValue = '';
    this.bodyParser = null;
  }

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished;
  }
  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }
  receive(string) {
    let state = this.receiveChar;
    for(let c of string) {
      state = state(c);
    }
  }
  waiting_status_line(char) {
    if(char === '\r') {
      return this.waiting_status_line_end;
    } else if(char === '\n') {
      return this.waiting_header_name;
    }
    this.statusLine += char;
    return this.waiting_status_line;
  }
  waiting_status_line_end(char) {
    if(char === '\n') {
      return this.waiting_header_name;
    }
    return this.waiting_status_line_end
  }
  waiting_header_name(char) {
    if(char === ':') {
      return this.waiting_header_space;
    } else if(char === '\r') {
      if(this.headers['Transfer-Encoding'] === 'chunked') {
        this.bodyParser = new ChunkedBodyParser()
      }
      return this.waiting_header_block_end;
    }
    this.headerName += char;
    return this.waiting_header_name;
  }
  waiting_header_space(char) {
    if(char === ' ') {
      return this.waiting_header_value;
    }
    return this.waiting_header_space
  }
  waiting_header_value(char) {
    if(char === '\r') {
      this.headers[this.headerName] = this.headerValue;
      this.headerName = ''
      this.headerValue = '';
      return this.waiting_header_line_end;
    }
    this.headerValue += char;
    return this.waiting_header_value;
  }
  waiting_header_line_end(char) {
    if(char === '\n') {
      return this.waiting_header_name;
    }
    
    return this.waiting_header_line_end;
  }
  waiting_header_block_end(char) {
    if(char === '\n') {
      return this.waiting_body;
    }
    this.waiting_header_block_end;
  }
  waiting_body(char) {
    return this.bodyParser.receiveChar(char);
  }
  receiveChar(char) {
    return this.waiting_status_line(char);
  }
}

class ChunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = this.WAITING_LENGTH.bind(this);
    this.WAITING_LENGTH_LINE_END = this.WAITING_LENGTH_LINE_END.bind(this);
    this.READING_CHUNK = this.READING_CHUNK.bind(this);
    this.WAITING_NEW_LINE = this.WAITING_NEW_LINE.bind(this);
    this.WAITING_NEW_LINE_END = this.WAITING_NEW_LINE_END.bind(this);
    this.END = this.END.bind(this);

    this.length = 0;
    this.content = [];
    this.isFinished = false;
  }
  END() {
    return this.END;
  }
  WAITING_LENGTH(char) {
    if(char === '\r') {
      if(this.length === 0) {
        this.isFinished = true;
        return this.END;
      }
      return this.WAITING_LENGTH_LINE_END;
    }
    // 一个坑：这里的长度其实是十六进制
    // 已修正
    this.length *= 16;
    this.length += parseInt(char, 16);
    return this.WAITING_LENGTH;
  }
  WAITING_LENGTH_LINE_END(char) {
    if(char === '\n') {
      return this.READING_CHUNK;
    }
    return this.WAITING_LENGTH_LINE_END;
  }
  READING_CHUNK(char) {
    // 一个坑：由于使用的是UTF8的编码方式，所以如果使用中文或者超过一个字节的字符，这里的长度会统计失败
    // 已修正
    this.content.push(char);
    this.length -= getUTF8Length(char);
    if(this.length === 0) {
      return this.WAITING_NEW_LINE;
    }
    return this.READING_CHUNK;
  }
  WAITING_NEW_LINE(char) {
    if(char === '\r') {
      return this.WAITING_NEW_LINE_END;
    }
    return this.WAITING_NEW_LINE;
  }
  WAITING_NEW_LINE_END(char) {
    if(char === '\n') {
      return this.WAITING_LENGTH;
    }
    return this.WAITING_NEW_LINE_END;
  }
  receiveChar(char) {
    return this.WAITING_LENGTH(char);
  }

}

function getUTF8Length(char) {
  let length = char.codePointAt().toString(2).length;
  return length <= 7 ? 1 : Math.ceil((length - 1 ) / 5); // 推理过程详见week02 homework.md 中的02，有详细的分析
}

void async function () {
  let request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: '8088',
    path: '/',
    headers: {
      ['X-Foo2']: 'customed' 
    },
    body: {
      name: 'mosiya'
    }
  });

  let response = await request.send();
  console.log(response);
}()

