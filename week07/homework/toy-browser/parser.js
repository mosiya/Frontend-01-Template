const css = require('css');
const layout = require('./layout.js');

const EOF = Symbol('EOF'); // EOF: End Of File 

let currentToken = null;
let currentAttibute = null;

let stack = [{type: 'document', children: []}];
let currentTextNode = null;

// 加入一个新的函数，addCSSRules，这里我们把CSS规则暂存到一个数组里
let rules = [];
function addCSSRules(text) {
  let ast = css.parse(text);
  // console.log(JSON.stringify(ast, null, "  "));
  rules.push(...ast.stylesheet.rules);
}

// 已实现复合选择器的匹配，如a.class#id
function match(element, selector) {
  if(!selector || !element.attributes) return false;

  // 处理形如a.class#id的选择器
  let combineSelectors = selector.split(/(?=[.#])/);

  for(s of combineSelectors) {
    let attr;
    if(s.charAt() == '#') {
      attr = element.attributes.filter(attr => attr.name === 'id')[0];
      if(!attr || attr.value !== selector.replace('#', '')) return false;
    } else if(s.charAt() === '.') {
      attr = element.attributes.filter(attr => attr.name === 'class')[0];
      if(!attr || attr.value.split(' ').indexOf(s.replace('.', '')) === -1) return false;
    } else {
      if(element.tagName !== s) return false;
    }
  }
  return true;
}

// 已实现复合选择器，如a.class#id
function specificity(selector) {
  let p = [0, 0, 0, 0];
  let selectorParts = selector.split(' ');
  for(let part of selectorParts) {
    let parts = part.split(/(?=[.#])/);
    parts.forEach(item => {
      if(item.charAt(0) == '#') {
        p[1] += 1;
      } else if(item.charAt(0) == '.') {
        p[2] += 1;
      } else {
        p[3] += 1;
      }
    })
  }
  return p;
}

function compare(sp1, sp2) {
  if(sp1[0] - sp2[0]) return sp1[0] - sp2[0];
  if(sp1[1] - sp2[1]) return sp1[1] - sp2[1];
  if(sp1[2] - sp2[2]) return sp1[2] - sp2[2];

  return sp1[3] - sp2[3];
}

function computeCSS(element) {
  let elements = stack.slice().reverse();
  if(!element.computedStyle) {
    element.computedStyle = {};
  }

  for(let rule of rules) {
    let selectorParts = rule.selectors[0].split(' ').reverse();

    if(!match(element, selectorParts[0])) continue; // 之所以提前判断是因为只要当前元素不匹配，那么说明不可能匹配，故直接跳过以下操作

    let matched = false;

    let j = 1; // 之所以从1开始是因为当前元素匹配的判断依据在上面做了
    for(let i = 0; i < elements.length; i++) {
      if(match(elements[i]), selectorParts[j]) {
        j++;
      }
    }

    if(j >= selectorParts.length) { // 一般是等于
      matched = true;
    }
    if(matched) {
      let sp = specificity(rule.selectors[0]);
      let computedStyle = element.computedStyle;
      for(let declaration of rule.declarations) {
        if(!computedStyle[declaration.property]) {
          computedStyle[declaration.property] = {};
        }

        if(!computedStyle[declaration.property].specificity) { // 如果当前样式不存在，则直接进行复制
          computedStyle[declaration.property].value = declaration.value;
          computedStyle[declaration.property].specificity = sp;
        } else if(compare(sp, computedStyle[declaration.property].specificity) >= 0) { // 当前选择器优先级大于等于element的选择器优先级时进行样式覆盖
          computedStyle[declaration.property].value = declaration.value;
          computedStyle[declaration.property].specificity = sp;
        }
      }
    }
  }
}

function emit(token) {
  let top = stack[stack.length - 1];
  if(token.type == 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }

    element.tagName = token.tagName;

    for(p in token) {
      if(p != 'type' && p != 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }
    computeCSS(element);

    top.children.push(element);
    // element.parent = top;

    if(!token.isSelfClosing) {
      stack.push(element);
    }
    currentTextNode = null;

  } else if(token.type == 'endTag') {
    if(top.tagName != token.tagName) {
      throw new Error('Tag start end doesn\'t match!');
    } else {
      if(top.tagName == 'style') {
        addCSSRules(top.children[0].content);
      }
      layout(top);
      stack.pop();
    }
    currentTextNode = null;
  } else if(token.type == 'text'){
    if(currentTextNode == null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }
}

function data(c) {
  if(c == '<') {
    return tagOpen;
  } else if(c == EOF) {
    emit({
      type: 'EOF'
    })
    return ;
  } else {
    emit({
      type: 'text',
      content: c
    })
    return data;
  }
}

function tagOpen(c) {
  if(c == '/') {
    return endTagOpen;
  } else if(c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(c);
  } else {
    // invalid-first-character-of-tag-name parse error
    return data(c);
  }
}

function endTagOpen(c) {
  if(c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c)
  } else if(c == '>') {
    // missing-end-tag-name parse error
    return data;
  } else if(c == EOF) {
    // eof-before-tag-name parse error
    return 'endTagOpen: EOF';
  } else {
    // invalid-first-character-of-tag-name parse error
    return 'endTagOpen: else';
  }
}

function tagName(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(c == '/') {
    return selfClosingStartTag;
  } else if(c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c; // toLowerCase()
    return tagName;
  } else if(c == '>') {
    emit(currentToken);
    return data;
  } else {
    currentToken.tagName += c; // toLowerCase()
    return tagName;
  }
}

function beforeAttributeName(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(c == '/' || c == '>' || c == EOF) {
    return afterAttributeName(c);
  } else if(c == '=') {
    // unexpected-equals-sign-before-attribute-name parse error
    // Start a new attribute in the current tag token. Set that attribute's name to the current input character, and its value to the empty string.
    return 'beforeAttributeName: =';
  } else {
    currentAttibute = {
      name: '',
      value: ''
    }
    return attributeName(c);
  }
}

function attributeName(c) {
  if(c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
    return afterAttributeName(c);
  } else if(c == '=') {
    return beforeAttributeValue;
  } else if(c == '\u0000') {
    return 'attributeName: null';
  } else if(c == '\'' || c == '\"' || c == '<') {
    return 'attributeName: \' \" <';
  } else {
    currentAttibute.name += c; // toLowerCase();
    return attributeName;
  }
}

function afterAttributeName(c) {
  if(c.match(/^[\t\n\f ]^/)) {
    return afterAttributeName;
  } else if(c == '/') {
    return selfClosingStartTag;
  } else if(c == '=') {
    return beforeAttributeValue;
  } else if(c == '>') {
    currentToken[currentAttibute.name] = currentAttibute.value;
    emit(currentToken);
    return data;
  } else if(c == EOF) {
    // eof-in-tag parse error.
    return 'afterAttributeName: EOF';
  } else {
    currentToken[currentAttibute.name] = currentAttibute.value;
    currentAttibute = {
      name: '',
      value: ''
    }
    return attributeName(c);
  }
}

function beforeAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
    return beforeAttributeValue;
  } else if(c == '\"') {
    return doubleQuotedAttributeValue;
  } else if(c == '\'') {
    return singleQuotedAttributeValue;
  } else if(c == '>') {
    // missing-attribute-value parse error
    emit(currentToken);
    return data;
  } else {
    return unquotedAttributeValue(c);
  }
}

function doubleQuotedAttributeValue(c) {
  if(c == '\"') {
    currentToken[currentAttibute.name] = currentAttibute.value;
    return afterQuotedAttributeValue;
  } else if(c == '\u0000') {
    // unexpected-null-character parse error
    return 'doubleQuotedAttributeValue: null';
  } else if(c == EOF) {
    // eof-in-tag parse error
    return 'doubleQuotedAttributeValue: EOF';
  } else {
    currentAttibute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function singleQuotedAttributeValue(c) {
  if(c == '\'') {
    currentToken[currentAttibute.name] = currentAttibute.value;
    return afterQuotedAttributeValue;
  } else if(c == '\u0000') {
    // unexpected-null-character parse error
    return 'singleQuotedAttributeValue: null';
  } else if(c == EOF) {
    // eof-in-tag parse error
    return 'singleQuotedAttributeValue: EOF';
  } else {
    currentAttibute.value += c;
    return singleQuotedAttributeValue;
  }
}

function unquotedAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttibute.name] = currentAttibute.value;
    return beforeAttributeName;
  } else if(c == '/') {
    currentToken[currentAttibute.name] = currentAttibute.value;
    return selfClosingStartTag;
  } else if(c == '>') {
    currentToken[currentAttibute.name] = currentAttibute.value;
    emit(currentToken);
    return data;
  } else if(c == '\u0000') {
    // unexpected-null-character parse error
    return 'unquotedAttributeValue: null';
  } else if(c == '\"' || c == '\'' || c == '<' || c == '=' || c == '`'){
    // unexpected-character-in-unquoted-attribute-value parse error
    return 'unquotedAttributeValue: \"\'<=`';
  } else if(c == EOF) {
    // eof-in-tag parse error
    return 'unquotedAttributeValue: EOF';
  } else {
    currentAttibute.value += c;
    return unquotedAttributeValue;
  }
}

function afterQuotedAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(c == '/') {
    return selfClosingStartTag;
  } else if(c == '>') {
    currentToken[currentAttibute.name] = currentAttibute.value;
    emit(currentToken);
    return data;
  } else if(c == EOF) {
    // eof-in-tag parse error
    return 'afterQuotedAttributeValue: EOF';
  } else {
    // missing-whitespace-between-attributes parse error
    return 'afterQuotedAttributeValue: else';
  }
}

function selfClosingStartTag(c) {
  if(c == '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if(c == EOF) {
    // eof-in-tag parse error
    return 'selfClosingStartTag: EOF';
  } else {
    // unexpected-solidus-in-tag parse error
    return 'selfClosingStartTag: else';
  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for(let c of html) {
    try {
      state = state(c);
    } catch(e) {
      console.log('=========error start============');
      console.log('char', c);
      console.log('state', state);
      console.log('error', e);
      console.log('=========error end============');
      return;
    }
  }
  state = state(EOF);
  return stack[0];
}