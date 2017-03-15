"use strict";
function Observer(obj){
    this.data = obj;
    this.handler = {};
    this.traversal(obj);
}

Observer.prototype.traversal = function(obj){
    let val;
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            val = obj[key];
            if(Object.prototype.toString.call(val).slice(8, -1) === 'Object'){
                new Observer(val);
            }
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
            console.log('你访问了' + key);
            return val;
        },
        set: function(newval){
            console.log('你设置了' + key + ',新的值为' + newval);
            if(newval === val){
                return;
            }
            val = newval;
            // if(Object.prototype.toString.call(newval).slice(8, -1) === 'Object'){
            //     new Observer(newval);
            // }
            self.$emit(key, newval);
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

let app1 = new Observer({
  name: 'youngwind',
  age: 25,
  son: {
      name: 'Jack',
      age: 3
  }
});

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});

app1.$watch('d', function(age){
    console.log('我的年纪变大了，现在已经是：' + age + '岁了');
})


app1.data.name;
app1.data.son.name;
app1.data.age = 100;
