// 作业：使用状态机完成“abababx”的处理

function match(string) {
  let state = start;
  for(let char of string) {
    console.log(char)
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
    return start(char);
  }
}

function foundB(char) {
  if(char === 'a') {
    return foundA2;
  } else {
    return start(char);
  }
}

function foundA2(char) {
  if(char === 'b') {
    return foundB2;
  } else {
    return start(char);
  }
}

function foundB2(char) {
  if(char === 'a') {
    return foundA3;
  } else {
    return start(char);
  }
}

function foundA3(char) {
  if(char === 'b') {
    return foundB3;
  } else {
    return start(char);
  }
}

function foundB3(char) {
  if(char === 'x') {
    return end;
  } else {
    return foundA3(char);
  }
}

console.log(match('I am grootabababababx'));