function isSimpleSelectorMatched(selector, element) {
    let attr;
    if(selector.charAt() === '#') {
        attr = element.id;
        if(attr && attr === selector.slice(1)) return element;
    }
    else if(selector.charAt() === '.') {
        attr = [].slice.call(element.classList);
        if(attr && attr.indexOf(selector.slice(1)) !== -1) return element;
    }
    else {
        if(element.tagName.toLowerCase() === selector) return element;
    }
    return null;
}

function getCompoundSelectorMatchedElement(selector, element) {
    if(!element || element.nodeType === 9) return null;
    let selectors = selector.split(/(?=[.#])/);
    return selectors.every(item => isSimpleSelectorMatched(item, element)) ? element : null;
}

function  getAncestorMatchedElement(selectorParent, element) {
    while(element && !getCompoundSelectorMatchedElement(selectorParent, element.parentNode)) {
        element = element.parentNode;
    }
    return element && getCompoundSelectorMatchedElement(selectorParent, element.parentNode) || null;
}

function  getParentMatchedElement(selectorParent, element) {
    element = element.parentNode;
    return element && getCompoundSelectorMatchedElement(selectorParent, element.parentNode);
}

function  getPrecedingSiblingMatchedElement(selectorSibling, element) {
    while(element && !getCompoundSelectorMatchedElement(selectorSibling, element.previousElementSibling)) {
        element = element.previousElementSibling;
    }
    return element && getCompoundSelectorMatchedElement(selectorSibling, element.previousElementSibling) || null;
}

function  getPreviousSiblingMatchedElement(selectorSibling, element) {
    element = element.previousElementSibling
    return element && getCompoundSelectorMatchedElement(selectorSibling, element);
}

function removeExtraSpace(selector) {
    return selector.replace(/\s*([>+~])\s*/, '$1').replace(/\s+/g, ' ');
}

function getComplexSelectorMatchedElement(selectors, element) {
    if(selectors.length < 2) return getCompoundSelectorMatchedElement(selectors.pop(), element);

    let combinator = selectors[1];
    let selector = selectors.shift();
        selectors.shift();
    if(combinator === ' ') {
        element = getComplexSelectorMatchedElement(selectors, element);
        return getAncestorMatchedElement(selector, element);
    }
    else if(combinator === '~') {
        element = getComplexSelectorMatchedElement(selectors, element);
        return getPrecedingSiblingMatchedElement(selector, element);
    }
    else if(combinator === '>') {
        element = getComplexSelectorMatchedElement(selectors, element);
        return getParentMatchedElement(selector, element);
    }
    else if(combinator === '+') {
        element = getComplexSelectorMatchedElement(selectors, element);
        return getPreviousSiblingMatchedElement(selector, element);
    }
}

function isMatched(selector, element) {
    if(!selector || !element) return false;
    selector = removeExtraSpace(selector);
    let selectors = selector.split(/(?=[ >~+])|(?<=[[ >~+])/g);

    return !!getComplexSelectorMatchedElement(selectors, element);
}
 
 
console.log(isMatched("body  div   div + span#id", document.getElementById("id")));