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