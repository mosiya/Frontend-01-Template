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
