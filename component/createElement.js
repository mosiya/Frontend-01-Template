export function createElement(Cls, attributes, ...children) {

    let o;
    
    if(typeof Cls === 'string') {
        o = new Wrapper(Cls)
    } else {
        o = new Cls;
    }
    for(let name in attributes) {
        o.setAttribute(name, attributes[name]);
    }
    let visited = (children) => {
        for(let child of children) {
            if(typeof child === 'object' && child instanceof Array) {
                visited(child);
                continue
            }
            if(typeof child === 'string') {
                child = new Text(child)
            }
            o.appendChild(child)
        }
    }
    visited(children)
    
    return o;
}

export class Text {
    constructor(text) {
        this.children = [];
        this.root = document.createTextNode(text)
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

export class Wrapper{
    constructor(type) {
        this.children = [];
        this.root = document.createElement(type)
    }
    get style() {
        return this.root.style;
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
   
    appendChild(child) {
        this.children.push(child)
    }

    addEventListener() {
        this.root.addEventListener(...arguments);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
        for(let child of this.children) {
            child.mountTo(this.root);
        }
    }
}

export class Div{
    constructor(config) {
        this.children = [];
        this.root = document.createElement('div')
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
        for(let child of this.children) {
            child.mountTo(this.root);
        }
    }

    appendChild(child) {
        this.children.push(child)
    }
}