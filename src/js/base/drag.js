const Base = require('./base');
const Dom = require('./dom');
const Event = require('./event');
const DragBase = require('./dragbase');

class Drag extends DragBase{
    constructor(el,ops){
        super(...arguments);
        this.el.css('position','absolute');
        this.on('dragmove',function(obj){
            if (this.isAllowDragX) {
                this.el.css('left', obj.x + 'px');
            }
            if (this.isAllowDragY) {
                this.el.css('top', obj.y + 'px');
            }
        });
        this.on('dragend', function (obj) {
            if (this.isAllowDragX) {
                this.el.css('left', obj.x + 'px');
            }
            if (this.isAllowDragY) {
                this.el.css('top', obj.y + 'px');
            }
        });
    }

    collision(el){
        if(el instanceof Drag) {
            return this.el.collision(el.el);
        }else if(Base.isDom(el)) {
            return this.el.collision(el);
        }
    }
    listenCollision(el, fn){
        var self = this;
        var state = Drag.COLLISION_STATE.LEAVE;
        this.on('dragmove', function () {
            if (self.collision(el)) {
                if (state == Drag.COLLISION_STATE.LEAVE) {
                    state = Drag.COLLISION_STATE.JOIN;
                    fn && fn(state);
                } else {
                    state = Drag.COLLISION_STATE.MOVE;
                    fn && fn(state);
                }
            } else {
                if (state == Drag.COLLISION_STATE.JOIN || state == Drag.COLLISION_STATE.MOVE) {
                    state = Drag.COLLISION_STATE.LEAVE;
                    fn && fn(state);
                }
            }
        })
    }
}

Drag.COLLISION_STATE = {
    LEAVE: 'leave',
    JOIN: 'join',
    MOVE: 'move'
}

module.exports = Drag;
