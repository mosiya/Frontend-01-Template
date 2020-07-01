## 本周总结

### 正则表达式 RegExp

+ lastIndex (必须为全局模式才有效)

```Javascript
    var re = /(hi)?/g;
    console.log(re.exec("hi")); //["hi", "hi", index: 0, input: "hi", groups: undefined]
    console.log(re.lastIndex); // 2
```

+ exec
+ |
+ () 捕获
+ (?:) 非捕获
+ []
+ 小技巧
  + /[\s\S]/ 或者 /./ 匹配所有字符
  + /\w/

### 字符串分析算法

+ 字典树
  + 大量字符串的完整匹配模式
+ KMP
  + 长字符串中找子串 O（M+N）
+ wildCard 通配符算法
  + 长字符串中找子串升级版
+ 正则
  + 字符串通用模式匹配
+ 状态机
  + 通用的字符串分析
+ LL LR
  + 字符串多层级结构分析


### 做了一个KMP算法的可视化，地址如下：https://mosiya.github.io/kmp_vision/ 欢迎查杀bug~