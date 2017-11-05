const Base = require('./base');
const Dom = require('./dom');
const Event = require('./event');

var $document;
class DragBase extends Event {
    constructor(ops) {
        super();
        this.isAllowDragX = true;
        this.isAllowDragY = true;
        setOptions.call(this, ops);
        init.call(this);
    }
    checkDown(){
        return false;
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
        $document.off('mousedown', this._mousedown);
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
    if(ops.checkDown){
        this.checkDown = ops.checkDown;
    }
}

function init() {
    $document = $document || Dom.$(document);

    initEvent.call(this);
}

function initEvent() {
    var isDown = false;

    this._mousedown = Base.bind(function (e) {
        // console.log('mousedown', e)
        isDown = this.checkDown(e);
        if (isDown){
            this.emit('dragstart', {
                mouseX: e.pageX,
                mouseY: e.pageY
            })
        }
    }, this);

    this._mouseup = Base.bind(function (e) {
        if (isDown) {
            this.emit('dragend', {
                mouseX: e.pageX,
                mouseY: e.pageY
            });
            isDown = false;
        }
    }, this);

    this._mousemove = Base.bind(function (e) {
        if (isDown) {
            e.preventDefault();
            this.emit('dragmove', {
                mouseX: e.pageX,
                mouseY: e.pageY
            });
        }

    }, this)
    $document.on('mousedown', this._mousedown);
    $document.on('mouseup', this._mouseup);
    $document.on('mousemove', this._mousemove)
    // this._el.on('mousemove',mousemove);
}



module.exports = DragBase;
