const images = require('images');

function render(viewport, element) {
  if(element.style) {
    let img = images(element.style.width, element.style.height);

    if(element.style['background-color']) {
      let color = element.style['background-color'] || '#ffffff';
      let red = 0;
      let green = 0;
      let blue = 0;
      // 做了小的兼容，但不是太健壮
      if(color.startsWith('rgb')) {
        color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        red = Number(RegExp.$1);
        green = Number(RegExp.$2);
        blue = Number(RegExp.$3);
      } else if(color.length === 4 ) {
        color.match(/#([\da-fA-F])([\da-fA-F])([\da-fA-F])/);
        red = Number('0x' + RegExp.$1 + RegExp.$1);
        green = Number('0x' + RegExp.$2 + RegExp.$2);
        blue = Number('0x' + RegExp.$3 + RegExp.$3);
      } else if(color.length === 7 ) {
        color.match(/#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/);
        red = Number('0x' + RegExp.$1);
        green = Number('0x' + RegExp.$2);
        blue = Number('0x' + RegExp.$3);
      }
      img.fill(red, green, blue, 1);
      viewport.draw(img, element.style.left || 0, element.style.top < 0 ? 0 : element.style.top);
    }
  }

  if(element.children) {
    for(let child of element.children) {
      render(viewport, child);
    }
  }
}

module.exports = render;