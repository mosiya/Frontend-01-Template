function isSimpleSelectorMatched(selector, element) {
    let attr;
    if(selector.charAt() === '#') {
        attr = element.id;
        console.log("#", attr, element, selector, attr && attr === selector.slice(1))
        return attr && attr === selector.slice(1);
    } else if(selector.charAt() === '.') {
        attr = [].slice.call(element.classList);
        console.log(".", attr, element, selector, attr && attr.indexOf(selector.slice(1)) !== -1)
        return attr && attr.indexOf(selector.slice(1)) !== -1;
    } else {
        console.log("tag", element, selector, element.tagName.toLowerCase() === selector)
        return element.tagName.toLowerCase() === selector
    }
}

function isCompoundSelectorMatched(selector, element) {
    let selectors = selector.split(/(?=[.#])/);
    return selectors.every(item => isSimpleSelectorMatched(item, element));
}
// 这里把对于 和~的处理放到这里去了
// function _isComplexSelectorMatched(selector, element) {
//     let selectors = selector.split(/(?<=[ ~])/);
//     let cur = selectors.pop();
//     let op = cur.slice(0, 1);
//     cur = cur.slice(1);
//     if(!isCompoundSelectorMatched(cur, element)) return false;
//     while(selectors.length) {
//         let next = selectors.pop();
//         if(op === ' ') {
            
//             element = element.parentNode;
//             while(!element || !isCompoundSelectorMatched(next, element)) {
//               element = element.parentNode;
//             }
//             if(!element) return false;
//         } else if(op === '~') {
//             let isCurMatched = isCompoundSelectorMatched(cur.slice(1), element);
//             let next = selectors.pop();
//             let previousElementSibling = element.previousElementSibling;
//             let isSiblingMatched = previousElementSibling && _isComplexSelectorMatched(next, previousElementSibling);
//             console.log("~", isCurMatched, isSiblingMatched, element, previousElementSibling, cur, next)
//             if(!isCurMatched || !isSiblingMatched) return false;
//         } else {
//             console.log("else", cur, element, isCompoundSelectorMatched(cur, element))
//             if(!isCompoundSelectorMatched(cur, element)) return false;
//         }
//     }
//     return true;
// }
function removeExtraSpace(selector) {
    return selector.replace(/\s+([>+~])\s+/, '$1').replace(/\s+/g, ' ');
}

function isComplexSelectorMatched(selector, element) {
    selector = removeExtraSpace(selector);
    let selectors = selector.split(/(?<=[>+])/).reverse();
    return selectors.every(item => {
        if(item.charAt() === '>') {
            let isMatched = _isComplexSelectorMatched(item.slice(1), element);
            element = element.parentNode;
            console.log(">", isMatched, element, item);
            return element && isMatched;
        }
        if(item.charAt() === '+') {
            let isMatched = _isComplexSelectorMatched(item.slice(1), element);
            element = element.previousElementSibling;
            console.log("+", isMatched, element, item);
            return element && isMatched;
        }

        console.log("else else", element, item)
        return _isComplexSelectorMatched(item, element);
    })
}

function isMatched(selector, element) {
    if(!selector || !element) return false;

    return isComplexSelectorMatched(selector, element);
}
 
 
console.log(isMatched("body   div     span   ~  span#id", document.getElementById("id")));