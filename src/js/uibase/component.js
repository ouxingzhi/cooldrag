const Base = require('../base/base');
const Dom = require('../base/dom');
const Drag = require('../base/drag');
const View = require('./view');

const defaultConfig = {
    x: 0,
    y: 0,
    width: 180,
    height: 180,
    minWidth: 100,
    minHeight: 100,
    maxWidth: 200,
    maxHeight: 200,
    useResize: true
}

class Component extends View {
    constructor(config) {
        super();
        this.lastPos;
        this.lastSize;
        this.inters = {};
        this.$inters = {};
        disposeInterface.call(this);
        this.config = Object.assign({}, defaultConfig, config);
        this.el.addClass('cool-ui-component');
        this.drag = new Drag(this.el);
        this.to({
            x: this.config.x,
            y: this.config.y
        }, {
            w: this.config.width,
            h: this.config.height
        })
        initEvent.call(this);
    }
    contentRender() {
        return '';
    }
    render() {
        var content = this.contentRender();
        return [
            '<canvas ref="canvas" class="cool-canvas"></canvas>',
            '<div ref="content" class="cool-content">' + content + '</div>',
            '<div ref="ctrlLeftTop" class="cool-control cool-control-left-top"></div>',
            '<div ref="ctrlRightTop" class="cool-control cool-control-right-top"></div>',
            '<div ref="ctrlLeftBottom" class="cool-control cool-control-left-bottom"></div>',
            '<div ref="ctrlRightBottom" class="cool-control cool-control-right-bottom"></div>',
            '<div interface="left" ref="interLeft" class="cool-interface cool-interface-left"></div>',
            '<div interface="top" ref="interTop" class="cool-interface cool-interface-top"></div>',
            '<div interface="bottom" ref="interBottom" class="cool-interface cool-interface-bottom"></div>',
            '<div interface="right" ref="interRight" class="cool-interface cool-interface-right"></div>'
        ].join('')
    }
    to(pos, size) {
        this.lastPos = pos = pos || this.lastPos || {
            x: defaultConfig.x,
            y: defaultConfig.y
        }
        this.lastSize = size = size || this.lastSize || {
            x: defaultConfig.width,
            y: defaultConfig.height
        }
        this.el.css({
            'left': pos.x + 'px',
            'top': pos.y + 'px',
            'width': size.w + 'px',
            'height': size.h + 'px'
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
        var inter = {};
        Base.each(this.$inters, function($inter, key) {
            inter[key] = $inter.posByPage();
        });
        return {
            x: x,
            y: y,
            w: w,
            h: h,
            inter: inter
        }
    }
    reScanInterface(){
        disposeInterface.call(this);
    }
}

function disposeInterface() {
    var inters = this.el.find('[interface]');
    var self = this;
    inters.each(function(inter) {
        var $inter = Dom.$(inter);
        var key = $inter.attr('interface');
        if (!self.inters[key]) {
            self.inters[key] = inter;
            self.$inters[key] = $inter;
        }
    });
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