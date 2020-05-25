// 使用状态机处理“abcdef”字符串

function match(string) {
  let state = start;
  for(let char of string) {
    state = state(char);
  }
  return state === end;
}

function start(char) {
  if(char === 'a') {
    return foundA;
  }
  else {
    return start;
  }
}

function end(char) {
  return end;
}

function foundA(char) {
  if(char === 'b') {
    return foundB;
  } else {
    // 小技巧：加(char)是为了解决aabcdef的可能，把当前的a再传给start处理
    // 在这里比较简单所以可以这么处理，正规的状态机是不能这样处理的。因为有状态需要合并的话，这里出现二重状态，就不好合并了
    return start(char);
  }
}

function foundB(char) {
  if(char === 'c') {
    return foundC;
  } else {
    return start(char);
  }
}

function foundC(char) {
  if(char === 'd') {
    return foundD;
  } else {
    return start(char);
  }
}

function foundD(char) {
  if(char === 'e') {
    return foundE;
  } else {
    return start(char);
  }
}

function foundE(char) {
  if(char === 'f') {
    return end;
  } else {
    return start(char);
  }
}

console.log(match('I am grootaabcdefsjkljd'));