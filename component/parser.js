
const EOF = Symbol('EOF'); // EOF: End Of File 

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

// in script
function scriptData(c) {
  if(c == '<') {
    return scriptDataLessThanSign;
  } else {
    emit({
      type: 'text',
      content: c
    })
    return scriptData;
  }
}

// in script
function scriptDataLessThanSign(c) {
  if(c == '/') {
    return scriptDataEndTagOpen;
  } else {
    emit({
      type: 'text',
      content: '<'
    })
    emit({
      type: 'text',
      content: c
    })
    return scriptData;
  }
}

function scriptDataEndTagOpen(c) {
  if(c == '/') {
    return scriptDataEndTagNameS;
  } else {
    emit({
      type: 'text',
      content: '<'
    })
    emit({
      type: 'text',
      content: '/'
    })
    emit({
      type: 'text',
      content: 'c'
    })
    return scriptData;
  }
}

// in script
function scriptDataEndTagNameS(c) {
  if(c == 'c') {
    return scriptDataEndTagNameC;
  } else {
    emit({
      type: 'text',
      content: '</sc'
    })
    emit({
      type: 'text',
      content: c
    })
    return scriptData;
  }
}

// in script
function scriptDataEndTagNameC(c) {
  if(c == 'r') {
    return scriptDataEndTagNameR;
  } else {
    emit({
      type: 'text',
      content: '</sc'
    })
    emit({
      type: 'text',
      content: c
    })
    return scriptData;
  }
}

// in script
function scriptDataEndTagNameR(c) {
  if(c == 'i') {
    return scriptDataEndTagNameI;
  } else {
    emit({
      type: 'text',
      content: '</scr'
    })
    emit({
      type: 'text',
      content: c
    })
    return scriptData;
  }
}

// in script
function scriptDataEndTagNameI(c) {
  if(c == 'p') {
    return scriptDataEndTagNameP;
  } else {
    emit({
      type: 'text',
      content: '</scri'
    })
    emit({
      type: 'text',
      content: c
    })
    return scriptData;
  }
}

// in script
function scriptDataEndTagNameP(c) {
  if(c == 't') {
    return scriptDataEndTag;
  } else {
    emit({
      type: 'text',
      content: '</scrip'
    })
    emit({
      type: 'text',
      content: c
    })
    return scriptData;
  }
}

function scriptDataEndTag(c) {
  if(c == ' ') {
    return scriptDataEndTagNameR;
  } else if(c == '>') {
    emit({
      type: 'text',
      content: 'srcipt'
    })
    return data;
  } else {
    emit({
      type: 'text',
      content: '</script'
    })
    emit({
      type: 'text',
      content: c
    })
    return scriptData;
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
      if(stack[stack.length - 1].tagName === 'script' && state == data) {
        state = scriptData;
      }
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