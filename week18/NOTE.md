## 本周总结

### Dev工具

- Server
  - build: webpack babel vue jsx postcss……
  - watch: fsevent
  - mock: ……
  - http: websocket
- Client
  - debugger: vscode devtool
  - source map

### 测试工具

#### Mocha

+ 1. 搭建项目

```
npm init
```

+ 2. 安装 Mocha

```
npm install --save-dev mocha
```

+ 3. 创建目录

```
├───test/
    ├───src/
    │   └───add.js
    └───test/
        └───add.test.js
```

+ 4. 添加测试用例

```js
var assert = require('assert');
var add = require('../src/add.js');
describe('add', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(add.add(3, 4), 7);
    });
});
```

+ 5. 在package.json 修改 scripts 配置

```
"test": "mocha"
```

+ 6. 兼容 ES6 module 语法

- 安装最新版本 nodejs

- 在 package.json 文件中添加如下代码：

  ```
  "type": "module"
  ```

#### nyc

+ 1. 安装 nyc

```
npm install nyc
```

+ 2. 在 package.json 中添加脚本

```
"coverage": "nyc mocha"
```

+ 3. 添加 .nycrc 文件

```
{
    "all": true,
    "include": [
        "dist/*.js"
    ]
}
```

+ 4. 安装 webpack

```
npm install --save-dev webpack
```

+ 5. 安装 babel

```
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

+ 6. 添加 .babelrc 文件

```
{
    "presets": ["@babel/preset-env"]
}
```

+ 7. 添加 package.json scripts 配置

```
"coverage": "nyc mocha"
```

#### ava

+ 1. 安装

```
npm install --save-dev ava
npm install --save-dev @babel/register
npm install --save-dev @ava/babel
```

+ 2. 修改 add.test.js 文件

```javascript
let mod = require('../src/add.js');
let test = require('ava');

test('foo', t => {
    if (mod.add(3, 4), 7) {
        t.pass();
    }
});
```

+ 3. 在 package.json 文件中添加 ava 配置

```
"ava": {
    "files": [
      "test/*.js"
    ],
    "require": [
      "@babel/register"
    ],
    "babel": {
      "testOptions": {
        "babelrc": true
      }
    }
  }
```

+ 4. 修改 .nycrc 文件

```
{
    "all": true,
    "include": [
        "src/*.js"
    ]
}
```

+ 5. 修改 package.json 文件中的 scripts 配置

```
"test": "ava",
"coverage": "nyc ava"
```

### istanbuljs 插件

+ 1. 安装

```
npm install --save-dev @istanbuljs/nyc-config-babel
npm install --save-dev babel-plugin-istanbul
```

+ 2. 在 .nycrc 文件中新增如下选项

```
"extends": "@istanbuljs/nyc-config-babel"
```

+ 3. 在 .babelrc 文件中添加如下配置

```
"plugins": ["babel-plugin-istanbul"]
```

+ 4. 修改 add.test.js 文件

```javascript
import { add } from '../src/add.js';
import assert from 'assert';

it('add(3, 4) should be 7', () => {
    assert.equal(add(3, 4), 7);
});
```

## HTML Parser 测试

| File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                      |
| --------- | ------- | -------- | ------- | ------- | ------------------------------------------------------ |
| All files | 100     | 89.93    | 100     | 100     |                                                        |
| parser.js | 100     | 89.93    | 100     | 100     | 20,113,130-131,155-156,167,184,203-205,214-223,230,387 |

