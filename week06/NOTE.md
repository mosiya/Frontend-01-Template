## 本周总结

### 浏览器工作原理

可以由一道经典的面试题说起：当你在浏览器地址栏里敲下一段URL，到整个网页展示完毕，这个过程中浏览器都发生了什么？

答案可以很丰富，也可以很概括。在这一节课中，我们主要关注浏览器的工作原理，经过一些简化，这个过程大致可以分为以下几个步骤：

【 URL 】 --(HTTP)--> 【 HTML 】 --(parse)--> 【 DOM 】 --(css computing)--> 【 DOM with CSS 】 --(layout)--> 【 DOM with position 】 --(render)--> 【 Bitmap 】

#### 前置知识(感性认识)

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
