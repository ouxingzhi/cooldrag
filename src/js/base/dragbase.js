const Base = require('./base');
const Dom = require('./dom');
const Event = require('./event');

var $document;
class DragBase extends Event {
    constructor(el, ops) {
        super();
        if (typeof el === 'string') {
            this._el = Dom.$(el);
        } else {
            this._el = el;
        }
        this.isAllowDragX = true;
        this.isAllowDragY = true;
        setOptions.call(this, ops);
        init.call(this);
    }

    start() {
        this.isAllowDragX = true;
        this.isAllowDragY = true;
    }
    startX() {
        this.isAllowDragX = true;
    }
    startY() {
        this.isAllowDragY = true;
    }
    stop() {
        this.isAllowDragX = false;
        this.isAllowDragY = false;
    }
    stopX() {
        this.isAllowDragX = false;
    }
    stopY() {
        this.isAllowDragY = false;
    }
    destroy() {
        this._el.off('mousedown', this._mousedown);
        $document.off('mouseup', this._mouseup);
        $document.off('mousemove', this._mousemove)
    }
    get el() {
        return this._el;
    }
}

function setOptions(ops) {
    ops = ops || {};
    if (ops.onDragStart) {
        this.on('dragstart', ops.onDragStart);
    }
    if (ops.onDragEnd) {
        this.on('dragend', ops.onDragEnd);
    }
    if (ops.onDragMove) {
        this.on('dragmove', ops.onDragMove);
    }
}

function init() {
    $document = $document || Dom.$(document);

    initEvent.call(this);
}

function initEvent() {
    var isDown = false;
    var startMouseX;
    var startMouseY;
    var startDomLeft;
    var startDomTop;
    var diffX;
    var diffY;
    this._mousedown = Base.bind(function(e) {
        // console.log('mousedown', e)
        isDown = true;
        startMouseX = e.pageX;
        startMouseY = e.pageY;
        var pos = this.el.posByPage();
        startDomLeft = pos.left;
        startDomTop = pos.top;
        diffX = startMouseX - startDomLeft;
        diffY = startMouseY - startDomTop;
        this.emit('dragstart', {
            event: e,
            el: this.el,
            x: startMouseX - diffX,
            y: startMouseY - diffY,
            domX: startDomLeft,
            domY: startDomTop,
            width: this.el.width(),
            height: this.el.height(),
            mouseX: startMouseX,
            mouseY: startMouseY
        })
    }, this);

    this._mouseup = Base.bind(function(e) {
        if (isDown) {
            var left = e.pageX - diffX;
            var top = e.pageY - diffY;

            this.emit('dragend', {
                event: e,
                el: this.el,
                x: left,
                y: top,
                domX: startDomLeft,
                domY: startDomTop,
                width: this.el.width(),
                height: this.el.height(),
                mouseX: e.pageX,
                mouseY: e.pageY
            });
            isDown = false;
        }
    }, this);

    this._mousemove = Base.bind(function(e) {
        if (isDown) {
            e.preventDefault();
            var left = e.pageX - diffX;
            var top = e.pageY - diffY;
            this.emit('dragmove', {
                event: e,
                el: this.el,
                x: left,
                y: top,
                domX: startDomLeft,
                domY: startDomTop,
                width: this.el.width(),
                height: this.el.height(),
                mouseX: e.pageX,
                mouseY: e.pageY
            });
        }

    }, this)
    this.el.on('mousedown', this._mousedown);
    $document.on('mouseup', this._mouseup);
    $document.on('mousemove', this._mousemove)
        // this._el.on('mousemove',mousemove);
}



module.exports = DragBase;