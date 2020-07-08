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