## 本周总结

### 组件化基础

#### 对象与组件

+ 对象
  + Properties
  + Methods
  + Inherit

+ 组件
  + Properties
  + Methods
  + Inherit
  + __Attribute__
  + __Config & State__
  + __Event__
  + __Lifecycle__
  + __Children__

+ Component

  + End User Input 影响 Component 中的 State ， State 影响 Children
  + Component User's Markup Code 通过 attribute 与 Component 交互（通常是字符串）
  + Component User's JS Code 通过 Method 和 Property 与 Component 交互
  + Component 通过 Event 把 State 传到外部


#### Attribute vs Property

+ Attribute 强调描述性
+ Property 强调从属关系

##### 几种情况

+ Attribute 与 Property 一致
 ```js
//Attribute:
<my-component attribute="v" />
myComponent.getAttribute("a")
myComponent.setAttribute("a","value");
//Property:
myComponent.a = "value";
```

+ Attribute 与 Property 命名有区别
```html
<div class="cls1 cls2"></div>
<script>
var div = document.getElementByTagName('div');
div.className // cls1 cls2
</script>
```

+ Attribute 与 Property 数据类型有区别
```html
<div class="cls1 cls2" style="color:blue" ></div><!-- 字符串 -->
<script>
var div = document.getElementByTagName('div');
div.style // 对象
</script>
```

+ Attribute 与 Property 值有区别
```html
<a href="//m.taobao.com" ></div>
<script>
var a = document.getElementByTagName('a');
a.href // "http://m.taobao.com"  这个 URL 是 resolve 过的结果
a.getAttribute('href') // “//m.taobao.com” 跟 HTML 代码中完全一致
</script>
```

+ Attribute 与 Property 规则不同
```html
<input value = "cute" />
<script>
var input = document.getElementByTagName('input'); // 若 property 没有设置，则结果是 attribute
input.value // cute
input.getAttribute('value'); // cute
input.value = 'hello'; // 若 value 属性已经设置，则 attribute 不变，property 变化，元素上实际的效果是 property 优先
input.value // hello
input.getAttribute('value'); // cute
</script>
```


### 如何设计组件状态

| | Markup set | JS set | JS Change | Usser Input Change |
|:-:|:-:|:-:|:-:|:-:|
| property | × | √ | √ | ? |
| attribute | √ | √ | √ | ? |
| state | × | × | × | √ |
| config | × | √ | × | × |

### Lifecycle

+ created -> mounted or js change/set or User Input
+ mouned -> unmounted -> destroyed or creatd
+ js change/set or User Input -> render/update -> destroyed or creatd

### Children

+ Content型Children vs Template型Children

### 实战设计：Carousel

+ state
  + activeIndex
+ property
  + loop、time、imgList、autoplay、color、forward
+ attribute
  + startIndex、loop、time、imgList、autoplay、color、forward
+ children

+ event
  + change、click、hover、swipe、dbclick
+ method
  + next、prev、goto、play、stop
+ config
  + setInterval、setTimeout、requestAnimationFrame
  + mode: "useRAFter", "useTimeout"