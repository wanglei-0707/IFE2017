"use strict";
function Observer(obj){
    this.data = obj;
    this.traversal(obj);
}

Observer.prototype.traversal = function(obj){
    let val;
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            val = obj[key];
            this.setAccessor(key, val);
        }
    }
};
Observer.prototype.setAccessor = function(key, val){
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function(){
            console.log('你访问了' + key + ":" + val);
            return val;
        },
        set: function(newval){
            console.log('你设置了' + key + ',新的值为' + newval);
            if(newval === val){
                return;
            }
            val = newval;
        }
    });
};

let app1 = new Observer({
  name: 'youngwind',
  age: 25
});

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});

app1.data.name;
app1.data.age = 100;
app2.data.university;
app2.data.major = 'science';
app2.data.major;
