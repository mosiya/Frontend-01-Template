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

## 重学CSS

### CSS语法的研究

CSS总体结构

+ @charset
+ @import
+ rules
  + @media
  + @page
  + rule

### CSS@规则的研究

At-rules:

+ @charset: https://www.w3.org/TR/css-syntax-3/
+ @import: https://www.w3.org/TR/css-cascade-4/
+ @media: https://www.w3.org/TR/css3-conditional/
  + 可以互相嵌套
+ @page: https://www.w3.org/TR/css-page-3/
+ @namespace: https://www.w3.org/TR/css-namespaces-3/
+ @supports: https://www.w3.org/TR/css3-conditional/
+ @font-face: https://www.w3.org/TR/css-fonts-3/
+ @keyframes: https://www.w3.org/TR/css-animations-1/
+ @counter-style: https://www.w3.org/TR/css-counter-styles-3/

### CSS规则的结果

CSS规则

+ Selector
  + https://www.w3.org/TR/selectors-3/
  + https://www.w3.org/TR/selectors-4/

+ Key
  + Properties
  + Variables: https://www.w3.org/TR/css-variables/
    + 双-开头
    + 使用时用var函数

+ Value
  + https://www.w3.org/TR/css-values-4/

### 初建CSS知识体系

__应该从自身的知识体系出发，不要一步跨到太远的知识，否则联系不上，知识就变成了一个个孤立的点，无法连成一个知识面。而且，还要注意知识体系的完备性__

CSS知识系统详见CSS脑图

### 实验 收集标准

详见css_crawler.js

由于 https://www.w3.org/TR/?tag=css 下所有标准都会渲染在页面上，所以直接在该页面上执行一些对于标签属性的过滤即可得到想要的标准列表。

### 实验 收集CSS属性相关标准

详见css_crawler2.js

使用的是前一个实验里收集到的CSS标准，再从中获取需要的属性相关标准

## 学习总结

本周迎来了浏览器原理的完结，这是开课以来代码强度最高的系列课程，也是学习内容最深的课程，学到了非常多的知识，内心无比喜悦。

浏览器的解析、计算、渲染，这一步步走来，完成了这个玩具浏览器，值得再次反复细细地琢磨。

课程也是，每次看也有新惊喜~

这个过程中，帮助最大的一点就是，有老师引导着，学习的路线不会跑偏，因为老师会把你拉回来，让你知道应该专注在哪些知识上。

最后，期待老师要给我们上的写技术文章的加课！

(等空闲的时候我要把挑战题什么的都补上~)