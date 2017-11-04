
var base = require('./base');

var slice = [].slice;

var nodeReg = /^<.+>$/i;

var con = document.createElement('div');

var $ = exports.$ = function(selector,root){
    var arr = init(selector,root);
    setProto(arr);
    return arr;
}

function setProto(arr){
    arr.__proto__ = $.prototype;
}

function isDom(el){
    return !!(el && el.querySelector && el.nodeType)
}

function init(selector, root) {
    root = root || document;
    var arr = [];
    if(typeof selector === 'string'){
        if (nodeReg.test(selector)) {
            con.innerHTML = selector;
            arr = slice.call(con.childNodes);
        } else {
            arr = slice.call(root.querySelectorAll(selector));
        }
    } else if (isDom(selector)){
        arr = [selector];
    } else if(selector instanceof $){
        arr = selector.slice();
    }
    return arr;
}

// var arrayProto = function(){};
// arrayProto.prototype = Array.prototype;
// arrayProto.constructor = Array
// var fn = $.prototype = new arrayProto();
$.prototype = Array.prototype;
$.constructor = $;
var fn = $.prototype = new $();
var createDomId = base.uniquFactory('id');

fn.each = function(fn,scope){
    base.each(this,base.bind(fn,scope||this));
    return this;
}

fn.find = function(selector){
    var arr = [];
    var map = {};
    this.each(function(item){
        var list = item.querySelector(selector);
        base.each(list,function(item){
            var id = item.__$id;
            if(id){
                if(!map[id]){
                    arr.push(item);
                    map[id] = true;
                }
            }else{
                item.__$id = createDomId();
                arr.push(item);
                map[item.__$id] = true;
            }
        })
    });
    setProto(arr);
    return arr;
}

fn.siblings = function(){
    var arr = [];
    var map = {};
    this.each(function (item) {
        var list = item.parentNode.childNodes;
        base.each(list, function (_item) {
            if(item === _item) return;
            var id = _item.__$id;
            if (id) {
                if (!map[id]) {
                    arr.push(_item);
                    map[id] = true;
                }
            } else {
                _item.__$id = createDomId();
                arr.push(_item);
                map[_item.__$id] = true;
            }
        })
    });
    setProto(arr);
    return arr;
}

fn.next = function () {
    var arr = [];
    var map = {};
    this.each(function (item) {
        var next = item.nextSibling;
        var id = next.__$id;
        if (id) {
            if (!map[id]) {
                arr.push(next);
                map[id] = true;
            }
        } else {
            next.__$id = createDomId();
            arr.push(next);
            map[next.__$id] = true;
        }
    });
    setProto(arr);
    return arr;
}

fn.parent = function(){
    var arr = [];
    var map = {};
    this.each(function (item) {
        var parent = item.parentNode;
        var id = parent.__$id;
        if (id) {
            if (!map[id]) {
                arr.push(parent);
                map[id] = true;
            }
        } else {
            parent.__$id = createDomId();
            arr.push(parent);
            map[parent.__$id] = true;
        }
    });
    setProto(arr);
    return arr;
}

fn.css = function(name,val){
    var self = this;
    if(typeof name === 'object'){
        base.each(name,function(val,key){
            self.css(key,val);
        });
        return;
    }
    if(val == null) return this[0] && this[0].style[name];
    this.each(function(item){
        item.style[name] = val;
    });
    return this;
}

fn.show = function(){
    this.css('display','');
    return this;
};

fn.hide = function(){
    this.css('display','none');
    return this;
}


fn.on = function(type,fn,c){
    var types = type.split(/\s+/);
    this.each(function(item){
        base.each(types,function(type){
            item.addEventListener(type, fn, c);
        })
    });
    return this;
}

fn.off = function(type,fn){
    this.each(function (item) {
        item.removeEventListener(type, fn);
    });
    return this;
}

fn.emit = function(type,params){
    var event = document.createEvent('Event');
    event.initEvent(type,true,true);
    event.params = params;
    this.each(function(item){
        item.dispatchEvent(event);
    });
    return this;
}

fn.posByPage = function(){
    var el = this[0];
    var source = el;
    if(!el) return {left:0,top:0}
    var left = 0;
    var top = 0;
    do{
        left += el.offsetLeft;
        top += el.offsetTop;
    }while(el = el.offsetParent);
    return {
        left:left,
        top:top,
        width: source.offsetWidth,
        height: source.offsetHeight
    }
}

fn.width = function(){
    var el = this[0];
    if (!el) return 0;
    return el.offsetWidth;
}

fn.height = function () {
    var el = this[0];
    if (!el) return 0;
    return el.offsetHeight;
}

function checkIn(targetPos, curPos){
    var targetLeft = targetPos.left;
    var targetRight = targetPos.left + targetPos.width;
    var targetTop = targetPos.top;
    var targetBottom = targetPos.top + targetPos.height;

    var curLeft = curPos.left;
    var curRight = curPos.left + curPos.width;
    var curTop = curPos.top;
    var curBottom = curPos.top + curPos.height;

    return (
        (
            targetLeft > curLeft && targetLeft < curRight
            ||
            targetRight > curLeft && targetRight < curRight
        )
        &&
        (
            targetTop > curTop && targetTop < curBottom
            ||
            targetBottom > curTop && targetBottom < curBottom
        )
    )
}

fn.collision = function(el){
    var target = $(el);
    var targetPos = target.posByPage();
    var curPos = this.posByPage();
    return checkIn(targetPos, curPos) || checkIn(curPos,targetPos);
}