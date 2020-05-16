## 本周总结

## 浏览器工作原理

可以由一道经典的面试题说起：当你在浏览器地址栏里敲下一段URL，到整个网页展示完毕，这个过程中浏览器都发生了什么？

答案可以很丰富，也可以很概括。在这一节课中，我们主要关注浏览器的工作原理，经过一些简化，这个过程大致可以分为以下几个步骤：

【 URL 】 --(HTTP)--> 【 HTML 】 --(parse)--> 【 DOM 】 --(css computing)--> 【 DOM with CSS 】 --(layout)--> 【 DOM with position 】 --(render)--> 【 Bitmap 】

### 前置知识(感性认识)

+ 1 ISO七层网络协议（物数网传会表应）
  + 上三层实际上会合并为一层
  + 应用层 表示层 会话层 ------- HTTP -- require("http")
  + 传输层             ------- TCP -- require("net")
  + 网络层             ------- IP Internet
  + 数据链路层 物理层    ------- 4G/5G/WIFI

+ 2 TCP与IP的一些基础知识
  + 流 （TCP流式传输）
  + 包 （IP包）
  + 端口 （标识应用）
  + IP地址
  + require("net")
  + libnet/libpcap (C++使用)

+ 3 HTTP
  + Request
  + Response

### HTTP协议

#### Request

##### Request line
1.  Method
+ GET
+ POST
+ OPTIONS
+ HEAD
+ DELETE
+ PUT
+ TRACE
+ CONNECT

2. Path
3. HTTP1.0/HTTP2.0

##### Request headers

+ Content-Type
  + application/x-www-form-urlencoded
  + mutippart/form-data
  + text/xml
  + application/json
  
+ Content-Length

+ other k/v

##### （headers与body之间有一个空行）

##### Request body

+ data as the the type of headers.Content-Type


#### Response（使用状态机解析）

##### status line
+ HTTP1.0/HTTP2.0
+ Status Code
  + 1XX
  + 2XX
  + 3XX
  + 4XX
  + 5XX
+ Status Text

##### Response headers
##### （headers与body之间有一个空行）
##### Response body

常用的是Transfer-Encoding是chunked，一个chuncked前面是一个数字，表示接下来数据的字符数。Response body接收一个个chunked，直到接收一个为0的chunked为止


## 有限状态机

+ 每一个状态都是一个机器
  + 在每一个机器里，我们可以做计算、存储、输出等
  + 所有的这些机器接受的输入是一致的
  + 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，应该是纯函数（无副作用）

+ 每一个机器知道下一个状态
  + 每个机器都有确定的下一个状态（Moore）
  + 每个机器根据输入决定下一个状态（Mealy）

### JS中的有限状态机（Mealy）

```js
// 每个函数是一个状态
function state(input) {  // 函数参数就是输入
  // 在函数中，可以自由地编写代码，处理每个状态的逻辑
  return next; //返回值作为下一个状态
}
// 以下是调用
while(input) {
  // 获取输入
  state = state(inpust); // 把状态机的返回值作为下一个状态
}
```
