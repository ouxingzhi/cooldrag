const Base = require('./base');
const Dom = require('./dom');
const Event = require('./event');

var $document;

function Drag(el,ops){
    if(!this instanceof Drag){
        return new Drag(el,ops);
    }
    if(typeof el === 'string'){
        this._el = Dom.$(el);
    }else{
        this._el = el;
    }
    this.isAllowDragX = true;
    this.isAllowDragY = true;
    this._event = new Event(this);
    setOptions.call(this,ops);
    init.call(this);
}

function setOptions(ops){
    ops = ops || {};
    if (ops.onDragStart){
        this.on('dragstart', ops.onDragStart);
    }
    if (ops.onDragEnd) {
        this.on('dragend', ops.onDragEnd);
    }
    if (ops.onDragMove) {
        this.on('dragmove', ops.onDragMove);
    }
}

function init(){
    $document = $document || Dom.$(document);
    
    initEvent.call(this);
}

function initEvent(){
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
        var pos = this._el.posByPage();
        startDomLeft = pos.left;
        startDomTop = pos.top;
        diffX = startMouseX - startDomLeft;
        diffY = startMouseY - startDomTop;
        this._event.emit('dragstart',{
            el:this._el,
            domX: startDomLeft,
            domY: startDomTop,
            mouseX: startMouseX,
            mouseY: startMouseY
        })
    },this);

    this._mouseup = Base.bind(function(e) {
        if(isDown){
            var left = e.pageX - diffX;
            var top = e.pageY - diffY;
            // console.log('mouseup', e)
            if (this.isAllowDragX) {
                this._el.css('left',left + 'px');
            }
            if (this.isAllowDragY){
                this._el.css('top', top + 'px');
            }
            isDown = false;
            this._event.emit('dragend', {
                el:this.el,
                x: left,
                y: top,
                width:this._el.width(),
                height:this._el.height(),
                mouseX: e.pageX,
                mouseY: e.pageY
            });
        }
    },this);

    this._mousemove = Base.bind(function(e) {
        if(isDown){
            var left = e.pageX - diffX;
            var top = e.pageY - diffY;
            // console.log(left,top)
            if (this.isAllowDragX) {
                this._el.css('left', left + 'px');
            }
            if (this.isAllowDragY) {
                this._el.css('top', top + 'px');
            }
            this._event.emit('dragmove', {
                el:this._el,
                x: left,
                y: top,
                width: this._el.width(),
                height: this._el.height(),
                mouseX: e.pageX,
                mouseY: e.pageY
            });
        }
        
    },this)
    this._el.on('mousedown',this._mousedown);
    $document.on('mouseup',this._mouseup);
    $document.on('mousemove', this._mousemove)
    // this._el.on('mousemove',mousemove);
}



Drag.prototype = {
    constructor:Drag,
    start:function(){
        this.isAllowDragX = true;
        this.isAllowDragY = true;
    },
    startX: function () {
        this.isAllowDragX = true;
    },
    startY: function () {
        this.isAllowDragY = true;
    },
    stop:function(){
        this.isAllowDragX = false;
        this.isAllowDragY = false;
    },
    stopX:function(){
        this.isAllowDragX = false;
    },
    stopY: function () {
        this.isAllowDragY = false;
    },
    destroy:function(){
        this._el.off('mousedown', this._mousedown);
        $document.off('mouseup', this._mouseup);
        $document.off('mousemove', this._mousemove)
    },
    setX:function(x){
        this._el.css('left', x + 'px');
    },
    setY: function (y) {
        this._el.css('top', y + 'px');
    },
    on:function(){
        return this._event.on.apply(this._event,arguments);
    },
    off:function(){
        return this._event.off.apply(this._event, arguments);
    },
    emit:function(){
        return this._event.emit.apply(this._event, arguments);
    },
    collision:function(el){
        if (el instanceof Drag){
            return this.element().collision(el.element());
        }else if(Base.isDom(el)){
            return this.element().collision(el);
        }
    },
    listenCollision:function(el,fn){
        var self = this;
        var state = Drag.COLLISION_STATE.LEAVE;
        this.on('dragmove',function(){
            if (self.collision(el)){
                if (state == Drag.COLLISION_STATE.LEAVE){
                    state = Drag.COLLISION_STATE.JOIN;
                    fn && fn(state);
                }else{
                    state = Drag.COLLISION_STATE.MOVE;
                    fn && fn(state);
                }
            }else{
                if (state == Drag.COLLISION_STATE.JOIN || state == Drag.COLLISION_STATE.MOVE) {
                    state = Drag.COLLISION_STATE.LEAVE;
                    fn && fn(state);
                }
            }
        })
    },
    element:function(){
        return this._el;
    }
}

Drag.COLLISION_STATE = {
    LEAVE:'leave',
    JOIN:'join',
    MOVE:'move'
}

module.exports = Drag;
