
// 张继业同学的实现
// 这里的选择器selectors 支持:
//
// 1. 复合选择器~, +, >
// 2. 复杂选择器，比如 div + #my-id.my-class.another-class[name=value]
// 3. 各种属性选择器：
//  [attr=value]
//  [attr~=value]
//  [attr^=value]
//  [attr$=value]
//  [attr*=value]
//  [attr|=value]

// parse complex css selectors, such as 'div#my-id.my-class[foo=bar]'
class ParseComplexSelector {
  constructor() {
    this.selector = {};
    this.name = '';
    this.attributeName = '';
    this.attributeValue = '';
    this.EOF = Symbol('EOF');

    this.dataState = this.dataState.bind(this);
    this.idState = this.idState.bind(this);
    this.classState = this.classState.bind(this);
    this.tagNameState = this.tagNameState.bind(this);
    this.attributeNameState = this.attributeNameState.bind(this);
    this.attributeValueState = this.attributeValueState.bind(this);
    this.afterQuptedAttributeValue = this.afterQuptedAttributeValue.bind(this);
    this.unquotedAttributeValueState = this.unquotedAttributeValueState.bind(
      this
    );
    this.waitEqualSignForAttributeValueList = this.waitEqualSignForAttributeValueList.bind(
      this
    );
    this.doubleQuotedValueState = this.doubleQuotedValueState.bind(this);
    this.singleQuotedValueState = this.singleQuotedValueState.bind(this);
    this.waitingCaseSensitiveFlag = this.waitingCaseSensitiveFlag.bind(this);
    this.afterCaseSensitiveFlag = this.afterCaseSensitiveFlag.bind(this);
  }
  parse(selectorStr) {
    let state = this.dataState;
    for (let c of selectorStr) {
      state = state(c);
    }
    state(this.EOF);
    let res = { ...this.selector };
    this.selector = {};
    return res;
  }
  emit(token) {
    switch (token.type) {
      case 'endIdName':
        this.selector.id = this.name;
        this.name = '';
        break;
      case 'endClassName':
        this.selector.class = this.selector.class || [];
        this.selector.class.push(this.name);
        this.name = '';
        break;
      case 'endTagName':
        this.selector.tag = this.name;
        this.name = '';
        break;
      case 'attribute':
        this.selector.attributes = this.selector.attributes || {};
        let currentAttributePair = this.selector.attributes[this.attributeName];
        let isCaseInsensitive = currentAttributePair.isCaseInsensitive;
        switch (currentAttributePair.type) {
          case 'valueList':
            currentAttributePair.value = this.attributeValue.split(' ');
            if (isCaseInsensitive) {
              currentAttributePair.value = currentAttributePair.value.map(
                (ele) => ele.toLowerCase()
              );
            }
            break;
          case 'exactlyValue':
          case 'valuePrefix':
          case 'valueSuffix':
          case 'valueSuffix':
          case 'valueIncluds':
          case 'valueSubMatch':
            currentAttributePair.value = isCaseInsensitive
              ? this.attributeValue.toLowerCase()
              : this.attributeValue;
            break;
        }

        this.attributeName = '';
        this.attributeValue = '';
        break;
      default:
        console.log('unknown toke ' + token.type);
    }
  }
  dataState(c) {
    if (c.match && c.match(/^[a-zA-Z0-9\-_]$/)) {
      return this.tagNameState(c);
    }
    switch (c) {
      case '#':
        return this.idState;
      case '.':
        return this.classState;
      case '[':
        return this.attributeNameState;
      case this.EOF:
        return null;
      default:
        throw new Error('some errors in your selector');
    }
  }

  idState(c) {
    if (c.match && c.match(/^[a-zA-Z0-9\-_]$/)) {
      this.name += c;
      return this.idState;
    }
    switch (c) {
      case '#':
      case '.':
      case '[':
      case this.EOF:
        this.emit({
          type: 'endIdName',
        });
        return this.dataState(c);
      default:
        throw new Error('some errors in your selector');
    }
  }

  classState(c) {
    if (c.match && c.match(/^[a-zA-Z0-9\-_]$/)) {
      this.name += c;
      return this.classState;
    }
    switch (c) {
      case '#':
      case '.':
      case '[':
      case this.EOF:
        this.emit({
          type: 'endClassName',
        });
        return this.dataState(c);
      default:
        throw new Error('some errors in your selector');
    }
  }

  tagNameState(c) {
    if (c.match && c.match(/^[a-zA-Z0-9\-_]$/)) {
      this.name += c;
      return this.tagNameState;
    }
    switch (c) {
      case '#':
      case '.':
      case '[':
      case this.EOF:
        this.emit({
          type: 'endTagName',
        });
        return this.dataState(c);
      default:
        throw new Error('some errors in your selector');
    }
  }

  attributeNameState(c) {
    if (c.match && c.match(/^[a-zA-Z0-9\-_]$/)) {
      this.attributeName += c;
      return this.attributeNameState;
    }
    this.selector.attributes = this.selector.attributes || {};
    let currentAttribute = (this.selector.attributes[this.attributeName] = {});
    switch (c) {
      case '=':
        currentAttribute.type = 'exactlyValue';
        return this.attributeValueState;
      case '~':
        currentAttribute.type = 'valueList';
        return this.waitEqualSignForAttributeValueList;
      case '|':
        currentAttribute.type = 'valueSubMatch';
        return this.waitEqualSignForAttributeValueList;
      case '^':
        currentAttribute.type = 'valuePrefix';
        return this.waitEqualSignForAttributeValueList;
      case '$':
        currentAttribute.type = 'valueSuffix';
        return this.waitEqualSignForAttributeValueList;
      case '*':
        currentAttribute.type = 'valueIncluds';
        return this.waitEqualSignForAttributeValueList;
      case this.EOF:
      default:
        throw new Error('some errors in your selector');
    }
  }
  waitEqualSignForAttributeValueList(c) {
    if (c === '=') return this.attributeValueState;
    else throw new Error('some errors in your selector');
  }

  attributeValueState(c) {
    switch (c) {
      case ']':
        this.emit({
          type: 'attribute',
        });
        return this.dataState;
      case '\u0022': // quotation mark "
        return this.doubleQuotedValueState;
      case '\u0027': // quotation mark "
        return this.singleQuotedValueState;
      default:
        return this.unquotedAttributeValueState(c);
    }
  }
  unquotedAttributeValueState(c) {
    switch (c) {
      case ']':
        this.emit({
          type: 'attribute',
        });
        return this.dataState;
      case ' ':
        return this.waitingCaseSensitiveFlag;
      default:
        this.attributeValue += c;
        return this.unquotedAttributeValueState;
    }
  }
  waitingCaseSensitiveFlag(c) {
    if (c === ' ') return this.waitingCaseSensitiveFlag;

    this.selector.attributes = this.selector.attributes || {};
    let currentAttributePair = this.selector.attributes[this.attributeName];
    switch (c) {
      case 'i':
        currentAttributePair.isCaseInsensitive = true;
        return this.afterCaseSensitiveFlag;
      case this.EOF:
      default:
        throw new Error('some errors in your selector');
    }
  }
  afterCaseSensitiveFlag(c) {
    switch (c) {
      case ' ':
        return this.afterCaseSensitiveFlag;
      case ']':
        this.emit({
          type: 'attribute',
        });
        return this.dataState;
      case this.EOF:
      default:
        throw new Error('some errors in your selector');
    }
  }
  doubleQuotedValueState(c) {
    switch (c) {
      case '\u0022': // quotation mark "
        return this.afterQuptedAttributeValue;
      case this.EOF:
      default:
        this.attributeValue += c;
        return this.doubleQuotedValueState;
    }
  }
  singleQuotedValueState(c) {
    switch (c) {
      case '\u0027': // apostrophe (')
        return this.afterQuptedAttributeValue;
      default:
        this.attributeValue += c;
        return this.singleQuotedValueState;
    }
  }
  afterQuptedAttributeValue(c) {
    if (c === ']') {
      this.emit({
        type: 'attribute',
      });
      return this.dataState;
    } else {
      throw new Error('some errors in your selector');
    }
  }
}

// match function
function match(selector, element) {
  const selectors = selector.split(' ');
  if (!element || selectors.length === 0) return false;
  let currentElement = element;
  let i = selectors.length - 1;
  let currentSelector = selectors[i];

  // this is used to parse complex selecors
  // such as 'div#my-id.my-class[foo=bar]
  let complexParser = new ParseComplexSelector();
  while (i >= 0 && currentElement) {
    let currentElementParent = currentElement.parentElement;
    let tempElement = null;
    switch (currentSelector) {
      case '>':
        return match(selectors.slice(0, i).join(' '), currentElementParent);

      case '~':
        tempElement = currentElement.previousElementSibling;
        while (tempElement !== null) {
          if (match(selectors.slice(0, i).join(' '), tempElement)) return true;
          tempElement = tempElement.previousElementSibling;
        }
        return false;

      case '+':
        tempElement = currentElement.previousElementSibling;
        if (match(selectors.slice(0, i).join(' '), tempElement)) return true;
        return false;

      default:
        const parsedSelectors = complexParser.parse(currentSelector);
        let numberOfTypes = Object.keys(parsedSelectors).length;
        for (let selectorType in parsedSelectors) {
          let isMatched = false;
          switch (selectorType) {
            case 'id':
              isMatched =
                currentElement.getAttribute('id') === parsedSelectors.id;
              break;

            case 'attributes':
              let attributes = Object.keys(parsedSelectors.attributes);
              isMatched = attributes.every((attr) => {
                let selectorAttr = parsedSelectors.attributes[attr];
                let selectorAttrValue = selectorAttr.value;
                let domElementAttrValue = currentElement.getAttribute(attr);

                if (!domElementAttrValue) return false;

                if (selectorAttr.isCaseInsensitive) {
                  domElementAttrValue = domElementAttrValue.toLowerCase();
                }

                switch (selectorAttr.type) {
                  case 'exactlyValue': // [attr=value]
                    return selectorAttrValue === domElementAttrValue;
                  case 'valueList': // [attr~=value]
                    return selectorAttrValue.includes(domElementAttrValue);
                  case 'valuePrefix': // [attr^=value]
                    return domElementAttrValue.indexOf(selectorAttrValue) === 0;
                  case 'valueSuffix': // [attr$=value]
                    return (
                      domElementAttrValue.indexOf(
                        selectorAttrValue,
                        domElementAttrValue.length - selectorAttrValue.length
                      ) !== -1
                    );
                  case 'valueIncluds': // [attr*=value]
                    return (
                      domElementAttrValue.indexOf(selectorAttrValue) !== -1
                    );
                  case 'valueSubMatch': // [attr|=value]
                    let hypenIndex = domElementAttrValue.indexOf('-');
                    return (
                      selectorAttrValue ===
                      domElementAttrValue.substring(0, hypenIndex)
                    );
                }
              });
              break;

            case 'class':
              let domClass = currentElement.getAttribute('class');
              let classList = domClass ? domClass.split(' ') : [];
              isMatched = parsedSelectors.class.every((cls) =>
                classList.includes(cls)
              );
              break;

            case 'tag':
              if (parsedSelectors.tag === '*') {
                isMatched = true;
              } else {
                isMatched =
                  parsedSelectors.tag.toUpperCase() ===
                  currentElement.tagName.toUpperCase();
              }
          }
          if (!isMatched) break;
          numberOfTypes--;
        }

        if (numberOfTypes === 0) currentSelector = selectors[--i];
        if (!['>', '~', '+'].includes(currentSelector)) {
          currentElement = currentElement.parentElement;
        }
    }
  }
  if (i < 0) return true;
  return false;
}

console.log(match("body > div div > div + span#id", document.getElementById("id"))); // 错误
