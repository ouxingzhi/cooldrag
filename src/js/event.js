var base = require('./base');

function Event(scope){
    this._scope = scope;
    this._events = {};
}

var slice = Array.prototype.slice;

Event.prototype = {
    constructor: Event,
    on:function(type,fn){
        var events = this._events[type] = this._events[type] || [];
        events.push(fn);
    },
    off:function(type,fn){
        if (!fn) {
            this._events[type] = [];
            return;
        }
        if (this._events[type]){
            var evnets = this._events[type];
            for (var l = evnets.length-1; l > -1; l--){
                if(events[l] === fn) events.splice(l,1);
            }
        }
    },
    emit:function(type){
        var args = slice.call(arguments,1);
        var events = this._events[type] = this._events[type] || [];
        var self = this;
        base.each(events,function(fn){
            fn.apply(self._scope,args);
        })
    }
}


module.exports = Event;