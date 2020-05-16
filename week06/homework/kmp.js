// 可选作业：使用状态机实现KMP算法。即pattern未知的字符串匹配
// 提示：状态可生成；可以使用闭包
// 必须：时间复杂度为O(m+n)

function match(pattern, string) {
  // ?????
}

match('ababx', 'I am groot ababbbaababax')

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