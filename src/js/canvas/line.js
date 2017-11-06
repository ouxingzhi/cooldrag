const Canvas = require('../common/canvas');

class Line extends Canvas {
    constructor() {
        super(...arguments);
    }
    to(start, end) {
        this.draw(function(ctx) {
            this.cleanViewport();
            ctx.strokeStyle = '#333';
            ctx.moveTo(start.x, start.y);

            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        });
    }
}

module.exports = Line;