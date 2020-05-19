const http = require('http');

const server = http.createServer((req, res) =>{
  console.log('request received');
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(
`<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Arithmetic Executor</title>
  <link rel="stylesheet" href="index.css" />
</head>
<body>
  <label for="input">Input:</label>
  <input style="width: 20em" type="text" id="input" value="" placeholder="please input a simple arithmetic expression" />
  <button id="calc">Calc</button>
  <span class="tip">You can trigger calc by press <code>Enter</code></span>
  <div class="result">
    <h1>Result:&ensp;</h1>
    <div id="result"></div>
  </div>
  <div class="result">
    <h1>Answer:&ensp;</h1>
    <div id="answer"></div>
  </div>
</body>
</html>`);
})

server.listen(8088);