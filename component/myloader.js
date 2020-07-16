var parser = require('./parser');

module.exports = function (source, map) {
    let tree = parser.parseHTML(source);
    console.log(tree.children[1].children[0].content);
    let template = null;
    let script = null;

    for(let node of tree.children) {
        if(node.tagName == 'template') {
            template = node;
        }
        if(node.tagName == 'script') {
            script = node.children[0].content;
        }
    }

    let createCode = '';

    console.log(template)
    console.log(script)

    let visit = (node) => {
        if(node.type == 'text') {
            return JSON.stringify(node.content);
        }
        let attrs = {};
        for(let attribute of node.attributes) {
            attrs[attribute.name] = attribute.value;
        }
        let children = node.children.map(node => visit(node));
        createCode += `create('${node.tagName}', ${JSON.stringify(attrs)}, ${children})`
    }
    visit(template);

    let r =  `
class Carousel {
    render() {
        return ${createCode}
    }
}
`
    console.log(r);
    return r;
}