# 前端知识架构
（逻辑性与完备性）
## HTML
### HTML as 计算机语言
* 语法
* 词法
### HTML as SGML
* DTD，全称Document Type Definition
* Entity(不全，只列了常用的)
    *    -> &nbsp;
    *  ! -> &excl;
    * " -> &quot;
    * #->&num;
    * $->&dollar;
    * %->&percnt;
    * &->&amp;
    * '->&apos;
    * (->&lpar;
    * )->&rpar;
    * *->&ast;
    * +->&plus;
    * ,->&comma;
    * -->&hyphen;
    * .->&period;
    * /->&sol;
    * :->&colon;
    * ;->&semi;
    * <->&lt;
    * =->&equals;
    * >->&gt;
    * ?->&quest;
    * @->&commat;
    * [->&lsqb;
    * \->&bsol;
    * ]->&rsqb;
    * ^->&circ;
    * _->&lowbar;
    * `->&grave;
    * {->&lcub;
    * |->&verbar;
    * }->&rcub;
    * ~->&tilde;
### HTML as XML
* Namespace
    * svg
    * mathml
    * arias（盲人非障碍阅读）
* Tag
    * 根元素
        * html
    * 文档元数据
        * head
        * title
        * base
        * link
        * meta
        * style
    * 脚本
        * script
        * noscript
        * template
    * 章节
        * body
        * section
        * nav
        * article
        * aside
        * h1, h2, h3, h4, h5, h6
        * header
        * footer
        * address
        * main
    * 组织内容
        * p
        * hr
        * pre
        * blockquote
        * ol
        * ul
        * li
        * dl
        * dt
        * dd
        * figure
        * figcaption
        * div
    * 文字形式
        * a
        * em
        * strong
        * small
        * s
        * cite
        * q
        * dfn
        * abbr
        * data
        * time
        * code
        * var
        * samp
        * kbd
        * sub
        * sup
        * i
        * b
        * u
        * mark
        * ruby
        * rt
        * rp
        * bdi
        * bdo
        * span
        * br
        * wbr
    * 编辑
        * ins
        * del
    * 嵌入内容
        * img
        * iframe
        * embed
        * object
        * param
        * video
        * audio
        * source
        * track
        * canvas
        * map
        * area
        * svg
        * math
    * 表格
        * table
        * caption
        * colgroup
        * col
        * tbody
        * thead
        * tfoot
        * tr
        * td
        * th
    * 表单
        * form
        * fieldset
        * label
        * input
        * button
        * select
        * datalist
        * optgroup
        * option
        * textarea
        * keygen
        * output
        * progress
        * meter
    * 交互元素
        * details
        * summary
        * menuitem
        * menu
## JavaScript
### 文法（Grammar）
* 词法 Lex
    * InputElement
        * WhiteSpace 空白键 零宽空白符 /uFEFF
        * LineTerminator 回车
        * Comment 注释
        * Token
            * Identifier
                * 标识符，如function，变量名等
            * Keywords
                * 关键字，如if，for，break，continue等
            * Punctuator
                * 标点，如: " '等
            * NumbericLiteral
                * 数值字面量，如123等
            * StringLiteral
                * 字符串字面量，如‘aaa’，"bbb"等
            * RegularExpressionLiteral
                * 正则表达式字面量，如/123/，/abc/g等
            * Template
                * 字符串模板，用反引号``包裹起来的字面量
* 语法 Syntax
    * Atom
    * Expression
    * Structure
    * Script & Module
### 语义（Semantics）
### 运行时（Runtime）
（程序=算法+数据结构）
* Type
    * Undefined
    * Null
    * Boolean
    * Number
    * String
    * Object
    * Symbol
    * 内部
        * Reference
            * 用于描述对象访问以及delete
        * Completion Record
            * 子主题 1
                * 用于描述异常、跳出等语句执行过程
        * Set
            * 用于解释字符集
        * List和Record
            * 用于描述函数传参过程
        * Property Descriptor
            * 用于描述对象属性
        * Data Block
            * 用于描述二进制数据
        * Lexical Environment和Environment Record
            * 描述变量和作用域
* 执行过程
    * Job
    * Script/Module
    * Promise
    * Function
    * Statement
    * Expression
    * Literal
    * Identifier
### 概要: Grammar到Runtime之间的桥梁
## CSS
### 语法/词法
### @规则
* @charset
* @import
* @media
* @page
* @counter-style
* @keyframes
* @fontface
* @supports
* @namespace
### 普通规则
* 选择器
    * 简单选择器
        * .cls
        * #id
        * tagname
        * [attr=v]
        * *
    * 复合选择器
    * 复杂选择器
        * 后代
        * >
        * ~
        * +
    * 选择器列表
        * ，
* Property
* Value
### 机制
* 排版
* 伪元素
* 动画
* 优先级
## API
### browser
* DOM
    * Nodes(节点，与SGML中内容一一对应)
        * document
        * documentText
        * ProcessingInteral 问号标签
        * Comment 注释
        * ……
    * Ranges（排列）
    * Events（事件）
* BOM
### node
### electron
### 小程序
### 概要: 领域知识
## 前端工程实践
### 性能
### 工具链
### 持续集成
### 搭建系统
### 架构与基础库

*XMind: ZEN - Trial Version*