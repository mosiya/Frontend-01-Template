var parser = require('./parser');
const { Template } = require('webpack');
module.exports = function(source, map) {
   console.log('your loader is running: ',this.resourcePath)
   let tree = parser.parseHTML(source);
   let template = null; //tree.children[0];
   let script = null;
   for(let node of tree.children) {
       if(node.tagName == 'template'){
           template = node.children.filter(e => e.type != 'text')[0];
       }
       if(node.tagName == 'script'){
           script = node.children[0].content;
       }
   }
   let createCode = '';
   let visit = (node) =>{
       if(node.type === 'text'){
           return JSON.stringify(node.content);
       }
       let attrs = {};
       for(let attribute of node.attributes){
           attrs[attribute.name] = attribute.value;
       }
       let children = node.children.map(node => {
           console.log('node', node);
           return visit(node);
       });
       return `createElement("${node.tagName}",${JSON.stringify(attrs)}, ${children})`
   }

   let r = `
       import {createElement, Text, Wrapper} from './createElement.js'
       export class Carousel {
           setAttribute(name, value){
               this[name] = value;
           }
           render(){
               return ${visit(template)}
           }
           mountTo(parent) {
               this.render().mountTo(parent);
           }
       }
   `
   console.log(r);
   return r;
}