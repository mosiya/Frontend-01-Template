## 本周总结

### Animation
+ animation-name 时间曲线
+ animation-duration 动画的时长
+ animation-timing-function 动画的时间曲线
+ animation-delay 动画开始前的延迟
+ animation-iteration-count 动画播放次数
+ animation-direction 动画方向
### Transition
+ transition-property 要变换的属性
+ transition-duration 变换的时长
+ transition-timing-function 时间曲线
+ transition-delay 延迟
### Other
+ Gpu利用率越高 性能越好
### 常用实体
&quot;
&gt;
&lt;
&amp;
### 合法元素
+ Element __\<tagName>\</tagName>__
+ Text __文本__
+ Comment  __<\!--注释-->__
+ DocumentType __<!Doctype html>__
+ ProcessingInstruction __\<?a1?>__ 处理信息(没有用)
+ CDATA __\<![CDATA[]]>__
### NODE
+ Element 元素型节点
+ Document 文档根节点
+ Character 字符数据 包括文本节点 注释 处理信息
+ DocumentFragment 文档片段 不会产生真实dom 减少dom操作 可以作为性能优化的手段
+ DocumentType 文档类型
### 导航类操作
+ parentNode
+ childNodes
+ firstChild
+ lastChild
+ nextSibling
+ previousSibling
### 修改操作
+ appendChild
+ insertBefore
+ removeChild
+ replaceChild
### 高级操作
+ compareDocumentPosition 用于比较两个节点关系的函数
+ contains 检查一个节点是否包含另外一个节点
+ isEqualNode 检查两个节点是否完全相同
+ isSameNode 检查两个节点是否是同一个节点 实际可以在JS中用===去判断
+ cloneNode 复制一个节点 如果参数为true 会连同子元素做深拷贝
# Browser API
+ DOM
  + DOM Tree
  + Events
  + Range
  + Traversal (废弃)
+ CSSOM
+ BOM
+ Web Animation
+ Crypto
### css属性及对应文档地址
[animation-delay](https://www.w3.org/TR/2018/WD-css-animations-1-20181011/#propdef-animation-delay)    
[animation-direction](https://www.w3.org/TR/2018/WD-css-animations-1-20181011/#propdef-animation-direction)    
[animation-duration](https://www.w3.org/TR/2018/WD-css-animations-1-20181011/#propdef-animation-duration)    
[animation-fill-mode](https://www.w3.org/TR/2018/WD-css-animations-1-20181011/#propdef-animation-fill-mode)    
[animation-iteration-count](https://www.w3.org/TR/css3-animations/#propdef-animation-iteration-count)    
[animation-name](https://www.w3.org/TR/css3-animations/#propdef-animation-name)    
[animation-play-state](https://www.w3.org/TR/2018/WD-css-animations-1-20181011/#propdef-animation-play-state)    
[animation-timing-function](https://www.w3.org/TR/css3-animations/#propdef-animation-timing-function)    
[background-attachment](https://www.w3.org/TR/css-backgrounds-3/#propdef-background-attachment)    
[background-blend-mode](https://www.w3.org/TR/2015/CR-compositing-1-20150113/#propdef-background-blend-mode)    
[background-clip](https://www.w3.org/TR/css3-background/#propdef-background-clip)    
[background-color](https://www.w3.org/TR/css3-background/#propdef-background-color)    
[background-image](https://www.w3.org/TR/css3-background/#propdef-background-image)    
[background-origin](https://www.w3.org/TR/css3-background/#propdef-background-origin)    
[background-position](https://www.w3.org/TR/css3-background/#propdef-background-position)    
[background-repeat](https://www.w3.org/TR/css3-background/#propdef-background-repeat)    
[background-size](https://www.w3.org/TR/css3-background/#propdef-background-size)    
[border-bottom-color](https://www.w3.org/TR/css3-background/#propdef-border-bottom-color)    
[border-bottom-left-radius](https://www.w3.org/TR/css3-background/#propdef-border-bottom-left-radius)    
[border-bottom-right-radius](https://www.w3.org/TR/css3-background/#propdef-border-bottom-right-radius)    
[border-bottom-style](https://www.w3.org/TR/css3-background/#propdef-border-bottom-style)    
[border-bottom-width](https://www.w3.org/TR/css3-background/#propdef-border-bottom-width)    
[border-collapse](https://www.w3.org/TR/2019/WD-css-tables-3-20190727/#propdef-border-collapse)    
[border-image-outset](https://www.w3.org/TR/css3-background/#propdef-border-image-outset)    
[border-image-repeat](https://www.w3.org/TR/css3-background/#propdef-border-image-repeat)    
[border-image-slice](https://www.w3.org/TR/css3-background/#propdef-border-image-slice)    
[border-image-source](https://www.w3.org/TR/css3-background/#propdef-border-image-source)    
[border-image-width](https://www.w3.org/TR/css3-background/#propdef-border-image-width)    
[border-left-color](https://www.w3.org/TR/css3-background/#propdef-border-left-color)    
[border-left-style](https://www.w3.org/TR/css3-background/#propdef-border-left-style)    
[border-left-width](https://www.w3.org/TR/css3-background/#propdef-border-left-width)    
[border-right-color](https://www.w3.org/TR/css3-background/#propdef-border-right-color)    
[border-right-style](https://www.w3.org/TR/css3-background/#propdef-border-right-style)    
[border-right-width](https://www.w3.org/TR/css3-background/#propdef-border-right-width)    
[border-top-color](https://www.w3.org/TR/css3-background/#propdef-border-top-color)    
[border-top-left-radius](https://www.w3.org/TR/css3-background/#propdef-border-top-left-radius)    
[border-top-right-radius](https://www.w3.org/TR/css3-background/#propdef-border-top-right-radius)    
[border-top-style](https://www.w3.org/TR/css3-background/#propdef-border-top-style)    
[border-top-width](https://www.w3.org/TR/css3-background/#propdef-border-top-width)    
[bottom](https://www.w3.org/TR/2020/WD-css-position-3-20200519/#propdef-bottom)    
[box-shadow](https://www.w3.org/TR/css3-background/#propdef-box-shadow)    
[box-sizing](https://www.w3.org/TR/css-sizing-3/#propdef-box-sizing)    
[break-after](https://www.w3.org/TR/css3-break/#propdef-break-after)    
[break-before](https://www.w3.org/TR/css3-break/#propdef-break-before)    
[break-inside](https://www.w3.org/TR/css3-break/#propdef-break-inside)    
[caption-side](https://www.w3.org/TR/CSS21/tables.html#propdef-caption-side)    
[clear](https://www.w3.org/TR/CSS21/visuren.html#propdef-clear)    
[clip](https://www.w3.org/TR/css-masking-1/#propdef-clip)    
[color](https://www.w3.org/TR/css3-color/#color0)    
[content](https://www.w3.org/TR/CSS2/generate.html#propdef-content)    
[cursor](https://www.w3.org/TR/2020/WD-css-ui-4-20200124/#propdef-cursor)    
[direction](https://www.w3.org/TR/css-writing-modes-3/#propdef-direction)    
[display](https://www.w3.org/TR/2020/CR-css-display-3-20200519/#propdef-display)    
[empty-cells](https://www.w3.org/TR/2019/WD-css-tables-3-20190727/#propdef-empty-cells)    
[float](https://www.w3.org/TR/CSS21/visuren.html#propdef-float)    
[font-family](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-family)    
[font-kerning](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-kerning)    
[font-optical-sizing](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-optical-sizing)    
[font-size](https://www.w3.org/TR/css-fonts-3/#propdef-font-size)    
[font-stretch](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-stretch)    
[font-style](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-style)    
[font-variant](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-variant)    
[font-variant-ligatures](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-variant-ligatures)    
[font-variant-caps](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-variant-caps)    
[font-variant-numeric](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-variant-numeric)    
[font-variant-east-asian](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-variant-east-asian)    
[font-weight](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-weight)    
[height](https://www.w3.org/TR/CSS21/visudet.html#propdef-height)    
[image-orientation](https://www.w3.org/TR/2019/CR-css-images-3-20191010/#propdef-image-orientation)    
[image-rendering](https://www.w3.org/TR/2019/CR-css-images-3-20191010/#propdef-image-rendering)    
[isolation](https://www.w3.org/TR/compositing-1/#propdef-isolation)    
[justify-items](https://www.w3.org/TR/2020/WD-css-align-3-20200421/#propdef-justify-items)    
[justify-self](https://www.w3.org/TR/2020/WD-css-align-3-20200421/#propdef-justify-self)    
[left](https://www.w3.org/TR/2020/WD-css-position-3-20200519/#propdef-left)    
[letter-spacing](https://www.w3.org/TR/css-text-3/#propdef-letter-spacing)    
[line-height](https://www.w3.org/TR/CSS21/visudet.html#propdef-line-height)    
[list-style-image](https://www.w3.org/TR/css-lists-3/#propdef-list-style-image)    
[list-style-position](https://www.w3.org/TR/2019/WD-css-lists-3-20190817/#propdef-list-style-position)    
[list-style-type](https://www.w3.org/TR/css-lists-3/#propdef-list-style-type)    
[margin-bottom](https://www.w3.org/TR/css-box-4/#propdef-margin-bottom)    
[margin-left](https://www.w3.org/TR/css-box-4/#propdef-margin-left)    
[margin-right](https://www.w3.org/TR/css-box-4/#propdef-margin-right)    
[margin-top](https://www.w3.org/TR/css-box-4/#propdef-margin-top)    
[max-height](https://www.w3.org/TR/CSS21/visudet.html#propdef-max-height)    
[max-width](https://www.w3.org/TR/CSS21/visudet.html#propdef-max-width)    
[min-height](https://www.w3.org/TR/CSS21/visudet.html#propdef-min-height)    
[min-width](https://www.w3.org/TR/CSS21/visudet.html#propdef-min-width)    
[mix-blend-mode](https://www.w3.org/TR/compositing-1/#propdef-mix-blend-mode)    
[object-fit](https://www.w3.org/TR/css3-images/#propdef-object-fit)    
[object-position](https://www.w3.org/TR/2019/CR-css-images-3-20191010/#propdef-object-position)    
[offset-distance](https://www.w3.org/TR/2018/WD-motion-1-20181218/#propdef-offset-distance)    
[offset-path](https://www.w3.org/TR/2018/WD-motion-1-20181218/#propdef-offset-path)    
[offset-rotate](https://www.w3.org/TR/2018/WD-motion-1-20181218/#propdef-offset-rotate)    
[opacity](https://www.w3.org/TR/css-color-4/#propdef-opacity)    
[orphans](https://www.w3.org/TR/css3-break/#propdef-orphans)    
[outline-color](https://www.w3.org/TR/css3-ui/#propdef-outline-color)    
[outline-offset](https://www.w3.org/TR/2020/WD-css-ui-4-20200124/#propdef-outline-offset)    
[outline-style](https://www.w3.org/TR/2020/WD-css-ui-4-20200124/#propdef-outline-style)    
[outline-width](https://www.w3.org/TR/2020/WD-css-ui-4-20200124/#propdef-outline-width)    
[overflow-anchor](https://www.w3.org/TR/2020/WD-css-scroll-anchoring-1-20200211/#propdef-overflow-anchor)    
[overflow-wrap](https://www.w3.org/TR/2020/WD-css-text-3-20200429/#propdef-overflow-wrap)    
[overflow-x](https://www.w3.org/TR/css-overflow-3/#propdef-overflow-x)    
[overflow-y](https://www.w3.org/TR/css-overflow-3/#propdef-overflow-y)    
[padding-bottom](https://www.w3.org/TR/css-box-4/#propdef-padding-bottom)    
[padding-left](https://www.w3.org/TR/css-box-4/#propdef-padding-left)    
[padding-right](https://www.w3.org/TR/css-box-4/#propdef-padding-right)    
[padding-top](https://www.w3.org/TR/css-box-4/#propdef-padding-top)    
[pointer-events](https://www.w3.org/TR/svg2/interact.html#PointerEventsProperty)    
[position](https://www.w3.org/TR/css3-positioning/#propdef-position)    
[resize](https://www.w3.org/TR/2020/WD-css-ui-4-20200124/#propdef-resize)    
[right](https://www.w3.org/TR/2020/WD-css-position-3-20200519/#propdef-right)    
[scroll-behavior](https://www.w3.org/TR/2016/WD-cssom-view-1-20160317/#propdef-scroll-behavior)    
[speak](https://www.w3.org/TR/2020/CR-css-speech-1-20200310/#speak)    
[table-layout](https://www.w3.org/TR/2019/WD-css-tables-3-20190727/#propdef-table-layout)    
[tab-size](https://www.w3.org/TR/2020/WD-css-text-3-20200429/#propdef-tab-size)    
[text-align](https://www.w3.org/TR/2020/WD-css-text-3-20200429/#propdef-text-align)    
[text-align-last](https://www.w3.org/TR/2020/WD-css-text-3-20200429/#propdef-text-align-last)    
[text-decoration](https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/#propdef-text-decoration)    
[text-decoration-line](https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/#propdef-text-decoration-line)    
[text-decoration-style](https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/#propdef-text-decoration-style)    
[text-decoration-color](https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/#propdef-text-decoration-color)    
[text-decoration-skip-ink](https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/#propdef-text-decoration-skip-ink)    
[text-underline-position](https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/#propdef-text-underline-position)    
[text-indent](https://www.w3.org/TR/2020/WD-css-text-3-20200429/#propdef-text-indent)    
[text-rendering](https://www.w3.org/TR/svg2/painting.html#TextRenderingProperty)    
[text-shadow](https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/#propdef-text-shadow)    
text-size-adjust    
[text-overflow](https://drafts.csswg.org/css-overflow-4/#propdef-text-overflow)    
[text-transform](https://www.w3.org/TR/css-text-3/#propdef-text-transform)    
[top](https://www.w3.org/TR/2020/WD-css-position-3-20200519/#propdef-top)    
touch-action    
[transition-delay](https://www.w3.org/TR/2018/WD-css-transitions-1-20181011/#propdef-transition-delay)    
[transition-duration](https://www.w3.org/TR/css3-transitions/#propdef-transition-duration)    
[transition-property](https://www.w3.org/TR/css3-transitions/#propdef-transition-property)    
[transition-timing-function](https://www.w3.org/TR/2018/WD-css-transitions-1-20181011/#propdef-transition-timing-function)    
[unicode-bidi](https://www.w3.org/TR/css-writing-modes-3/#propdef-unicode-bidi)    
[vertical-align](https://www.w3.org/TR/css-inline-3/#propdef-vertical-align)    
[visibility](https://www.w3.org/TR/CSS21/visufx.html#propdef-visibility)    
[white-space](https://www.w3.org/TR/css-text-3/#propdef-white-space)    
[widows](https://www.w3.org/TR/css-break-4/#propdef-widows)    
[width](https://www.w3.org/TR/CSS21/visudet.html#propdef-width)    
[will-change](https://www.w3.org/TR/css-will-change-1/#propdef-will-change)    
[word-break](https://www.w3.org/TR/css-text-3/#propdef-word-break)    
[word-spacing](https://www.w3.org/TR/css-text-3/#propdef-word-spacing)    
[z-index](https://www.w3.org/TR/CSS21/visuren.html#propdef-z-index)    
[zoom](https://www.w3.org/TR/2016/WD-css-device-adapt-1-20160329/#descdef-viewport-zoom)    
[backface-visibility](https://www.w3.org/TR/2020/WD-css-transforms-2-20200303/#propdef-backface-visibility)    
[column-count](https://www.w3.org/TR/2019/WD-css-multicol-1-20191015/#propdef-column-count)    
[column-gap](https://www.w3.org/TR/2020/WD-css-align-3-20200421/#propdef-column-gap)    
[column-rule-color](https://www.w3.org/TR/css3-multicol/#propdef-column-rule-color)    
[column-rule-style](https://www.w3.org/TR/2019/WD-css-multicol-1-20191015/#propdef-column-rule-style)    
[column-rule-width](https://www.w3.org/TR/2019/WD-css-multicol-1-20191015/#propdef-column-rule-width)    
[column-span](https://www.w3.org/TR/2019/WD-css-multicol-1-20191015/#propdef-column-span)    
[column-width](https://www.w3.org/TR/css3-multicol/#propdef-column-width)    
backdrop-filter    
[align-content](https://www.w3.org/TR/css3-align/#propdef-align-content)    
[align-items](https://www.w3.org/TR/2020/WD-css-align-3-20200421/#propdef-align-items)    
[align-self](https://www.w3.org/TR/2020/WD-css-align-3-20200421/#propdef-align-self)    
[flex-basis](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-basis)    
[flex-grow](https://www.w3.org/TR/2018/CR-css-flexbox-1-20181119/#propdef-flex-grow)    
[flex-shrink](https://www.w3.org/TR/2018/CR-css-flexbox-1-20181119/#propdef-flex-shrink)    
[flex-direction](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-direction)    
[flex-wrap](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-wrap)    
[justify-content](https://www.w3.org/TR/2020/WD-css-align-3-20200421/#propdef-justify-content)    
[grid-auto-columns](https://www.w3.org/TR/2017/CR-css-grid-1-20171214/#propdef-grid-auto-columns)    
[grid-auto-flow](https://www.w3.org/TR/2017/CR-css-grid-1-20171214/#propdef-grid-auto-flow)    
[grid-auto-rows](https://www.w3.org/TR/2017/CR-css-grid-1-20171214/#propdef-grid-auto-rows)    
[grid-column-end](https://www.w3.org/TR/2017/CR-css-grid-1-20171214/#propdef-grid-column-end)    
[grid-column-start](https://www.w3.org/TR/2017/CR-css-grid-1-20171214/#propdef-grid-column-start)    
[grid-template-areas](https://www.w3.org/TR/css-grid-1/#propdef-grid-template-areas)    
[grid-template-columns](https://www.w3.org/TR/css-grid-1/#propdef-grid-template-columns)    
[grid-template-rows](https://www.w3.org/TR/css-grid-1/#propdef-grid-template-rows)    
[grid-row-end](https://www.w3.org/TR/2017/CR-css-grid-1-20171214/#propdef-grid-row-end)    
[grid-row-start](https://www.w3.org/TR/2017/CR-css-grid-1-20171214/#propdef-grid-row-start)    
[row-gap](https://www.w3.org/TR/2020/WD-css-align-3-20200421/#propdef-row-gap)    
[hyphens](https://www.w3.org/TR/2020/WD-css-text-3-20200429/#propdef-hyphens)    
[order](https://www.w3.org/TR/css-flexbox-1/#propdef-order)    
[perspective](https://www.w3.org/TR/2020/WD-css-transforms-2-20200303/#propdef-perspective)    
[perspective-origin](https://www.w3.org/TR/2020/WD-css-transforms-2-20200303/#propdef-perspective-origin)    
[shape-outside](https://www.w3.org/TR/css-shapes-1/#propdef-shape-outside)    
[shape-image-threshold](https://www.w3.org/TR/2014/CR-css-shapes-1-20140320/#propdef-shape-image-threshold)    
[shape-margin](https://www.w3.org/TR/2014/CR-css-shapes-1-20140320/#propdef-shape-margin)    
[transform](https://www.w3.org/TR/css-transforms-1/#propdef-transform)    
[transform-origin](https://www.w3.org/TR/css-transforms-1/#propdef-transform-origin)    
[transform-style](https://www.w3.org/TR/2020/WD-css-transforms-2-20200303/#propdef-transform-style)    
[user-select](https://www.w3.org/TR/2020/WD-css-ui-4-20200124/#propdef-user-select)    
buffered-rendering    
[clip-path](https://www.w3.org/TR/css-masking-1/#propdef-clip-path)    
[clip-rule](https://www.w3.org/TR/css-masking-1/#propdef-clip-rule)    
[mask](https://www.w3.org/TR/css-masking-1/#propdef-mask)    
[filter](https://www.w3.org/TR/filter-effects-1/#propdef-filter)    
[flood-color](https://www.w3.org/TR/2018/WD-filter-effects-1-20181218/#propdef-flood-color)    
[flood-opacity](https://www.w3.org/TR/2018/WD-filter-effects-1-20181218/#propdef-flood-opacity)    
[lighting-color](https://www.w3.org/TR/2018/WD-filter-effects-1-20181218/#propdef-lighting-color)    
[stop-color](https://www.w3.org/TR/svg2/pservers.html#StopColorProperty)    
[stop-opacity](https://www.w3.org/TR/svg2/pservers.html#StopOpacityProperty)    
[color-interpolation](https://www.w3.org/TR/svg2/painting.html#ColorInterpolationProperty)    
[color-interpolation-filters](https://www.w3.org/TR/2018/WD-filter-effects-1-20181218/#propdef-color-interpolation-filters)    
[color-rendering](https://www.w3.org/TR/svg2/painting.html#ColorRenderingProperty)    
[fill](https://www.w3.org/TR/fill-stroke-3/#propdef-fill)    
[fill-opacity](https://www.w3.org/TR/svg2/painting.html#FillOpacityProperty)    
[fill-rule](https://www.w3.org/TR/svg2/painting.html#FillRuleProperty)    
[marker-end](https://www.w3.org/TR/svg2/painting.html#MarkerEndProperty)    
[marker-mid](https://www.w3.org/TR/svg2/painting.html#MarkerMidProperty)    
[marker-start](https://www.w3.org/TR/svg2/painting.html#MarkerStartProperty)    
[mask-type](https://www.w3.org/TR/2014/CR-css-masking-1-20140826/#propdef-mask-type)    
[shape-rendering](https://www.w3.org/TR/svg2/painting.html#ShapeRenderingProperty)    
[stroke](https://www.w3.org/TR/fill-stroke-3/#propdef-stroke)    
[stroke-dasharray](https://www.w3.org/TR/svg2/painting.html#StrokeDasharrayProperty)    
[stroke-dashoffset](https://www.w3.org/TR/svg2/painting.html#StrokeDashoffsetProperty)    
[stroke-linecap](https://www.w3.org/TR/svg2/painting.html#StrokeLinecapProperty)    
[stroke-linejoin](https://www.w3.org/TR/svg2/painting.html#StrokeLinejoinProperty)    
[stroke-miterlimit](https://www.w3.org/TR/svg2/painting.html#StrokeMiterlimitProperty)    
[stroke-opacity](https://www.w3.org/TR/svg2/painting.html#StrokeOpacityProperty)    
[stroke-width](https://www.w3.org/TR/fill-stroke-3/#propdef-stroke-width)    
[alignment-baseline](https://www.w3.org/TR/css-inline-3/#propdef-alignment-baseline)    
[baseline-shift](https://www.w3.org/TR/SVG11/text.html#BaselineShiftProperty)    
[dominant-baseline](https://www.w3.org/TR/css-inline-3/#propdef-dominant-baseline)    
[text-anchor](https://www.w3.org/TR/svg2/text.html#TextAnchorProperty)    
[writing-mode](https://www.w3.org/TR/css-writing-modes-4/#propdef-writing-mode)    
[vector-effect](https://www.w3.org/TR/svg2/coords.html#VectorEffectProperty)    
[paint-order](https://www.w3.org/TR/svg2/painting.html#PaintOrderProperty)    
d    
cx    
cy    
x    
y    
[r](https://www.w3.org/TR/svg2/geometry.html#RProperty)    
rx    
ry    
[caret-color](https://www.w3.org/TR/2020/WD-css-ui-4-20200124/#propdef-caret-color)    
[line-break](https://www.w3.org/TR/2020/WD-css-text-3-20200429/#propdef-line-break)