function createElement(Cls, attributes, ...children){
	let o = {};
	if(typeof Cls === 'string'){
		
	} else {
		o = new Cls();
	}
	for(let key in attributes){
		o.attributes[key] = attributes[key];
	}
	for(let child of children){
		o.children.push(child);
	}
	return o;
	
}
class Parent{
	constructor(){
		this.children = [];
	}
	set class(v){
		debugger;
	}
}
class Child{
	constructor(){
		this.children = [];
		this.attributes = {};
	}
}
let component = <Parent id="a" class="77" >
<Child id="ch1" />
<Child id="ch2"  />
</Parent>
component.class = "88"
let component2 = <div id="a" />
debugger;