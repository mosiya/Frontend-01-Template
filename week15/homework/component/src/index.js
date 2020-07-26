function createElement(Cls, attributes, ...children){
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
class Text{
	constructor(text){
		this.root = document.createTextNode(text);
	}
}
class Wrapper{
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
class MyCompopent{
	constructor(){
		this.children = [];
		this.root = document.createElement('div');
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

let component = <MyCompopent id="a" class="77" >
<MyCompopent id="ch1">哈哈<div id="ch4">782134723</div></MyCompopent>
<MyCompopent id="ch2">呵呵</MyCompopent>
<div id="ch3">23412</div>
</MyCompopent>

let component2 = <div id="a" cls="b" style="width:100px;height:100px;background-color:lightgreen">
        <div></div>
        <p></p>
        <div></div>
        <div></div>
    </div>

component2.mountTo(document.body);