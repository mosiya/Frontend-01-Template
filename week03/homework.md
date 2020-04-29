## 本周作业

### JavaScript | 表达式，类型准换
+ 根据这节课上讲师已写好的部分，补充写完函数 convertStringToNumber
+ 补充完整函数 convertNumberToString

#### convertStringToNumber

```js
function convertStringToNumber(string, x) {
    if(arguments.length < 2) x = 10;
    var chars = string.split('');
    var number = 0;
    var i = 0;
    while(i < chars[i].length && chars[i] != '.') {
        number = number * x;
        number += chars[i].codePointAt(0) - '0'.codePointAt(0);
    }
    if(chars[i] == '.') {
        i++
    }
    var fraction = 1;
    while(i < chars[i].length) {
        fraction = fraction / x;
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
        i++
    }
    return number;
}

```

#### convertNumberToString

```js
function convertNumberToString(number, x) {
    if(argunments.length < 2) x = 10;
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

