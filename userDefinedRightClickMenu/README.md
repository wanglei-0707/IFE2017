## 自定义网页右键菜单

### 基本思路
设置菜单元素为绝对定位并隐藏，给document绑定oncontextMenu事件监听并且取消事件的默认行为。事件发生时获取事件发生时鼠标的坐标，并将菜单元素定位到鼠标点击的位置(根据需要显示的位置进行修改)。定位前判断菜单元素的位置会不会超出屏幕，根据计算判断是否超过边界来决定菜单元素是显示在右下，还是左下，或者右上、左上。

### oncontextmenu事件
oncontextmenu事件在元素中用户右击鼠标时触发并打开上下文菜单。自己定义打开的菜单时，需要取消事件的默认行为。

### 获取元素的css样式
#### ele.style
元素的style属性对应着元素的内联样式。是一个CSSStyleDeclaration对象。**可读可写**，获取样式时，只能获取到在html标签内设置的内联样式，如果没有对应的内联样式属性，则返回空。设置时也是设置成内联样式。
#### window.getComputedStyle()
window.getComputedStyle() 方法会在一个元素应用完有效样式且计算完所有属性的基本值之后给出所有 CSS 属性的值。即获取当前元素所有最终使用的CSS属性值。
```
var style = window.getComputedStyle(ele, [pseudoElt]);
```
参数值：
1. ele是需要获取计算样式的元素
2. pseudoElt可选，指定一个要匹配的伪元素的字符串。必须对普通元素省略（或null）。当设置了第二个参数时，获取的是相应的伪元素的样式。
返回值：返回的样式是一个实时的 CSSStyleDeclaration 对象，当元素的样式更改时，它会自动更新本身。返回的对象是 **只读** 的，可以用于获取元素的样式(包括内嵌样式，内部样式，外部样式，默认的样式)。

在许多在线的演示代码中, getComputedStyle 是通过 document.defaultView 对象来调用的。 大部分情况下，这是不需要的， 因为可以直接通过window对象调用。但有一种情况需要使用 defaultView,  那是在firefox3.6上访问子框架内的样式 (iframe)

兼容性：现代浏览器都支持，IE9+支持
#### ele.currentStyle
IE特有的属性。作用和window.getComputedStyle()差不多。可以获取内嵌样式，内部样式，外部样式，默认的样式。但是也存在一些差异。如不支持获取伪元素的样式，返回值是设置的属性值，不是计算后的值。

#### getPropertyValue()
getPropertyValue方法可以获取CSS样式申明对象上的属性值.
```
window.getComputedStyle(element, null).getPropertyValue("width");
```
不使用该方法，直接使用键值访问也是可以的。原文中举了一个float属性的例子，来说直接使用键值和使用getPropertyValue()方法的区别，说是使用getPropertyValue方法时应该是cssFloat与styleFloat，可是我试了一下，并不是这样啊。。。。。原文是12年写的，可能浏览器更新了，不存在这个问题了吧！

当属性带'-'连字符时，直接传入带连字符的属性，不支持驼峰式写法。但是我发现在火狐和IE下带连字符的属性的返回值为空。。。。

### 获取鼠标事件的各种坐标
#### clientX/Y
获取到的是触发点相对浏览器可视区域左上角距离，不随页面滚动而改变

兼容性：所有浏览器均支持
#### pageX/Y
获取到的是触发点相对文档区域左上角距离，会随着页面滚动而改变。

兼容性：除IE6/7/8不支持外，其余浏览器均支持
#### offsetX/Y
获取到是触发点相对被触发dom的左上角距离，不过左上角基准点在不同浏览器中有区别，其中在IE中以内容区左上角为基准点不包括边框，如果触发点在边框上会返回负值，而chrome中以边框左上角为基准点。  

兼容性：IE所有版本，chrome，Safari均完美支持，Firefox不支持
#### layerX/Y
获取到的是触发点相对被触发dom左上角的距离，数值与offsetX/Y相同，这个变量就是firefox用来替代offsetX/Y的，基准点为边框左上角，但是有个条件就是，被触发的dom需要设置为position:relative或者position:absolute，否则会返回相对html文档区域左上角的距离

兼容性：IE6/7/8不支持，opera不支持，IE9/10和Chrome、Safari均支持
#### screenX/Y
获取到的是触发点相对显示器屏幕左上角的距离，不随页面滚动而改变

兼容性：所有浏览器均支持

参考资料：
[获取元素CSS值之getComputedStyle方法熟悉](http://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/)

[Window.getComputedStyle()--MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)

[原生js获取鼠标坐标方法全面讲解](http://www.bbs0101.com/archives/124.html)
