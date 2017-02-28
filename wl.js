var wl = (function(){
	return {
		$: function(id){
			return document.getElementById(id);
		},
		//添加事件句柄
		addEvent: function(ele,type,handler){
			if(ele.addEventListener){
				ele.addEventListener(type,handler,false);
			}else if(ele.attachEvent){
				/*因为在IE中，事件侦听器即事件处理函数内部的this默认指向window对象，
				W3C中指向所绑定的对象本身，因此为了使事件处理函数内部的this指向所绑定的对象，
				可以将函数赋值为该对象的某个属性成为他的方法，那么this指针就指向了所绑定的对象本身。*/
				ele['e'+type+handler] = handler;
				ele[type+handler] = function(){ele['e'+type+handler](window.event);};
				ele.attachEvent("on"+type,ele[type+handler]);
			}
			else{
				ele["on"+type] = handler;
			}
		},
		//取消事件句柄
		removeEvent: function(element,type,handler){
			if(element.removeEventListener){
				element.removeEventListener(type,handler,false);    //false:事件冒泡，true：事件捕获
			}else if(element.detachEvent){
				ele['e'+type+handler] = handler;
				ele[type+handler] = function(){ele['e'+type+handler](window.event);};
				ele.detachEvent("on"+type,ele[type+handler]);
			}
			else{
				element["on"+type] = null;
			}
		},
		//阻止事件冒泡
		stopPropa: function(event){
	        if(event.stopPropagation){
	                event.stopPropagation();
	        }else{
	                event.cancelBubble  = true;
	        }
		},
		//事件代理
		delegateEvent: function(ele, tag, type, handler){
			var self = this;
			this.addEvent(ele, type, function(event){
				event = event || window.event;
				var target = event.target || event.srcElement;
				if(target && target.tagName === tag.toUpperCase()){
					handler.call(null, target);
					self.stopPropa(event);
				}
			});
		},
		//获取事件
		getEvent: function(event){
			return event || window.event;
		},
		//获取target
		getTarget: function(event){
			event = event || window.event;
			return event.target || event.srcElement;
		},
		//阻止事件的默认行为
		preDefault: function(event){
	        if(event.preventDefault){
	                event.preventDefault();
	        }else{
	                event.returnValue = false;
	        }
		},
		trim: function(){
			return this.replace(/(^\s+)|(\s+$)/g,'');
		},
		//判断一个数组是数组
		isArray: function(obj){
			return Object.prototype.toString().call(obj).slice(8, -1) === 'Array';
		},
		//图片加载函数
		preLoadImg: function(src,callBack){
			var img = new Image();
			img.src = src;
			if(!!window.ActiveXObject){  //判断是否是IE浏览器
				img.onreadystatechange = function(){
					if(this.readyState == "complete"){
						callBack.call(img);
					}
				};
			}else{
				img.onload = function(){
					callBack.call(img);
				};
			}
		},
		//解决requestAnimationFrame函数的浏览器兼容问题
		requestAnimFrame: (function(){
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
				function(callback, element) {
					return window.setTimeout(callback, 1000 / 60);
				};
		})(),
		/**
		 * canvas画五角星
		 * @params {} cxt
		 * @params {number} r 内圆半径
		 * @params {number} R 外圆半径
		 * @params {number} x x轴偏移量
		 * @params {number} y y轴偏移量
		 * @params {number} rot 旋转角度
		 */
		 drawStar: function(cxt,r,R,x,y,rot){
			cxt.beginPath();
			for(var i=0;i<5;i++){
				cxt.lineTo(Math.cos((18 + i * 72 - rot) / 180 * Math.PI) * R + x,
					-Math.sin((18 + i * 72 - rot) / 180 * Math.PI) * R + y);
				cxt.lineTo(Math.cos((54 + i * 72 - rot) / 180 * Math.PI) * r + x,
					-Math.sin((54 + i * 72 - rot) / 180 * Math.PI) * r + y);
			}
			cxt.closePath();
			cxt.strokeStyle = "#000";
			cxt.stroke();
		},
		//动态创建script标签，加载js文件
		loadScript: function(url, callback){
			var script = document.createElement('script');
			if(script.readyState){
				script.onreadystatechange = function(){
					if(script.readyState === 'loaded' || script.readyState === 'complete'){
						script.onreadystatechange = null;
						callback();
					}
				};
			}else{
				script.onload = function(){
					callback();
				};
			}
			script.src = url;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	};
})();
