
const Base = require('../base/base');
const Event = require('../base/event');
const Dom = require('../base/dom');

class View extends Event {
    constructor() {
        super();
        this.refs = {};
        this.$refs = {};
        this.__el = Dom.$('<div class="cool-view"></div>');
        this.el.append(Dom.$(this.render()));
        disposeDom.call(this)
    }
    get el(){
        return this.__el;
    }
    render(){
        
    }
    events(){
    
    }
    appendTo(el){
        el = Dom.$(el);
        el.append(this.el);
    }
}

function disposeDom(){
    var refs = this.el.find('[ref]');
    var self = this;
    refs.each(function(el){
        var $el = Dom.$(el);
        var key = $el.attr('ref');
        self.refs[key] = el;
        self.$refs[key] = $el;
    });
    var events = this.events();
    if(events){
        Base.each(events,function(fn,str){
            var arr = str.split(/\s+/);
            var eventName = arr.shift();
            var selector = arr.join(' ');
            if(typeof fn === 'string'){
                fn = self[fn];
            }
            if(typeof fn === 'function') self.el.find(selector).on(eventName,Base.bind(fn,self));
        });
    }
}

module.exports = View;