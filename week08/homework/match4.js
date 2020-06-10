// 张继业同学对我代码的修复，经过自己的再次修正，算是验证通过
function isSimpleSelectorMatched(selector, element) {
  let attr;
  if (selector.charAt() === '#') {
    attr = element.id;
    return attr && attr === selector.slice(1);
  } else if (selector.charAt() === '.') {
    attr = [].slice.call(element.classList);
    return attr && attr.indexOf(selector.slice(1)) !== -1;
  } else {
    return element.tagName.toLowerCase() === selector;
  }
}
// 决定是否要返回该元素
function getCompoundSelectorMatchedElement(selector, element) {
  // 9表示该元素是文档节点
  if (!element || element.nodeType === 9) return null;
  let selectors = selector.split(/(?=[.#])/);
  return selectors.every((item) => isSimpleSelectorMatched(item, element)) ? element : null;
}

function removeExtraSpace(selector) {
  return selector.replace(/\s*([>+~])\s*/g, '$1').replace(/\s+/g, ' ');
}

function getComplexSelectorMatchedElement(selectors, element) {
  if (!element || !selectors) return null;

  while (element && selectors.length) {
    let selector = selectors.pop();
    switch (selector) {
      case ' ':
        do {
          element = element && element.parentNode;
        } while (element && !getComplexSelectorMatchedElement([...selectors], element))
        break;
      case '>':
        element = element && element.parentNode;
        if (element)
          element = getComplexSelectorMatchedElement(selectors, element);
        break;
      case '~':
        do {
          element = element && element.previousElementSibling;
        } while (element && !getComplexSelectorMatchedElement([...selectors], element))
        break;
      case '+':
        element = element && element.previousElementSibling;
        if (element)
          element = getComplexSelectorMatchedElement(selectors, element);
        break;
      default:
        element = getCompoundSelectorMatchedElement(selector, element); 
    }
  }

  return element;
}

function isMatched(selector, element) {
  if (!selector || !element) return false;
  selector = removeExtraSpace(selector);
  let selectors = selector.split(/(?=[ >~+])|(?<=[[ >~+])/g);

  return !!getComplexSelectorMatchedElement(selectors, element);
}

console.log(isMatched("body  > div span ~ div + span#id", document.getElementById("id")));

console.log(isMatched("body  div  span", document.getElementById("id")));

console.log(isMatched("body   >  div  div  div + span#id", document.getElementById("id")));
