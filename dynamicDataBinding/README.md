## Object.defineProperty()
直接在一个对象上定义一个新属性，或者修改一个已经存在的属性，返回该对象。

1. 语法：
```
Object.defineProperty(obj, prop, descriptor)
```
    1. obj:属性坐在的对象
    2. prop：属性的名字  
    3. descriptor：该对象的属性必须是configurable、enumerable、writable、value、get、set
        1. configurable:表示能否通过delete删除属性,一旦设置为false，即不可配置的，则不能再改为可配置的了，此时只能writable属性，其他属性都不能再修改，否则会报错。

## Object.defineProperties(obj, propertiesDescriptorObj)
## Object.getOwnPropertyDescriptor(obj, prop)
