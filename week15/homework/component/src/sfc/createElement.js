export function createElement(Cls, attributes, ...children){
	let o = {};
	if(typeof Cls === 'string'){
		o = new Wrapper(Cls);
	}else {
		o = new Cls();
	}
	for(let key in attributes){
		o.setAttribute(key, attributes[key]);
	}
	for(let child of children){
		if(typeof child === "string")
            child = new Text(child);
		o.appendChild(child.root);
	}
	return o;
	
}
export class Text{
	constructor(text){
		this.root = document.createTextNode(text);
	}
}

export class Wrapper{
	constructor(type){
		this.children = [];
		this.root = document.createElement(type);
	}
	set class(v){
		debugger;
	}
	setAttribute(name, value){
		this.root.setAttribute(name,value);
	}
	appendChild(child){
		this.root.appendChild(child);
	}
	mountTo(parent){
		parent.appendChild(this.root);
	}
}