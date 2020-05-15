const http = require('http');

const server = http.createServer((req, res) =>{
  console.log('request received');
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('hello, mosiya. 你好哇，莫斯雅?2173 u@UNW!UE)m328eu!#$@%#$%^%#dMF;\'SLDJAKLDJ乱码是对的哈哈哈√说明很健壮');
})

server.listen(8088);