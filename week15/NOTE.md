### 本周总结

动画的部分，主要是 Time Line 的想法和思路，通过时间线来控制动画的变化过程，使得整个动画的过程是可控的。

```js
let animation = new Animation(object, property, start, end, duration, delay, timingFunction);
let = new Animation(object2, property2, start, end, duration, delay, timingFunction);

let timeline = new TimeLine;

timeline.add(animation);
timeline.add(animation2);

timeline.start();
timeline.pause();
timeline.resume();
timeline.stop();

setTimeout
setInterval
requestAnimationFrame
```

在设计一个组件或者一个功能之前，需要对应的找到其中比较重要的几个acions，并且设计好对应需要的参数，在内部需要维护的状态，在很多的时候，刚开始的想法其实并不能很好的处理对应问题，但是在问题深入之后，会有更多的思路来看待这个问题。

动画中通过时间线的设计，实现BS使用JS来实现类似CSS的动画的能力，再来就是对JS能力的拓展，可是使用不同的timing function来实现。
