#### 1、写出一个realm里有多少内置对象(两个方案，差不多)

*可视化代码在homework.html*

```js
var set = new Set();
var objects = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect
];

objects.forEach(o => set.add(o));

for(var i = 0; i < objects.length; i++) {
    var o = objects[i];
    // set.add(o), objects.push(o);
    for(var p of Object.getOwnPropertyNames(o)) {
        var d = Object.getOwnPropertyDescriptor(o, p);
        if( (d.value !== null && typeof d.value === "object") || (typeof d.value === "function")) 
            if(!set.has(d.value))
                set.add(d.value), objects.push(d.value);
        if( d.get )
            if(!set.has(d.get))
                set.add(d.get), objects.push(d.get);
        if( d.set )
            if(!set.has(d.set))
                set.add(d.set), objects.push(d.set);
    }
}
console.log(objects)
console.log(set)
// 441个
```

```js
var set = new Set();
var globalProperties = [ 
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "Array",
    "Date",
    "RegExp",
    "Promise",
    "Proxy",
    "Map",
    "WeakMap",
    "Set",
    "WeakSet",
    "Function",
    "Boolean",
    "String",
    "Number",
    "Symbol",
    "Object",
    "Error",
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "DataView",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint16Array",
    "Uint32Array",
    "Uint8ClampedArray",
    "Atomics",
    "JSON",
    "Math",
    "Reflect"
];

var queue = [];

for(var p of globalProperties) {
    queue.push({
        path: [p],
        object: this[p]
    })
}


let current;

while(queue.length) {
    current = queue.shift();
    console.log(current.path.join('.'));
    if(set.has(current.object)) continue;
    set.add(current.object);

    // let proto = Object.getPrototypeOf(current.object);
    // if(proto) {
    //     queue.push({
    //         path: current.path.concat('__proto__'),
    //         object: proto
    //     })
    // }

    for(let p of Object.getOwnPropertyNames(current.object)) {
        var property = Object.getOwnPropertyDescriptor(current.object, p);
        console.log(property)
        if(property.hasOwnProperty('value') && 
            (property.value != null && typeof property.value === 'object' || typeof property.value === 'function' )) {
            queue.push({
                path: current.path.concat([p]),
                object: property.value
            });
        }
        if(property.get) {
            queue.push({
                path: current.path.concat([p]),
                object: property.get
            });
        }
        if(property.set) {
            queue.push({
                path: current.path.concat([p]),
                object: property.set
            });
        }
    }
}
console.log(set) // 441个
```

可视化效果：

![可视化](https://github.com/mosiya/Frontend-01-Template/tree/master/week05/object_tree.png)