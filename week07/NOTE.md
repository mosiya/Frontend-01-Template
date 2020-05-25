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