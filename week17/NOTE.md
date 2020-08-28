## 本周总结

### 匿名函数递归

```js
//yc here
var y = (g) => ((f) => f(f))((self) => g((...args) => self(self)(...args)))

//use yc
var f = y((self) => (n) => (n < 0 ? 0 : n + self(n - 1)))

f(100) // 5050

```

### 工具分类

+ 初始化
  + yeoman
  + create-react-app
  + vue-cli

+ 开发/调试
  + dev-tool/chrome
  + webpack-dev-server
  + mock
  + wireshark
  + charles
  + fiddler
  + vite
  
+ 测试
  + mocha
  + jest

+ 发布
  + lint
  + jenkins


### 工具链

#### 工具链

##### Yeoman

  Yeoman是现代化前端项目的脚手架工具，用于生成包含指定框架结构的工程化目录结构。

Step:

+ 全局安装 yo

```
npm install -g yo
```

or

```
yarn global add yo
```

+ 创建自定义工具工程
  + 需要以 generator 开头
  + 安装依赖

```
  npm install yeoman-generator
```

or

```
  yarn add yeoman-generator
```

+ 创建工程结构
  + generator
    + app
      + index.js
+ 集成并实现 generator

```js
var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  flow steps
  // 处理 自动运行的流程
}
```

[YEOMAN](https://yeoman.io/)

