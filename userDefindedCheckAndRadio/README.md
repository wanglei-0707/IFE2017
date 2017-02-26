## label标签

### 含义
html中的label标签代表用户界面中的一个条目的题目。

### 属性
1. for属性：for属性指向与label标签在同一个文档中的相关元素。文档中第一个ID值为for属性值的元素即为这个label标签的标签控件。
2. form属性(**HTML5中已删除该属性**)：form属性指向与label标签相联系的form元素，form属性的值为相联系的form元素的ID。这个属性可以使label标签放在文档的任意位置，而不是必须作为相联系的form元素的后代。虽然form属性已经被移出，但是在脚本中还是可以通过HTMLLabelElement.form这个只读属性获取到与label相联系的form表单元素，若form属性未设置或者所指向的不是form元素，则返回null。

### 用法
1. 可以将label的标签控件直接包裹在label标签内部，如下所示：
```
<label>姓名
    <input type="text">
</label>
```
2. 使用for属性。此时标签控件不用必须放在label标签内部。
```
<label for="user-name">姓名</label>
<input type="text" id="user-name">
```
### 注意
1. 当点击label标签时，相关联的标签控件会获得焦点
2. 一个标签控件可以与多个label绑定

## background-position属性
### 含义：该属性为设置了background-image属性的元素设置背景图片的初始位置。

### 取值
一个到四个与元素盒子的边缘相关的2D位置的值
1. 默认值 0% 0%
2. 关键词： top|bottom|left|right|center
3. 百分制：
