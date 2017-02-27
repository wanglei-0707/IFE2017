(function(){
    function RightClickMenu(options){
        var settings = {
            menuId: 'menu',
            offsetX: 10,
            offsetY: 10
        };
        if(options){
            for(var key in options){
                settings[key] = options[key];
            }
        }
        this.menu = wl.$(settings.menuId);
        this.offsetX = settings.offsetX;
        this.offsetY = settings.offsetY;

        this.initEvents();
    }

    RightClickMenu.prototype.showMenu = function(e){
        e = wl.getEvent(e);
        wl.preDefault(e);
        var posX = e.clientX;
        var posY = e.clientY;
        this.setMenuPos(posX, posY);
    };
    RightClickMenu.prototype.setMenuPos = function(posX, posY){
        var menu = this.menu,
            style = menu.style;
        style.display = 'block';
        var menuWidth = menu.offsetWidth,
            menuHeight = menu.offsetHeight,
            clientWidth = window.innerWidth,
            clientHeight = window.innerHeight,
            left = posX + this.offsetX + menuWidth,
            top = posY + this.offsetY + menuHeight;

        if(left > clientWidth && top > clientHeight){
            left = posX - this.offsetX - menuWidth;
            top = posY - this.offsetY - menuHeight;
        } else if(left > clientWidth){
            left = posX - this.offsetX - menuWidth;
            top = posY + this.offsetY;
        } else if(top > clientHeight){
            left = posX + this.offsetX;
            top = posY - this.offsetY - menuHeight;
        } else{
            left = posX + this.offsetX;
            top = posY + this.offsetY;
        }
        style.left = left + 'px';
        style.top = top + 'px';
    };
    RightClickMenu.prototype.hideMenu = function(e){
        this.menu.style.display = 'none';
    };
    RightClickMenu.prototype.showMenuItem = function(ele){
        alert(ele.innerHTML);
    };
    RightClickMenu.prototype.initEvents = function(){
        var self = this;
        wl.addEvent(document, 'contextmenu', function(e){
            self.showMenu(e);
        });
        wl.addEvent(document, 'click', function(e){
            self.hideMenu(e);
        });
        wl.delegateEvent(this.menu, 'li', 'click', self.showMenuItem);
    };

    window.RightClickMenu = RightClickMenu;
})();
