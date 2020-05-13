## 本周总结

### 结构化程序设计

#### 1、Realms是什么

引用ECMAScript 2019中8.2的原文：


>Before it is evaluated, all ECMAScript code must be associated with a realm. Conceptually, a realm consists of a set of intrinsic objects, an ECMAScript global environment, all of the ECMAScript code that is loaded within the scope of that global environment, and other associated state and resources.


Realm包括一套内置对象（如作业实现的那些对象），一个ECMAScript全局环境，所有加载到全局环境中的ECMAScript代码以及关联状态和资源。我的理解是，Realm是给代码提供一切外部资源的总集合，全局环境、全局对象等，一个Realm会提供一套完整的资源供ECMAScript代码使用。

在oc里，每运行一个js context都会产生一个Realm，不同的Realm里提供的资源可能一致，但互相之间是不相等也不影响的状态。

比如使用iframe标签产生一个区域，它会生成一个Realm，它与parent上的Realm就是两个东西，所以代码在parent环境里运行的时候，使用instanceof检测数据原型的结果是不一样的。iframe里的array使用parent的Array进行instanceof检测时，会产生false的结果。

```js
var iframe = document.createElement('iframe')
document.documentElement.appendChild(iframe)
iframe.src="javascript:var b = {};"

var b1 = iframe.contentWindow.b;
var b2 = {};

console.log(typeof b1, typeof b2); //object object

console.log(b1 instanceof Object, b2 instanceof Object); //false true
```

实际上在整个ES结构里，Realm就是最大粒度的东西，往下细分就是宏任务、微任务等等，如下：

+ JS Context => Realm
+ 宏任务
+ 微任务(Promise)
+ 函数调用(Execution Context)
+ 语句/声明
+ 表达式
+ 直接量/变量/this……

可以说，搞清楚这个结构，这份知识体系已经算是完备且准确的了，其他相关知识都可以塞到这个体系的对应层去。

#### 2、Execution Context

在上一节里，来到函数调用这块，会产生Execution Context，也就是执行上下文，实际上也叫Running Execution Context。每次函数调用，形成的Execution Context，会被推入Execution Context Stack中，也就是执行上下文栈，它的踪迹在ECMAScript标准里随处可寻。。执行栈栈顶的元素就是当前的Execution Context。那么Execution Context包括哪些东西呢？

Execution Context包括
+ code evaluation state
  + 用于恢复代码执行位置。一般来说，执行async函数和generator函数的时候需保存
+ Function
  + 执行的任务是函数时使用，表示正在被执行的函数
+ Realm
  + 使用的基础库和内置对象实例
+ Script or Module
  + 执行的任务是脚本或者模块时使用，表示正在被执行的代码
+ Generator
  + 仅生成器上下文有这个属性，表示当前生成器
+ Lexical Environment
  + 词法环境，当获取this、new.target、super或者变量时使用
+ Variable Environment
  + 变量环境，当声明变量时使用（这是一个历史包袱~仅用来处理var变量，它很特殊，最特殊的就是with环境的var行为）

*这些术语与ES3和ES5的命名都不大相同，以最新版为主*

#### 3、Environment Record

这是一个链式的结构，如下：

Environment Records
+ Declarative Environment Records
  + Function Environment Records
  + Module Environment Records
+ Global Environment Records
+ Object Environment Records

实际上每个函数调用，它都会带上自己的环境记录，包括上述的所有。这样看来，它其实就是一个很标准的Closure——闭包。

#### 浏览器工作原理的总结计划放到下一周

#### 4、学习感悟

周四的课，前半节都在晕晕乎乎地跟着老师敲代码，后半节很重点。课下花了很多时间把代码敲了一遍，后半节听了两三遍，感觉终于把这块知识给吃透了。这部分知识真是太有用了，我感受到了知识体系化的某块拼图补全的快意~

结构化程序，执行上下文，环境记录这些，以前是我最薄弱的部分，现在总算是有了一个全面的认识。

感谢老师，也感谢群里小伙伴的热情回答，祝每个人都学有所成~
