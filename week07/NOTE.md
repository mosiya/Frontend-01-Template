## 本周总结

## 浏览器工作原理（续）

可以由一道经典的面试题说起：当你在浏览器地址栏里敲下一段URL，到整个网页展示完毕，这个过程中浏览器都发生了什么？

答案可以很丰富，也可以很概括。在这一节课中，我们主要关注浏览器的工作原理，经过一些简化，这个过程大致可以分为以下几个步骤：

【 URL 】 --(HTTP)--> 【 HTML 】 --(parse)--> 【 DOM 】 --(css computing)--> 【 DOM with CSS 】 --(layout)--> 【 DOM with position 】 --(render)--> 【 Bitmap 】

（接上周内容）本周的内容来到了layout的环节

### layout

理解Main Axis和Cross Axis

layout加在元素标签结束的位置

+ 收集元素进行(hang)
  + 分行
  + 根据主轴尺寸，把元素分进行
  + 若设置了no-wrap，则强行分配进第一行

+ 计算主轴方向
  + 找出所有flex元素
  + 把主轴方向的剩余尺寸按比例分配给这些元素
  + 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素

+ 计算交叉轴方向
  + 根据每一行中最大元素尺寸计算行高
  + 根据行高align-和align-self，确定元素具体位置
  + 多行的时候根据align-content进行交叉行的分配

### render

绘制

+ 绘制单个元素
  + 绘制需要依赖一个土星环境
  + 代码里采用了npm包images
  + 绘制在一个viewport上进行
  + 与绘制相关的属性：background-color、borderbackground-image等

+ 绘制DOM
  + 递归调用子元素的绘制方法完成DOM树的绘制
  + 忽略一些不需要绘制的节点
  + 实际浏览器中，文字绘制是难点，需要依赖字体库，在这里忽略
  + 实际浏览器中，还会对一些图层做compositing，在这里也忽略了

__浏览器工作原理至此，完结撒花__
  