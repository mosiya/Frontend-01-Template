# 本周总结（2020.04.23-2020.04.29）

#### 小知识：判断数值类型的符号

```js
function sign(num) {
    // 主要是为了判断+0和-0
    if(1 / num === Infinity) {
        return 1;
    }
    if(1 / num === -Infinity) {
        return -1;
    }
    return num / Math.abs(num);
}
```

## Expression

### Grammar
+ Tree 表达式生成树
+ Priority 优先级

#### Member 成员访问优先级的同级类型
```js
a.b
a[b] \\b可以是一个变量，也可以是一个字符串
super.b  \\super只能在构造函数里使用
super['b']
new.target  \\只能在构造函数里使用；适用于代码库设计者使用的防御代码
foo`string`
new Foo()
```
#### New
```js
new Foo
```
new new a()的优先级为new (new a()) 

Member访问的返回类型为Reference，类似C++的指针，可读可写
+ Object
+ Key

故可以delete和assign

#### Call 函数调用的优先级
```js
foo()
super()
foo()['b']
foo().b
foo()`abc`
```
__new a()\['b']的优先级为(new a())\['b']__

#### Left HandSide & Right HandSide

+ Member\New\Call都可以做Left HandSide Expressions，但一般不会这么做

#### Update
```js
a++
++a
--a
a--
```
*自增操作符左边不能有LineTerminator，注释里有也不行*

#### Unary
```js
delete a.b
void foo()  // 建议需要返回undefined时使用void）
typeof a // typeof null === 'object'; typeof function(){} === 'function'）
+a
-a
~a
!a // 可使用!!a来将数据转化为同真假的bool值
await a
```
| 其他Expressions | Exponental | Multiplicative | Additive | Shift | Relationship | Equality | Bitwise | Logical | Conditional |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|  | ** | \* \/ \% | \+ \- | << >> >>> | < > >= <= instanceof in | == != === !== | & ^ \| | && \|\| | ? : |
| 备注 |唯一一个右结合的运算符，2 \*\* 2 \*\* 3 === 2 \*\* (2 \*\* 3) ||| 位运算 |||| 短路逻辑 | 三步运算，可当if else的简单版使用 |


#### Type Convertion
|| Number | String | Boolean | Undefined | Null | Object | Symbol |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Number | - | (homework) | 0 false | × | × | Boxing | × |
| String | (homework) | - | "" false | × | × | Boxing | × |
| Boolean | true 1 <br> false 0 | 'true'<br>'false' | - | × | × | Boxing | × |
| Undefined | NaN | 'Undefined' | false | - | × | × | × |
| Null | 0 | 'null' | false | × | × | - | × |
| Object | valueOf | valueOf<br>toString | true | × | × | - | × |
| Symbol | × | × | × | × | × | Boxing | - |

#### Boxing & Unboxing

装箱：
+ 可装箱的四种基本类型：Number、String、Boolean、Symbol
+ 使用基本类型的构造器装箱（使用new，除了Symbol）
+ 使用Object()或者new Object()进行装箱

拆箱：
+ toPrimitive
+ valueOf
+ toString

若存在toPrimitive，则调用toPrimitive；

否则调用默认的toPrimitive

默认的toPrimitive，对于string类型，则先调用toString，后调用valueOf；对于number类型则相反



## Statement

| Grammar | Runtime |
|:-:|:-:|
| 简单声明 <br> 组合语句 <br> 声明 | Completion Record <br> Lexical Environment |

#### Completion Racord

+ \[\[type]]
  + 表示完成的类型
  + 类型：normal, break, continue, return, or throw
+ \[\[value]]: Types
  + 表示语句的返回值
  + 若无，则为empty
+ \[\[target]]: label
  + 表示语句的目标，通常是一个JavaScript标签

#### 简单语句
+ ExpressionStatement
+ EmptyStatement
+ DebuggerStatement
+ ThrowStatement
+ ContinueStatement
+ BreakStatement
+ ReturnStatement

#### 复合语句

+ BlockStatement
  + 为let和const提供块级作用域
  + [[type]]: normal
  + [[value]]: --
  + [[target]]: --
  + 若block内产生非normal的结果，将根据type做对应处理，该type作为整个block返回的type结果

  ```js
  {
    xxx
  }
  ```

+ IfStatement
+ SwitchStatement
+ IterationStatement
  ```js
  while() {}
  do{}while()
  for( ; ; ) {}
  for( in ) {}
  for( of ) {}
  for await( of )
  ```
  + 对于for循环语句来说，括号内的var作用域属于函数作用域范围
  + 对于const和let来说，相当于形成了一层处于上层作用域和块级作用域之间的一层作用域

+ WithStatement
+ LabelledStatement
+ TryStatement
  ```js
  try {

  } catch() {

  } finally {

  }
  ```

__LabelledStatement、IterationStatement、ContinueStatement、BreakStatement、SwitchStatement会产生break或者continue的Record类型，并且有能力消费__

__消费可以理解为处理__

__label可以加在循环语句上，循环语句是对label唯一可用且有效果的语句__

|| break | continue | return | throw |
|:-:|:-:|:-:|:-:|:-:|
| if | 穿透 | 穿透 | 穿透 | 穿透 |
| switch | 消费 | 穿透 | 穿透 | 穿透 |
| for/while | 消费 | 消费 | 穿透 | 穿透 |
| function | 报错 | 报错 | 消费 | 穿透 |
| try | 特殊处理 | 特殊处理 | 特殊处理 | 消费 |
| catch | 特殊处理 | 特殊处理 | 特殊处理 | 穿透 |
| finally | 特殊处理 | 特殊处理 | 特殊处理 | 穿透 |

#### 声明
|||
|:-|:-|
| FunctionDeclaration | function |
| GeneratorDeclaration | function * |
| AsyncFunctionDeclaration | async function |
| AsyncGeneratorDeclaration | async function * |
| VariableStatement | var |
| ClassDeclaration | class |
| LexicalDeclaration | const <br> let |

#### 预处理与作用域

+ 变量提升
+ 函数声明预处理
+ 建议使用class和let\const来进行声明，可避免var的诡异行为

## Object

__状态、行为、唯一性__
+ 任何一个对象都是唯一的，这与它本身的状态无关
+ 即使状态完全一致的两个对象，也并不相等（identifier）
+ 用状态来描述对象（state）
+ 状态的改变即是行为（behavior）

### Object—Class
+ 分类——多继承
+ 归类——单继承结构，基类
+ interface
+ mixin

### Object—Prototype
+ 采用”相似“这样的方式去描述对象
+ 任何对象仅仅需要描述它与原型的区别即可

__抽象对象时，应遵循”行为改变状态“的原则，行为改变自身状态__

### Object in JavaScript

####  在JavaScript运行时，原生对象描述方式只需要关心原型与属性两个部分

+ 原型Prototype
  + Key
    + Symbol
    + String
  + Value
    + Data Prototype
      + 数据属性用于描述状态
      + 数据属性中如果存储函数，也可以用于描述行为
      + [[value]]
      + writable
      + enumerable
      + configurable
    
    + Accessor Prototype
      + 访问器属性用于描述行为
      + get
      + set
      + enumerable
      + configurable

  + [[Prototype]]
    + 原型链
    + 访问属性时，会沿着原型寻找

#### Object API

+ 基本对象能力
  ```js
  {} . [] Object.definePrototype
  ```

+ 原型API
  ```js
  Object.crete / Object.setPrototypeOf / Object.getprototypeOf
  ```
  
+ 基于类的面向对象API(模拟)
  ```js
  new / class / extends
  ```

+ 基于原型的面向对象API(让它埋入历史的尘埃中)
  ```js
  new / function / prototype
  ```

### 特殊对象

+ Function Object
  + [[call]] 函数
  + [[construct]] 构造器

+ Array
  + [[length]]根据最大的下标自动发生变化

+ Object.prototype
  + 无法再给它添加原型


#### 助于理解的小知识：

+ 按照 ECMAScript 标准，一些特定语句（statement) 必须以分号结尾。分号代表这段语句的终止。但是有时候为了方便，这些分号是有可以省略的。这种情况下解释器会自己判断语句该在哪里终止。这种行为被叫做 “自动插入分号”，简称 ASI (Automatic Semicolon Insertion) 。实际上分号并没有真的被插入，这只是个便于解释的形象说法。
+ var 最好写在函数内最前面或变量第一次出现的地方

#### 参考链接：

+ 浮点数表示：https://jsfiddle.net/pLh8qeor/19/

+ 运算符优先级： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

#### 参考名词：
+ LeftHandSideExpression：ECMA-262.pdf 201 页 12.3
+ UpdateExpression：ECMA-262.pdf 178 页 11.9.1
+ [IIFE](https://zh.wikipedia.org/wiki/%E7%AB%8B%E5%8D%B3%E8%B0%83%E7%94%A8%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F) ：Immediately-invoked Function Expressions 立即执行的函数表达式

