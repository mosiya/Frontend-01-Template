function isSimpleSelectorMatched(selector, element) {
    let attr;
    if(selector.charAt() === '#') {
        attr = element.id;
        return attr && attr === selector.slice(1);
    }
    else if(selector.charAt() === '.') {
        attr = [].slice.call(element.classList);
        return attr && attr.indexOf(selector.slice(1)) !== -1
    }
    else {
        return element.tagName.toLowerCase() === selector;
    }
}
// 决定是否要返回该元素
function getCompoundSelectorMatchedElement(selector, element) {
    // 9表示该元素是文档节点
    if(!element || element.nodeType === 9) return null;
    let selectors = selector.split(/(?=[.#])/);
    return selectors.every(item => isSimpleSelectorMatched(item, element)) ? element : null;
}

function  getAncestorMatchedElement(selectorParent, element) {
    while(element && !getCompoundSelectorMatchedElement(selectorParent, element.parentNode)) {
        element = element.parentNode;
    }
    return element && getCompoundSelectorMatchedElement(selectorParent, element.parentNode);
}

function  getParentMatchedElement(selectorParent, element) {
    element = element.parentNode;
    return element && getCompoundSelectorMatchedElement(selectorParent, element);
}

function  getPrecedingSiblingMatchedElement(selectorSibling, element) {
    while(element && !getCompoundSelectorMatchedElement(selectorSibling, element.previousElementSibling)) {
        element = element.previousElementSibling;
    }
    return element && getCompoundSelectorMatchedElement(selectorSibling, element.previousElementSibling);
}

function  getPreviousSiblingMatchedElement(selectorSibling, element) {
    element = element.previousElementSibling
    return element && getCompoundSelectorMatchedElement(selectorSibling, element);
}

function removeExtraSpace(selector) {
    return selector.replace(/\s*([>+~])\s*/g, '$1').replace(/\s+/g, ' ');
}

let getElementFns = {
    ' ': getAncestorMatchedElement,
    '~': getPrecedingSiblingMatchedElement,
    '>': getParentMatchedElement,
    '+': getPreviousSiblingMatchedElement
}

function getComplexSelectorMatchedElement(selectors, element) {
    if(selectors.length < 2) return getCompoundSelectorMatchedElement(selectors.pop(), element);

    let selector = selectors.shift();
    let combinator = selectors.shift();
        element = getComplexSelectorMatchedElement(selectors, element);
    return element && getElementFns[combinator](selector, element)
}

function isMatched(selector, element) {
    if(!selector || !element) return false;
    selector = removeExtraSpace(selector);
    let selectors = selector.split(/(?=[ >~+])|(?<=[ >~+])/g);

    return !!getComplexSelectorMatchedElement(selectors, element);
}
 
//  未完待续
console.log(isMatched("body   >  div   div + span#id", document.getElementById("id"))); // 错误