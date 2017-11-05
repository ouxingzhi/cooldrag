var base = require('./base');

var slice = Array.prototype.slice;

class Event{
    constructor(){
        this.___events = {};
    }
    on(type, fn){
        var events = this.___events[type] = this.___events[type] || [];
        events.push(fn);
    }
    off(type, fn){
        if(!fn) {
            this.___events[type] = [];
            return;
        }
        if (this.___events[type]) {
            var evnets = this.___events[type];
            for (var l = evnets.length - 1; l > -1; l--) {
                if (events[l] === fn) events.splice(l, 1);
            }
        }
    }
    emit(type) {
        var args = slice.call(arguments, 1);
        var events = this.___events[type] = this.___events[type] || [];
        var self = this;
        base.each(events, function (fn) {
            fn.apply(self, args);
        })
    }
}


module.exports = Event;