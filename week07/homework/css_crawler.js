let lis = document.getElementById('container').children;

let res = [];
for(let li of lis) {
  if(li.getAttribute('data-tag').match(/css/)){
    res.push({
      name: li.children[1].innerText,
      url: li.children[1].children[0].href
    })
  }
}

console.log(res)
