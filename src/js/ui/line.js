
const Dom = require('../base/dom');
const View = require('../ui/view');
const Drag = require('../base/drag');

class Line extends View{
    constructor(){
        super();
        this.el.addClass('cool-ui-line');
        this.drag = new Drag(this.el);
        initEvent.call(this);
    }
    render(){
        return [
            '<canvas ref="canvas" class="cool-canvas"></canvas>',
            '<div ref="ctrlLineStart" class="cool-control cool-ui-line-start"></div>',
            '<div ref="ctrlLineEnd" class="cool-control cool-ui-line-end"></div>'
        ].join('')
    }
}


function initEvent() {
    var self = this;
    var ctrl;
    var startW;
    var startH;
    var startMX;
    var startMY;
    var startDX;
    var startDY;

    this.drag.on('dragstart', function (obj) {
        var event = obj.event;
        var target = event.target;
        startW = obj.width;
        startH = obj.height;
        startMX = obj.mouseX;
        startMY = obj.mouseY;
        startDX = obj.domX;
        startDY = obj.domY;
        ctrl = '';
        if (self.$refs.ctrlLineStart.isConainer(target)) {
            this.stop();
            ctrl = 'lineStart';
        }
        if (self.$refs.ctrlLineEnd.isConainer(target)) {
            this.stop();
            ctrl = 'lineEnd';
        }

    });
    this.drag.on('dragmove', function (obj) {
        function lineStart(){
            var startStyles = {left:'auto',top:'auto',right:'auto',bottom:'auto'};
                var endStyles = { left: 'auto', top: 'auto', right: 'auto', bottom: 'auto' };
                if(obj.mouseX > startMX + startW){
                    var w = obj.mouseX - startDX - startW;
                    var x = startDX + startW;
                    startStyles.right = '0px';
                    endStyles.left = '0px';
                }else{
                    var w = startW + (startMX - obj.mouseX);
                    var x = obj.mouseX;
                    startStyles.left = '0px';
                    endStyles.right = '0px';
                }
                if(obj.mouseY > startMY + startH){
                    var h = obj.mouseY - startDY - startH;
                    var y = startDY + startH;
                    startStyles.bottom = '0px';
                    endStyles.top = '0px';
                }else{
                    var h = startH + (startMY - obj.mouseY);
                    var y = obj.mouseY;
                    startStyles.top = '0px';
                    endStyles.bottom = '0px';
                }
                
                self.el.css({
                    'left': x + 'px',
                    'top': y + 'px',
                    'width': w + 'px',
                    'height': h + 'px'
                });

                console.log(x,y,w,h);
                self.$refs.ctrlLineStart.css(startStyles);
                self.$refs.ctrlLineEnd.css(endStyles);
        }

        function lineEnd(){
            var startStyles = { left: 'auto', top: 'auto', right: 'auto', bottom: 'auto' };
            var endStyles = { left: 'auto', top: 'auto', right: 'auto', bottom: 'auto' };
            if (obj.mouseX < startDX) {
                var w = startDX - obj.mouseX;
                var x = obj.mouseX;
                endStyles.left = '0px';
                startStyles.right = '0px';
            } else {
                var w = obj.mouseX - obj.domX;
                var x = startDX;
                endStyles.right = '0px';
                startStyles.left = '0px'
            }

            if (obj.mouseY < startDY) {
                var h = startDY - obj.mouseY;
                var y = obj.mouseY;
                endStyles.top = '0px';
                startStyles.bottom = '0px'
            } else {
                var h = obj.mouseY - obj.domY;
                var y = startDY;
                endStyles.bottom = '0px'
                startStyles.top = '0px'
            }


            self.el.css({
                'left': x + 'px',
                'top': y + 'px',
                'width': w + 'px',
                'height': h + 'px'
            });
            console.log(x, y, w, h);
            self.$refs.ctrlLineStart.css(startStyles);
            self.$refs.ctrlLineEnd.css(endStyles);
        }
        switch (ctrl) {
            case 'lineStart':
                lineStart();
                break;
            case 'lineEnd':
                lineEnd();
                break;
        }
    });
    this.drag.on('dragend', function () {
        this.start();
    })
}

module.exports = Line;