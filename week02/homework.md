

# Week02 课后作业
## 1. 写一个正则表达式 匹配所有 Number 直接量

### Syntax
#### NumericLiteral ::
  + DecimalLiteral
  + BinaryIntegerLiteral
  + OctalIntegerLiteral
  + HexIntegerLiteral

#### DecimalLiteral ::
  + DecimalIntegerLiteral . DecimalDigits<sub>opt</sub> ExponentPart<sub>opt</sub> 
  + . DecimalDigits ExponentPart<sub>opt</sub>
  + DecimalIntegerLiteral ExponentPart<sub>opt</sub>

根据以下的产生式，可写出 DecimalLiteral 的三种非终结符的正则如下：(括号里加?:是为了去除捕获的副作用)
```js
/(?:0|[1-9]\d*)\.\d*(?:[eE][-+]?\d+)?/
/\.\d+(?:[eE][-+]?\d+)?/
/(?:0|[1-9]\d*)(?:[eE][-+]?\d+)?/
```

#### DecimalIntegerLiteral :: 
 + 0
 + NonZeroDigit DecimalDigits<sub>opt</sub>

#### DecimalDigits :: 
+ DecimalDigit
+ DecimalDigits DecimalDigit 

#### DecimalDigit :: one of
 + 0 1 2 3 4 5 6 7 8 9

#### NonZeroDigit :: one of 
 + 1 2 3 4 5 6 7 8 9

#### ExponentPart ::
 + ExponentIndicator SignedInteger

#### ExponentIndicator :: one of 
 + e E

#### SignedInteger :: 
 + DecimalDigits
 + \+ DecimalDigits
 + \- DecimalDigits


#### 合并后 DecimalLiteral 的正则表达式为

```javascript
/^(?:(?:0|[1-9]\d*)\.\d*|\.\d+|(?:0|[1-9]\d*))(?:[eE][-+]?\d+)?$/
```
测试后的分析结果为：(还没完)
![](https://github.com/mosiya/Frontend-01-Template/blob/master/week02/DecimalLiteral.png)


#### BinaryIntegerLiteral ::
  + 0b BinaryDigits
  + 0B BinaryDigits

#### BinaryIntegerLiteral 正则表达式为

```javascript
/^0[bB][01]+$/
```

#### OctalIntegerLiteral ::
  + 0o OctalDigits
  + 0O OctalDigits

#### OctalIntegerLiteral 正则表达式为

```javascript
/^0[oO][0-7]+$/
```

#### HexIntegerLiteral ::
  + 0x HexDigits
  + 0X HexDigits

#### HexIntegerLiteral 正则表达式为

```javascript
/^0[xX][0-9a-fA-F]+$/
```


### 故匹配所有 Number 直接量的正则为
```JavaScript
/^(?:(?:0|[1-9]\d*)\.\d*|\.\d+|(?:0|[1-9]\d*))(?:[eE][-+]?\d+)?$|^0[bB][01]+$|^0[oO][0-7]+$|^0[xX][0-9a-fA-F]+$/
```
最终的分析结果如下，符合ECMAScript262标准的定义：
![](https://github.com/mosiya/Frontend-01-Template/blob/master/week02/NumericLiteral.png)


## 2. 写一个 UTF-8 Encoding 的函数

```js
function UTF8Encoding(str) {
  const codes = encodeURIComponent(str)
  const bytes = []

  for (let i = 0; i < codes.length; i++) {
    const c = codes.charAt(i)
    if (c === '%') {
      const hex = codes.charAt(i + 1) + codes.charAt(i + 2)
      const hexVal = parseInt(hex, 16)
      bytes.push(hexVal)
      i += 2
    } else {
      bytes.push(c.charCodeAt(0))
    }
  }
  return bytes
}
```



## 3. 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

### Syntax
#### StringLiteral ::
 + " DoubleStringCharacters<sub>opt</sub>  " 
 + ' SingleStringCharacters<sub>opt</sub>  '

*分析该产生式，有双引号和单引号两种情况，除了单双引号以外，其结构是一致的，故只要写出来其中一种，另一种也就迎刃而解了*
*以下以DoubleStringCharacters为主要分析对象*

#### DoubleStringCharacters ::
 + DoubleStringCharacter DoubleStringCharacters<sub>opt</sub> 

#### SingleStringCharacters ::
 + SingleStringCharacter SingleStringCharacters<sub>opt</sub> 

#### DoubleStringCharacter ::
 + SourceCharacter but not one of " or \ or LineTerminator
 + \<LS>
 + \<PS>
 + \\ EscapeSequence
 + LineContinuation

#### SourceCharacter ::
 + any Unicode code point

SourceCharacter 的代码为
```js
/.+/u
```

#### LineTerminator :: 
 + \<LF>
 + \<CR>
 + \<LS>
 + \<PS>

LineTerminator 的代码为
```js
/\n\r\u2028\u2029/
```

结合上述三条产生式，得出 DoubleStringCharacter 伪代码为
```js
/[^"\\\n\r\u2028\2029]/
/\u2028/
/\u2029/
/\EscapeSequence/
/LineContinuation/
```

合并后得到 DoubleStringCharacter 的伪代码为
```js
/[^"\\\n\r]|\\EscapeSequence|LineContinuation/
```
还需要将 EscapeSequence 与 LineContinuation 写出来
故以下主要写出 EscapeSequence 与 LineContinuation 的正则来


#### SingleStringCharacter ::
 + SourceCharacter but not one of ' or \ or LineTerminator 
 + \<LS>
 + \<PS>
 + \\ EscapeSequence
 + LineContinuation

同理 SingleStringCharacter 的伪代码为
```js
/[^'\\\n\r]|\\EscapeSequence|LineContinuation/
```

#### LineContinuation ::
 + \\ LineTerminatorSequence

#### LineTerminatorSequence :: 
 + \<LF>
 + \<CR>\[lookahead ≠ \<LF>] 
 + \<LS>
 + \<PS>
 + \<CR>\<LF>

结合以上两条产生式， LineContinuation 的代码为
```js
/\\[\n\r\u2028\u2029]/
```

#### EscapeSequence :: 
 + CharacterEscapeSequence
 + 0 \[lookahead ∉ DecimalDigit] 
 + HexEscapeSequence 
 + UnicodeEscapeSequence

结合以上两条产生式， EscapeSequence 的伪代码为
```js
/SingleEscapeCharacter|NonEscapeCharacter/
/0/
/x[0-9a-fA-F]{2}/
/u(?:[0-9a-fA-F]{4}|\{(?:10|[0-9a-fA-F])[0-9a-fA-F]{0,4}\})/
```

结合以后得 EscapeSequence 的伪代码为(还需要 SingleEscapeCharacter 和 NonEscapeCharacter 的代码)
```js
/SingleEscapeCharacter|NonEscapeCharacter|0|x[0-9a-fA-F]{2}|u(?:[0-9a-fA-F]{4}|\{(?:10|[0-9a-fA-F])[0-9a-fA-F]{0,4}\})/
```


#### CharacterEscapeSequence :: 
 + SingleEscapeCharacter
 + NonEscapeCharacter

#### SingleEscapeCharacter :: one of
 + '  "  \  b  f  n  r  t  v

SingleEscapeCharacter 的代码为
```js
/['"\\bfnrtv]/
```

此时可得 EscapeSequence 的伪代码为(还需要 NonEscapeCharacter 的代码)
```js
/['"\\bfnrtv]|NonEscapeCharacter|0|x[0-9a-fA-F]{2}|u(?:[0-9a-fA-F]{4}|\{(?:10|[0-9a-fA-F])[0-9a-fA-F]{0,4}\})/
```


#### NonEscapeCharacter ::
 + SourceCharacter but not one of EscapeCharacter or LineTerminator

NonEscapeCharacter 的伪代码为(还需要 EscapeCharacter 与 LineTerminator 的代码)
```js
/[^EscapeCharacter]|[^LineTerminator]]/u
```

#### EscapeCharacter :: 
 + SingleEscapeCharacter
 + DecimalDigit
 + x 
 + u

EscapeCharacter 的代码为
```js
/['"\\bfnrtv0-9xu]/
```

此时可得 NonEscapeCharacter 的代码为
```js
/[^'"\\bfnrtv0-9xu\n\r\u2028\u2029]/u
```
此时可得 EscapeSequence 的正则为
```js
/['"\\bfnrtv]|[^'"\\bfnrtv0-9xu\n\r\u2028\u2029]|0|x[0-9a-fA-F]{2}|u(?:[0-9a-fA-F]{4}|\{(?:10|[0-9a-fA-F])[0-9a-fA-F]{0,4}\})/u
```
整理后得
```js
/[^1-9xu\n\r\u2028\u2029]|x[0-9a-fA-F]{2}|u(?:[0-9a-fA-F]{4}|\{(?:10|[0-9a-fA-F])[0-9a-fA-F]{0,4}\})/u
```

#### HexEscapeSequence ::
 + x HexDigit HexDigit

#### UnicodeEscapeSequence :: 
 + u Hex4Digits
 + u { CodePoint } 
 
#### Hex4Digits ::
 + HexDigit HexDigit HexDigit HexDigit

#### HexDigits :: 
 + HexDigit
 + HexDigits HexDigit

#### HexDigit :: one of
 + 0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F

#### CodePoint ::
 + HexDigits but only if MV of HexDigits ≤ 0x10FFFF


最后将 DoubleStringCharacter 需要的 EscapeSequence 和 LineContinuation 的结合进入如下的伪代码
```js
/[^"\\\n\r]|\\EscapeSequence|LineContinuation/
```

得

```js
/[^"\\\n\r]|\\[^0-9xu\n\r\u2028\u2029]|\\x[0-9a-fA-F]{2}|\\u(?:[0-9a-fA-F]{4}|\{(?:10|[0-9a-fA-F])[0-9a-fA-F]{0,4}\})|\\[\n\r\u2028\u2029]/u
```

故可得 DoubleStringCharacters 的正则为：

```js
/"(?:[^"\\\n\r]|\\[^1-9xu\n\r\u2028\u2029]|\\x[0-9a-fA-F]{2}|\\u(?:[0-9a-fA-F]{4}|\{(?:10|[0-9a-fA-F])[0-9a-fA-F]{0,4}\})|\\[\n\r\u2028\u2029])*"/u
```

整理化简得 DoubleStringCharacters 的正则为：

```js
/"(?:[^"\\\n\r]|\\[^1-9xu]|\\x[0-9a-fA-F]{2}|\\u(?:[0-9a-fA-F]{4}|\{(?:10|[0-9a-fA-F])[0-9a-fA-F]{0,4}\}))*"/u
```

同理可得 SingleStringCharacters 的正则为：

```js
/'(?:[^'\\\n\r]|\\[^1-9xu]|\\x[0-9a-fA-F]{2}|\\u(?:[0-9a-fA-F]{4}|\{(?:10|[0-9a-fA-F])[0-9a-fA-F]{0,4}\}))*'/u
```

最终的分析结果分别如下：
![](https://github.com/mosiya/Frontend-01-Template/blob/master/week02/DoubleStringCharacters.png)
![](https://github.com/mosiya/Frontend-01-Template/blob/master/week02/SingleStringCharacters.png)

老师的答案为：
```js
/"(?:[^\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\2029])*"/

/'(?:[^\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\2029])*'/
```
