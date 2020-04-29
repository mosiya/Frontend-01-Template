## 本周作业

### JavaScript | 表达式，类型准换
+ 根据这节课上讲师已写好的部分，补充写完函数 convertStringToNumber
+ 补充完整函数 convertNumberToString

#### convertStringToNumber

```js
function convertStringToNumber(string, x = 10) {
    // 数字直接量正则
    let reg = /^(?:(?:0|[1-9]\d*)\.\d*|\.\d+|(?:0|[1-9]\d*))(?:[eE][-+]?\d+)?$|^0[bB][01]+$|^0[oO][0-7]+$|^0[xX][0-9a-fA-F]+$/;
    if(reg.test(string) == false)  return NaN;

    let chars = string.split('');
    let number = 0;
    let i = 0;

    // 处理二进制、八进制和十六进制
    if(chars.length > 2 && chars[0] === '0') {
        if(chars[1] == 'b' || chars[1] == 'B') x = 2
        if(chars[1] == 'o' || chars[1] == 'O') x = 8
        if(chars[1] == 'x' || chars[1] == 'X') x = 16

        i = 2
        while(i < chars.length) {
            number = number * x;
            let codeCount = chars[i].codePointAt(0) - '0'.codePointAt(0);
            if(codeCount >= 10) codeCount = 10 + chars[i].toLowerCase().codePointAt(0) - 'a'.codePointAt(0)
            number += codeCount;
            i++;
        }
        return number;
    }
    
    // 只处理十进制
    x = 10
    while(i < chars.length && chars[i] != '.' && chars[i] != 'e' && chars[i] != 'E') {
        number = number * x;
        number += chars[i].codePointAt(0) - '0'.codePointAt(0);
        i++;
    }
    if(chars[i] == '.') i++

    let fraction = 1;
    while(i < chars.length && chars[i] != 'e' && chars[i] != 'E') {
        fraction = fraction / x;
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
        i++
    }
    if(chars[i] == 'e' || chars[i] == 'E') i++
    if(chars[i] == '+') i++

    let sign = 1
    if(chars[i] == '-') {
        i++;
        sign = -1;
    }

    
    let exponent = 0
    while(i < chars.length) {
        exponent = exponent * x;
        exponent += chars[i].codePointAt(0) - '0'.codePointAt(0);
        i++
    }

    return number * 10 ** (sign * exponent);
}

```

#### convertNumberToString

```js
function convertNumberToString(number, x = 10) {
    var integer = Math.floor(number);
    var fraction = number - integer;
    vat string = '';
    while(integer > 0) {
        string = String(integer % x) + string;
        integer = Math.floor(integer / x);
    }
    return number;
}
```



### JavaScript | 语句，对象
+ 根据课上老师的示范，找出 JavaScript 标准里所有的对象，分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性？写一篇文章，放在学习总结里。

+ Array：Array 的 length 属性根据最大的下标自动发生变化。
+ Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了。
+ String：为了支持下标运算，String 的正整数属性访问会去字符串里查找。
+ Arguments：arguments 的非负整数型下标属性跟对应的变量联动。
+ 模块的 namespace 对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import 吧。
+ 类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊。
+ bind 后的 function：跟原来的函数相关联。