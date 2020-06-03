const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) =>{
  const fileName = path.resolve(__dirname, './index.html');
  console.log('request received');
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  // 文件读取的方式
  fs.readFile(fileName, (err, data) => {
    res.end(data);
    console.log('file get√')
  })
  // 数据流式传输方式
  // let stream = fs.createReadStream(fileName);
  // stream.pipe(res);
})

server.listen(8088);