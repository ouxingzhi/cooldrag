const Dom = require('../base/dom');
const Drag = require('../base/drag');
const View = require('./view');

const defaultConfig = {
    minWidth: 100,
    minHeight: 100,
    maxWidth: 200,
    maxHeight: 200,
    useResize: true
}

class Component extends View {
    constructor(config) {
        super();
        this.config = Object.assign({}, defaultConfig, config);
        this.el.addClass('cool-ui-component');
        this.drag = new Drag(this.el);
        initEvent.call(this)
    }
    render() {
        return [
            '<canvas ref="canvas" class="cool-canvas"></canvas>',
            '<div ref="content" class="cool-content"></div>',
            '<div ref="ctrlLeftTop" class="cool-control cool-control-left-top"></div>',
            '<div ref="ctrlRightTop" class="cool-control cool-control-right-top"></div>',
            '<div ref="ctrlLeftBottom" class="cool-control cool-control-left-bottom"></div>',
            '<div ref="ctrlRightBottom" class="cool-control cool-control-right-bottom"></div>',
            '<div ref="interLeft" class="cool-interface cool-interface-left"></div>',
            '<div ref="interTop" class="cool-interface cool-interface-top"></div>',
            '<div ref="interBottom" class="cool-interface cool-interface-bottom"></div>',
            '<div ref="interRight" class="cool-interface cool-interface-right"></div>'
        ].join('')
    }
    to(pos, size) {
        this.el.css({
            'left': pos.x + 'px',
            'top': pos.y + 'px',
            'width': size.w + 'px',
            'height': size.y + 'px'
        });
        this.$refs.canvas.attr({
            width: size.w,
            height: size.h
        })
    }
    getPos() {
        var x = parseFloat(this.el.css('left'));
        var y = parseFloat(this.el.css('top'));
        var w = parseFloat(this.el.css('width'));
        var h = parseFloat(this.el.css('height'));
        return {
            x: x,
            y: y,
            w: w,
            h: h,
            inter: {
                left: this.$refs.interLeft.posByPage(),
                top: this.$refs.interTop.posByPage(),
                right: this.$refs.interRight.posByPage(),
                bottom: this.$refs.interBottom.posByPage()
            }
        }
    }
}



function initEvent() {
    var self = this;
    var ctrl;
    var startW;
    var startH;
    var startMX;
    var startMY;
    this.drag.on('dragstart', function(obj) {
        var event = obj.event;
        var target = event.target;
        startW = obj.width;
        startH = obj.height;
        startMX = obj.mouseX;
        startMY = obj.mouseY;
        ctrl = '';
        if (self.config.useResize) {
            if (self.$refs.ctrlLeftTop.isConainer(target)) {
                this.stop();
                ctrl = 'lefttop';
            }
            if (self.$refs.ctrlRightTop.isConainer(target)) {
                this.stop();
                ctrl = 'righttop';
            }
            if (self.$refs.ctrlLeftBottom.isConainer(target)) {
                this.stop();
                ctrl = 'leftbottom';
            }
            if (self.$refs.ctrlRightBottom.isConainer(target)) {
                this.stop();
                ctrl = 'rightbottom';
            }
        }

    });
    this.drag.on('dragmove', function(obj) {
        switch (ctrl) {
            case 'lefttop':
                var w = startW + (startMX - obj.mouseX);
                var h = startH + (startMY - obj.mouseY);
                var x = obj.mouseX;
                var y = obj.mouseY;
                if (self.config.minWidth >= w) {
                    w = self.config.minWidth;
                    x = startMX + (startW - self.config.minWidth)
                } else if (self.config.maxWidth <= w) {
                    w = self.config.maxWidth;
                    x = startMX + (startW - self.config.maxWidth)
                }
                if (self.config.minHeight >= h) {
                    h = self.config.minHeight;
                    y = startMY + (startH - self.config.minHeight);
                } else if (self.config.maxHeight <= h) {
                    h = self.config.maxHeight;
                    y = startMY + (startH - self.config.maxHeight)
                }

                self.el.css({
                    'left': x + 'px',
                    'top': y + 'px',
                    'width': w + 'px',
                    'height': h + 'px'
                });
                self.$refs.canvas.attr({
                    width: w,
                    height: h
                })
                break;
            case 'righttop':
                var w = obj.mouseX - obj.domX;
                var h = startH + (startMY - obj.mouseY);
                var y = obj.mouseY;
                if (self.config.minWidth >= w) {
                    w = self.config.minWidth;
                } else if (self.config.maxWidth <= w) {
                    w = self.config.maxWidth;
                }
                if (self.config.minHeight >= h) {
                    h = self.config.minHeight;
                    y = startMY + (startH - self.config.minHeight);
                } else if (self.config.maxHeight <= h) {
                    h = self.config.maxHeight;
                    y = startMY + (startH - self.config.maxHeight)
                }
                self.el.css({
                    'top': y + 'px',
                    'width': w + 'px',
                    'height': h + 'px'
                });
                self.$refs.canvas.attr({
                    width: w,
                    height: h
                })
                break;
            case 'leftbottom':
                var w = startW + (startMX - obj.mouseX);
                var h = obj.mouseY - obj.domY;
                var x = obj.mouseX;
                if (self.config.minWidth >= w) {
                    w = self.config.minWidth;
                    x = startMX + (startW - self.config.minWidth)
                } else if (self.config.maxWidth <= w) {
                    w = self.config.maxWidth;
                    x = startMX + (startW - self.config.maxWidth)
                }
                if (self.config.minHeight >= h) {
                    h = self.config.minHeight;
                } else if (self.config.maxHeight <= h) {
                    h = self.config.maxHeight;
                }
                self.el.css({
                    'left': x + 'px',
                    'width': w + 'px',
                    'height': h + 'px'
                });
                self.$refs.canvas.attr({
                    width: w,
                    height: h
                })
                break;
            case 'rightbottom':
                var w = obj.mouseX - obj.domX;
                var h = obj.mouseY - obj.domY;
                if (self.config.minWidth >= w) {
                    w = self.config.minWidth;
                } else if (self.config.maxWidth <= w) {
                    w = self.config.maxWidth;
                }
                if (self.config.minHeight >= h) {
                    h = self.config.minHeight;
                } else if (self.config.maxHeight <= h) {
                    h = self.config.maxHeight;
                }
                self.el.css({
                    'width': w + 'px',
                    'height': h + 'px'
                });
                self.$refs.canvas.attr({
                    width: w,
                    height: h
                });
                break;
        }
        self.emit('move', self.getPos())
    });
    this.drag.on('dragend', function() {
        this.start();
    })
}


module.exports = Component;