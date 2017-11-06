const Event = require('../base/event');

class Canvas extends Event {
    constructor(canvas) {
        super();
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
        this._ctx.save();
        this.render(this._ctx);
        this._ctx.restore();
    }
    cleanViewport() {
        this._ctx.clearRect(0, 0, this._canvas.clientWidth, this._canvas.clientHeight);
    }
    render() {

    }
    draw(fn) {
        this._ctx.save();
        fn && fn.call(this, this._ctx);
        this._ctx.restore();
    }
}

module.exports = Canvas;