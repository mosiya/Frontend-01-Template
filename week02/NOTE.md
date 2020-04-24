# 本周总结（2020.04.16-2020.04.22）
## 1. 编程语言通识与JavaScript语言设计
### 按语法分类
+ 非形式语言
  + 中文、英文等
+ 形式语言——乔姆斯基谱系
  + 0型：无限制文法
    + ?::=? 
  + 1型：上下文相关文法
    + ?\<A\>?\:\:\=\?\<B\>\?
  + 2型：上下文无关文法
    + \<A\>::=?
    + js大部分情况是上下文无关（也有1型的小惊喜，比如{ get a(){} }）
  + 3型：正则文法
    + \<A>::=\<A>?  
### 产生式——巴科斯范式（BNF）
  这是一种用于表示上下文无关文法的语言
+ 语法结构
  + 用尖括号括起来的名称来表示语法结构名
  + 语法结构分为基础结构和需要用其他语法结构定义的复用结构
    + 基础结构称为终结符
    + 符合结构成为非终结符
  + 引号和中间的字符表示终结符
  + 可以有括号
  + \*表示重复多次
  + \|表示或
  + \+表示至少一次    
##### *了解该知识，可以更好地理解ECMA-262标准对于文法的定义*
### 图灵完备性
+ 命令式——图灵机
  + goto
  + if和while
+ 声明式——lambda
  + 递归
### 类型系统分类
+ 静态类型系统与动态类型系统
+ 强类型与弱类型（有无隐式转换）
+ 复合类型——结构体与函数签名
+ 子类型——逆变与协变（继承）

## 2. 词法，类型
### Unicode
+ 参考网址：[https://www.fileformat.info/info/unicode/](https://www.fileformat.info/info/unicode/) 、[https://home.unicode.org](https://home.unicode.org) 
+ 前128位为兼容ASCII码的Basic Latin（在js使用的标识符建议使用此范围的字符）
+ 特殊的常用字符
  + SPACE
  + LF
+ U+000-U+FFF：BMP基本平面
+ \u转义
### InputElement
+ WhiteSpace
  + \<TAB>
  + \<VT> 纵向制表符
  + \<SP> 推荐开发时使用
  + \<NBSP> 非断行空格
  + \<ZWNBSP>
+ LineTerminator
  + \<LF>  \n
  + \<CR>  \r
  + \<LS> 分行符
  + \<PS> 分段符
+ Comment
  + //
  + /* */
+ Token
  + Punctuator 符号
  + IdentifierName
    + Identifier 标识符
    + Keywords 关键字
    + Future reserved Keywords : enum
  + Number
    + IEEE 754 Double Float
    + 最佳实践
      + 浮点数比较时，需要加精度
      + Number.MAX_SAFE_INTEGER
    + Grammar
      + DecimalLiteral
        + 0
        + 0.
        + .2
        + 1e3
      + BinaryIntegerLiteral
        + 0b111
      + OctallIntegerLiteral
        + Oo10
      + HexIntegerLiteral
        + OxFF
  + String
    + Character 字符
    + Code point 码点
    + Encoding
    + UTF
      + UTF-8
      + UTF-16 实际内存中是这种方式的
    + grammar
      + "abc"
      + 'abc'
      + \`abc\`
  + Boolean
    + true
    + false
  + Null
  + Undefined
