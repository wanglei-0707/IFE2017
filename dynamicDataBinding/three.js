"use strict";
/**
 * 思路：定义一个原型对象属性handler，存放所有的事件处理函数，定义另一个原型对象属性parentObj，键存放每一个属性，值存放该属性的父节点
 * 每一个属性改变时，在setter里访问循环parentObj，直到对应的值为null，也就是到达最顶层属性，遍历到的属性都触发对应的事件处理函数
 */
function Observer(obj, parent){
    this.data = obj;
    parent = parent || null;
    this.traversal(obj, parent);
}

Observer.prototype.handler = {};
Observer.prototype.parentObj = {};

Observer.prototype.traversal = function(obj, parent){
    let val;
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            val = obj[key];
            if(Object.prototype.toString.call(val).slice(8, -1) === 'Object'){
                new Observer(val, key);
            }
            this.parentObj[key] = parent;
            this.setAccessor(key, val);
        }
    }
};
Observer.prototype.setAccessor = function(key, val){
    var self = this;
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function(){
            return val;
        },
        set: function(newval){
            if(newval === val){
                return;
            }
            val = newval;
            while(self.parentObj[key]){
                key = self.parentObj[key];
                self.$emit(key);
            }
        }
    });
};
Observer.prototype.$watch = function(key, fun){
    var self = this;
    if(!(key in self.handler)){
        self.handler[key] = [];
    }
    self.handler[key].push(fun);
    return this;
};
Observer.prototype.$emit = function(key){
    var self = this;
    if(!self.handler[key]){
        return;
    }
    var args = Array.prototype.slice.call(arguments, 1);
    for(let i=0;i<self.handler[key].length;i++){
        self.handler[key][i].call(self, args);
    }
};

let app2 = new Observer({
    name: {
        firstName: {
            first: 'yi',
            second: {
                a: 'a',
                b: 'b'
            }
        },
        lastName: 'liang',
    },
    age: 25
});

app2.$watch('name', function (newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。');
});
app2.$watch('firstName', function (newFirstName) {
    console.log('我的名发生了变化，可能是第一个字变了，也可能是第二个字变了。');
});
app2.$watch('second', function (newstr) {
    console.log('我发生了变化，可能是a变了，也可能是b变了。');
});
app2.data.name.firstName.second.a = 'aa';
app2.data.name.firstName.second.b = 'bb';
app2.data.name.firstName.first = 'blablabla';
app2.data.name.firstName.second = 'blablabla';
app2.data.name.firstName = 'hahaha';
app2.data.name.lastName = 'blablabla';
