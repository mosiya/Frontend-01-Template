## 本周总结

### 组件化之webpack安装使用

+ 安装babel-loader、babel-core、babel/preset-env

  编译器，确保es6和jsx语法可以使用

+ 安装babel/plugin-transform-react-jsx

  编译jsx语法

+ 安装webpack-dev-server

  开启webpack自动打包刷新

  可在scripts里设置命令执行"webpack-dev-server"，可规避一些问题

+ webpack配置

  主要配置babel-loader，将jsx里的pragma字段设置为组件里创建dom的主方法

### 组件化之代码编写

+ js里书写HTML标签

  由jsx转化为createElement(xxx, {attribute<sub>1</sub>: value<sub>1</sub>, attribute<sub>2</sub>: value<sub>2</sub>, ..., attribute<sub>n</sub>: value<sub>n</sub>,})的形式

  其中，若xxx是以大写字母开头，则直接当做构造器传入；若以小写字母开头，则传入的是字符串

+ createElement的编写

  createElement处理传进来的构造器或者字符串，以及组件上的attributes和children

+ 构造器的编写

  分为以下三类

  + 小写字母开头

    认为是html标签，故使用Wrapper统一包装生成字符串对应的html标签

  + 构造器

    自定义的组件类型，自定义constructor内的属性，以及setAttribute、mountTo、appendChild、render等方法

  + children为字符串的情况

    生成字符串节点，故使用Text构造器统一包装生成TextNode

### 实践：实现轮播图片的组件Carousel

+ 实现功能：图片自动轮播、拖拽切换

+ 难点在于图片的循环播放、拖拽切换

+ 循环播放

  两张图片同时移动，并且将位置下标对数据长度取模

+ 拖拽切换

  拖拽时，三张图片同时移动

  鼠标放开时，判断移动位置是否超过中线，以此决定是否切换图片

+ Carousel的组件化

  代码参见该项目根目录下的component文件夹->main.js

  相应的代码我也拷贝到homework目录下了(只有代码，没有对应的webpack配置。该代码需要webpack打包后才能运行)