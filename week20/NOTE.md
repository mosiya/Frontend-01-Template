## 本周总结

### PhantomJS 

Phantomjs：

PhantomJS 是一个「无头浏览器」，与正常浏览器的差别就是不会将页面渲染出来。一般是用来完善 mocha 的单元测试能力，因为 mocha 是不能测试 UI 的。如果没有一个自动化测试工具，就需要我们手动的去测试每个页面，还可能会存在漏侧的情况。

PhantomJS 的用法就是，我们可以得到页面的 DOM 树，然后写代码去对比与我们预期的 DOM 树是不是一致的。

安装：

将PhantomJS的bin文件放入node文件夹的目录下即可使用

使用：

新建hello.js文件

```js
var page = require("webpage").create();
page.open("http://baidu.com", function (status) {
  console.log("Status: " + status);
  if (status === "success") {
    page.render("./baidu.png"); // 将http://baidu.com生成一个baidu.png图片
  }
  phantom.exit();
});
```

在命令行输入

> phantoms hello.js

结合以前做好的轮播组件，对其进行检查

```js
var page = require('webpage').create();
page.open('http://localhost:8080/', function(status) {
  console.log('Status: ' + status);
  if (status === 'success') {
    var body = page.evaluate(function() {
      var toString = function(pad, element) {
        var children = element.childNodes;
        var childrenString = '';
        // !!!
        for (var i = 0; i < children.length; i++) {
          childrenString += toString("    " + pad, children[i]) + "\n";
        }
        var name;
        if (element.nodeType === Node.TEXT_NODE) {
          name = "#text " + JSON.stringify(element.textContent);
        }
        if (element.nodeType === Node.ELEMENT_NODE) {
          name = element.tagName;
        }
        return pad + name + (childrenString ? "\n" + childrenString : "");
      }
      return toString("", document.body);
    });
    console.log(body);
  }
  phantom.exit();
});
```



### ESLint 

```
npx eslint --init
npx eslint ./src/main.js
# 会报错，要修改settings的pragma，因为默认的pragma不是我们自定义的，代码里面有<这种东西的时候是会调用createElement的，但是eslint和编辑器并不认识这个东西，在编辑器里面引入了createElement，但是不是高亮的，就是不是引用的状态。pragma默认的是React，要改成我们自己定义的createElement。
```

rule是一个可开发的东西，可以写成函数的。eslint的包里面，也有rule文件夹，里面有原始的规则，一堆一堆的函数。不过基本上没什么人写。用社区的规则足够了。

### OAuth

我们上一节做的发布系统，是任何人都能直接打包上传。这个在真正的开发中是不行的，因此我们需要一个权限管理系统来处理权限的问题。

OAuth 其实是一个开源的权限管理系统，很多大公司的权限系统都支持这个。因此我们只学习 GitHub 的权限系统，就能使用其他公司的。而且这个东西其实很简单，我们重在理解整个流程。

1. 创建 GitHub OAuth App，地址在 https://github.com/settings/apps，主要是要配置 `Homepage URL` 和 `User authorization callback URL`，Webhook 一般不需要用取消这个配置。
2. publish-tool 向 GitHub 发起身份请求。其中 client_id 是上一步创建 App 得到的，具体的做法：https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#1-request-a-users-github-identity。
3. 用户登陆账号，并授权给我们的 GitHub App。然后就会跳转到我们第一步填好的 http://localhost:8081/auth，并且会带上一个 code 参数。[http://localhost:8081](http://localhost:8081/) 这个地址其实就是我们的服务器地址。
4. 处理 /auth 请求。我们在请求的 URL 上能得到用户的 code，通过这个 code 我们就可以来请求用户的 access_token，因此我们需要按照规则给 GitHub 发送一个 HTTPS 的 POST 请求。然后就拿到了用户的 access_token。详细的做法可以看 https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#2-users-are-redirected-back-to-your-site-by-github
5. 将 access_token 通过浏览器传回给 publish-tool，我们这里 server 是给 浏览器返回了一个 a 标签（`<a href="http://localhost:8080/publish?token=${access_token}">publish</a>`）。我们的 publish-tool 有一个 [http://localhost:8080](http://localhost:8080/) 服务，因此用户点击这个链接时，publish-tool 可以得到这个 access_token。
6. tool 给 server 发送请求，access_token 要丢在 headers 里面，并且把代码压缩用流的方式传过去。
7. server 收到 tool 的请求，并且从 headers 里面拿到了 access_token。将 access_token 传到 GitHub API 请求用户的基本信息。具体做法 https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#3-use-the-access-token-to-access-the-api
8. 验证用户权限。（这个需要配合公司的权限系统）
9. 接收 tool 传过来的代码包，并且解压到目标文件夹（这个一般是线上服务器）。

注意事项：

- redirect_uri 需要编码后使用
- 授权认证跳转后会在url中带有code 这个code类似于入场券的作用 不要理解为token 这个code用来换token使用的 不然会导致token直接在url中导致风险
- 要注意同源策略问题 测试时可以再github主页上进行测试 返回的access_token就是通行令牌
- 拿到access_token就可以调用github的其他的api