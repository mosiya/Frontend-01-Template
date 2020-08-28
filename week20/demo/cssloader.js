let css = require('css')

module.exports = function (source, map) {
  let stylesheet = css.parse(source)
  //此处windows和Mac下匹配规则不一样
  //for Windows
  // let name = this.resourcePath.match(/([^\\]+).css$/)[1]
  //for Mac
  let name = this.resourcePath.match(/([^/]+).css$/)[1]
  //   console.log(name)

  for (let rule of stylesheet.stylesheet.rules) {
    rule.selectors = rule.selectors.map((selector) =>
      selector.match(new RegExp(`^.${name}`))
        ? selector
        : `.${name} ${selector}`
    )
  }

  console.log(css.stringify(stylesheet))

  return `
      let style = document.createElement('style');
    style.innerText = ${JSON.stringify(css.stringify(stylesheet))};
    document.documentElement.appendChild(style);
      `
}
