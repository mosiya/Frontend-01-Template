

# Week02 课后作业
## + 写一个正则表达式 匹配所有 Number 直接量

#### Syntax
+ NumericLiteral ::
  + DecimalLiteral
  + BinaryIntegerLiteral
  + OctalIntegerLiteral
  + HexIntegerLiteral

#### DecimalLiteral ::
  + DecimalIntegerLiteral . DecimalDigits<sub>opt</sub> ExponentPart<sub>opt</sub> 
  + . DecimalDigits ExponentPart<sub>opt</sub>
  + DecimalIntegerLiteral ExponentPart<sub>opt</sub>

#### 正则表达式为

```javascript
/^(0|[1-9]\d*)\.\d*([eE][+-]?\d)?$/
```


#### BinaryIntegerLiteral ::
  + 0b BinaryDigits
  + 0B BinaryDigits

#### 正则表达式为

```javascript
/^0[bB][01]+$/
```

#### OctalIntegerLiteral ::
  + 0o OctalDigits
  + 0O OctalDigits

#### 正则表达式为

```javascript
/^0[oO][0-7]+$/
```

#### HexIntegerLiteral ::
  + 0x HexDigits
  + 0X HexDigits

#### 正则表达式为

```javascript
/^0[xX][0-9a-fA-F]+$/
```

### 匹配所有Number直接量的正则
```JavaScript
/^(0|[1-9]\d*)\.\d*([eE][+-]?\d)?|0[bB][01]+|0[oO][0-7]+|0[xX][0-9a-fA-F]+$/
```



## + 写一个 UTF-8 Encoding 的函数

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



## + 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

#### StringLiteral ::
+ " DoubleStringCharactersopt " 
+ ' SingleStringCharactersopt '

#### DoubleStringCharacters ::
+ DoubleStringCharacter DoubleStringCharacters<sub>opt</sub> 

#### SingleStringCharacters ::
+ SingleStringCharacter SingleStringCharacters<sub>opt</sub> 

#### DoubleStringCharacter ::
+ SourceCharacter but not one of " or \ or LineTerminator
  + \<LS>
  + \<PS>
  + \ EscapeSequence
  + LineContinuation

```js
/"(?:[^\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\2029])*"/

/'(?:[^\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\2029])*'/
```
