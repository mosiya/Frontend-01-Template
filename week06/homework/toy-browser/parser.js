let currentToken = null;
let currentAttibute = null;

let stack = [{type: 'document', children: []}];
let currentTextNode = null;

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

    top.children.push(element);
    element.parent = top;

    if(!token.isSelfClosing) {
      stack.push(element);
    }
    currentTextNode = null;

  } else if(token.type == 'endTag') {
    if(top.tagName != token.tagName) {
      throw new Error('Tag start end doesn\'t match!');
    } else {
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

const EOF = Symbol('EOF'); // EOF: End Of File 

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
    emit({
      type: text,
      content: c
    })
    return ;
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
    // return data;
  } else if(c == EOF) {
    // return ;
  } else {

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

    // 抛错
    // return attributeName;
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

  } else if(c == '\'' || c == '"' || c == '<') {

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
    // return data;
  } else {
    return unquotedAttributeValue(c);
  }
}

function doubleQuotedAttributeValue(c) {
  if(c == '\"') {
    currentToken[currentAttibute.name] = currentAttibute.value;
    return afterQuotedAttributeValue;
  } else if(c == '\u0000') {

  } else if(c == EOF) {

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

  } else if(c == EOF) {

  } else {
    currentAttibute.value += c;
    return doubleQuotedAttributeValue;
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

  } else {
    currentAttibute.value += c; // toLowerCase()
    return doubleQuotedAttributeValue;
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
    // return data;
  } else if(c == '"' || c == '\'' || c == '<' || c == '=' || c == '`'){

  } else if(c == EOF) {

  } else {
    currentAttibute.value += c;
    return unquotedAttributeValue;
  }
}

function selfClosingStartTag(c) {
  if(c == '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if(c == EOF) {

  } else {

  }
}

module.exports.parserHTML = function parsrHTML(html) {
  let state = data;
  for(let c of html) {
    // console.log(c);/
    state = state(c);
  }
  state = state(EOF);
  console.log(stack[0])
}