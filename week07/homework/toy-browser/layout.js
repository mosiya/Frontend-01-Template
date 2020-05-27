function getStyle(element) {
  if(!element.style) {
    element.style = {};
  }

  for(let prop in element.computedStyle) {
    element.style[prop] = element.computedStyle[prop].value;

    if(element.style[prop].toString().match(/px$|^[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
  }

  return element.style;
}


function layout(element) {
  if(!element.computedStyle) return;

  let elementStyle = getStyle(element);

  if(elementStyle.display != 'flex') return;

  let items = element.children.filter(e => e.type === 'element');

  items.sort((a, b) => (a.order || 0) - (b.order || 0));

  let style = elementStyle; // 为了简化以下的一系列判断和初始化

  ['width', 'height'].forEach(size => {
    if(style[size] === 'auto' || style[size] === '') {
      style[size] = null;
    }
  })

  if(!style.flexDirection || style.flexDirection == 'auto') {
    style.flexDirection = 'row';
  }
  if(!style.justifyContent || style.justifyContent == 'auto') {
    style.justifyContent = 'flex-start';
  }
  if(!style.alignItems || style.alignItems == 'auto') {
    style.alignItems = 'strech';
  }
  if(!style.alignContent || style.flexDiralignContentection == 'auto') {
    style.alignContent = 'strech';
  }
  if(!style.flexWrap || style.flexWrap == 'auto') {
    style.flexWrap = 'nowrap';
  }

  let mainSize, mainStart, mainEnd, mainSign, mainBase,
      crossSize, crossStart, crossEnd, crossSign, crossBase;
  if(style.flexDirection == 'row') {
    mainSize = 'width';
    mainStart = 'left';
    mainEnd = 'right';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if(style.flexDirection == 'row-reverse') {
    mainSize = 'width';
    mainStart = 'right';
    mainEnd = 'left';
    mainSign = -1;
    mainBase = style.width;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }

  if(style.flexDirection == 'column') {
    mainSize = 'height';
    mainStart = 'top';
    mainEnd = 'bottom';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }
  if(style.flexDirection == 'column-reverse') {
    mainSize = 'height';
    mainStart = 'bottom';
    mainEnd = 'top';
    mainSign = -1;
    mainBase = style.height;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }

  if(style.flexWrap == 'wrap-reverse') {
    let tmp = crossStart;
    crossStart = crossEnd;
    crossEnd = tmp;
    crossSign = -1;
  } else {
    crossSign = 1;
    crossBase = 0;  
  }

  let isAutoMainSize = false;
  // 以下又重新使用elementStyle是为了跟itemStyle做区分，使代码更简单易读
  if(!elementStyle[mainSize]) {
    elementStyle[mainSize] = 0;
    for(let item of items) {
      let itemStyle = getStyle(item);
      if(itemStyle[mainSize] !== null && itemStyle[mainSize] !== (void 0)) {
        elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
      }
    }
    isAutoMainSize = true;
  }

  let flexLine = [];
  let flexLines = [flexLine];

  let mainSpace = elementStyle[mainSize];
  let crossSpace = 0;

  for(let item of items) {
    let itemStyle = getStyle(item);
    if(itemStyle[mainSize] == null) {
      itemStyle[mainSize] = 0;
    }

    if(itemStyle.flex) {
      flexLine.push(item);
    } else if(elementStyle.flexWrap === 'nowrap' && isAutoMainSize) {
      mainSpace -= itemStyle[mainSize];
      if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      flexLine.push(item);
    } else {
      if(itemStyle[mainSize] > elementStyle[mainSize]) {
        itemStyle[mainSize] = elementStyle[mainSize];
      }
      if(mainSpace < itemStyle[mainSize]) {
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace; // 改的是flexLines里的那个flexLine
        flexLine = [item];
        flexLines.push(flexLine);
        mainSpace = elementStyle[mainSize];
        crossSpace = 0;
      } else {
        flexLine.push(item);
      }
      if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSpace]);
      }
      mainSpace -= itemStyle[mainSize];
    }
  }
  flexLine.mainSpace = mainSpace;

  if(elementStyle.flexWrap === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace = elementStyle[crossSize] !== (void 0) ? elementStyle[crossSize] : crossSize;
  } else {
    flexLine.crossSpace = crossSpace;
  }

  if(mainSpace < 0) {
    // overflow (happens only if container is single line), scale every item.
    let scale = elementStyle[mainSize] / (elementStyle[mainSize] - mainSpace); // 这里的mainSpace是负数
    let currentMain = mainBase;
    for(let item of items) {
      let itemStyle = getStyle(item);

      if(itemStyle.flex) {
        itemStyle[mainSize] = 0;
      }

      itemStyle[mainSize] = itemStyle[mainSize] * scale;

      itemStyle[mainStart] = currentMain;
      itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
      currentMain = itemStyle[mainEnd];
    }
  } else {
    // process each flex line
    flexLines.forEach(items => {
      let mainSpace = items.mainSpace;
      let flexTotal = 0;

      for(let item of items) {
        let itemStyle = getStyle(item);

        if(itemStyle.flex !== null && itemStyle.flex !== (void 0)) {
          flexTotal += itemStyle.flex;
        }
      }

      if(flexTotal > 0) {
        // There is flexible flex items
        let currentMain = mainBase;
        for(let item of items) {
          let itemStyle = getStyle(item);

          if(itemStyle.flex) {
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
          }
          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd];
        }
      } else {
        // There is *NO* flexible flex items, which means, justifyContent should work
        let currentMain; // 起始位置
        let step; // 元素之间的间距
        if(elementStyle.justifyContent === 'flex-start') {
          currentMain = mainBase;
          step = 0;
        }
        if(elementStyle.justifyContent === 'flex-end') {
          currentMain = mainSpace * mainSign + mainBase;
          step = 0;
        }
       if(elementStyle.justifyContent === 'center') {
          currentMain = mainSpace / 2 + mainBase;
          step = 0;
        }
        if(elementStyle.justifyContent === 'space-between') {
          step = mainSpace / (items.length - 1) * mainSign;
          currentMain = mainBase;
        }
        if(elementStyle.justifyContent === 'space-around') {
          step = mainSpace / items.length * mainSign;
          currentMain = step / 2 + mainBase;
        }
        for(let item of items) {
          let itemStyle = getStyle(item);
          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd] + step;
        }
      }
    })
  }

  // compute the cross axis sizes
  // align-items, align-self
  // let crossSpace; // 上面定义过了
  if(!elementStyle[crossSize]) { // auto sizing
    crossSpace = 0;
    elementStyle[crossSize] = 0;
    for(let flexLine of flexLines) {
      elementStyle[crossSize] = elementStyle[crossSize] + flexLine.crossSpace;
    }
  } else {
    // 如果存在父元素交叉轴空间，则crossSpace储存剩余空间
    crossSpace = elementStyle[crossSize];
    for(let flexLine of flexLines) {
      crossSpace -= flexLine.crossSpace;
    }
  }

  if(elementStyle.flexWrap === 'wrap-reverse') {
    crossBase = elementStyle[crossSize];
  } else {
    crossBase = 0;
  }

  let lineSize = elementStyle[crossSize] / flexLines.length;
  let step;
  if(elementStyle.alignContent === 'flex-start') {
    crossBase += 0;
    step = 0;
  }
  if(elementStyle.alignContent === 'flex-end') {
    crossBase += crossSign * crossSpace;
    step = 0;
  }
  if(elementStyle.alignContent === 'center') {
    crossBase += crossSign * crossSpace / 2;
    step = 0;
  }
  if(elementStyle.alignContent === 'space-between') {
    crossBase += 0;
    step = crossSpace / (flexLines.length - 1);
  }
  if(elementStyle.alignContent === 'space-around') {
    step = crossSpace / flexLines.length;
    crossBase += crossSign * step / 2;
  }
  if(elementStyle.alignContent === 'strech') {
    crossBase += 0;
    step = 0;
  }
  flexLines.forEach(items => {
    let lineCrossSize = elementStyle.alignContent === 'strech' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace;
    for(let item of items) {
      let itemStyle = getStyle(item);

      let align = itemStyle.alignSelf || elementStyle.alignItems;

      if(item === null) {
        itemStyle[crossSize] = align === 'strech' ? lineCrossSize : 0;
      }

      if(align === 'flex-start') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if(align === 'flex-end') {
        itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]);
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if(align === 'center') {
        itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if(align === 'strech') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = crossBase + crossSign * (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0) ? itemStyle[crossSize] : lineCrossSize);

        itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
      }
    }
    crossBase += crossSign * (lineCrossSize + step);
  })
  // console.log(items)
}

module.exports = layout;