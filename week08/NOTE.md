## 本周总结

### 重学CSS——选择器

#### 选择器语法
+ 简单选择器
  + \*
  + div svg|a
  + .class
  + #id
  + [attr=value]
  + :hover
  + ::before

+ 复合选择器
  + <简单选择器><简单选择器><简单选择器>
  + \*或者div必须写在最前面

+ 复杂选择器
  + <复合选择器><sp><复合选择器>
  + <复合选择器>">"<复合选择器>
  + <复合选择器>"~"<复合选择器>
  + <复合选择器>"||"<复合选择器>

#### 选择器优先级

取一个四元组，按照[行内元素, id选择器, class选择器, tag选择器]来进行优先级比较

其中，伪类、伪元素装入tag选择器中，属性选择器装入class选择器中，而*通配符、not伪类、+、~、>、 等符号不增加优先级，但是not括号内的选择器会加入到这个四元组中

最特殊的!important，会吃掉所有的这些优先级，成为最强的优先级

不过强烈建议不要在生产环境中使用，仅允许在hotfix中使用，后期必须更换。!important总是会造成不可预知的麻烦

##### 做一组练习

写出以下选择器的优先级

+ div#a.b .c[id=x]  [0, 1, 3, 1]
+ #a:not(#b)  [0, 2, 0, 0]
+ *.a [0, 0, 1, 0]
+ div.a  [0, 0, 1, 1]

#### 伪类
+ 链接/行为
  + :any-link
  + :link :visited
  + hover
  + active
  + :focus
  + target

+ 树结构
  + empty
  + nth-child()
  + nth-last-child()
  + first-child :last-child :only-child

+ 逻辑型
  + :not
  + :where :has

#### 伪元素

+ ::before
+ ::after
+ ::first-line
+ ::first-letter

*first-line和first-letter可用属性*

|| first-line | first-letter |
|:-:|:-:|:-:|
| font系列 | √ | √ |
| color系统 | √ | √ |
| background系列 | √ | √ |
| word-spacing | √ | √ |
| letter-spacing | √ | √ |
| text-decoration | √ | √ |
| text-transform | √ | √ |
| line-height | √ | √ |
| float | × | √ |
| vertical-align | × | √ |
| 盒模型系列：margin,padding,border | × | √ |

### 重学CSS——排版

#### 盒(Box)

| 源代码 | 语义 | 表现 |
|:-:|:-:|:-:|
| 标签 | 元素 | 盒 |
| Tag | Element | Box |

HTML代码中可以书写开始**标签**，结束**标签**，和自封闭**标签**

一对起止**标签**，表示一个**元素**

DOM树中存储的是**元素**和其他类型的节点（Node）

CSS选择器选中的是**元素**

CSS选择器选中的**元素**，在排版时可能产生多个**盒**

排序和渲染的基本单位是**盒**

#### 盒模型

+ box-sizing
  + content-box：width = content
  + border-box：width = content + padding + border

#### 正常流

思考：我们如何写字
+ 从左到右书写
+ 同一行写的文字都是对齐的
+ 一行写满了，就换到下一行

正常流排版
+ 收集盒进行
+ 计算盒在行中的排布
+ 计算行的排布

