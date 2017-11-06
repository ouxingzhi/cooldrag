const Dom = require('../base/dom');
const View = require('../ui/view');
const Drag = require('../base/drag');
const LineCanvas = require('../canvas/line');

class Line extends View {
    constructor(ops) {
        super();
        this.el.addClass('cool-ui-line');
        this.drag = new Drag(this.el);
        this.lineCanvas = new LineCanvas(this.refs.canvas);

        this.startPoint = { x: 0, y: 0 };
        this.endPoint = { x: 0, y: 20 };

        setOption.call(this, ops);
        initEvent.call(this);
    }
    render() {
        return [
            '<canvas ref="canvas" class="cool-canvas"></canvas>',
            '<div ref="ctrlLineStart" class="cool-control cool-ui-line-start"></div>',
            '<div ref="ctrlLineEnd" class="cool-control cool-ui-line-end"></div>'
        ].join('')
    }
    to(a, b) {

        var w = Math.abs(a.x - b.x);
        var h = Math.abs(a.y - b.y);

        var x = Math.min(a.x, b.x);
        var y = Math.min(a.y, b.y);

        console.log(x, y)

        this.el.css({
            'left': x + 'px',
            'top': y + 'px',
            'width': w + 'px',
            'height': h + 'px'
        });
        this.$refs.canvas.attr('width', w);
        this.$refs.canvas.attr('height', h);

        var startX = a.x - x;
        var startY = a.y - y;
        var endX = b.x - x;
        var endY = b.y - y;
        this.$refs.ctrlLineStart.css({
            left: (startX - (this.$refs.ctrlLineStart.width() / 2)) + 'px',
            top: (startY - (this.$refs.ctrlLineStart.height() / 2)) + 'px'
        });
        this.$refs.ctrlLineEnd.css({
            left: (endX - (this.$refs.ctrlLineEnd.width() / 2)) + 'px',
            top: (endY - (this.$refs.ctrlLineEnd.height() / 2)) + 'px'
        });

        this.startPoint = {
            x: startX,
            y: startY
        };
        this.endPoint = {
            x: endX,
            y: endY
        }
        this.lineCanvas.to(this.startPoint, this.endPoint);
    }
}

function setOption(ops) {
    ops = ops || {};
    if (ops.startPoint) {
        this.startPoint = startPoint;
    }
    if (ops.endPoint) {
        this.endPoint = endPoint;
    }
}


function initEvent() {
    var self = this;

    var ctrl;
    var rePoint;

    this.drag.on('dragstart', function(obj) {
        var event = obj.event;
        var target = event.target;
        ctrl = '';
        if (self.$refs.ctrlLineStart.isConainer(target)) {
            this.stop();
            rePoint = self.$refs.ctrlLineEnd.posByPage();
            ctrl = 'lineStart';
        }
        if (self.$refs.ctrlLineEnd.isConainer(target)) {
            this.stop();
            rePoint = self.$refs.ctrlLineStart.posByPage();
            ctrl = 'lineEnd';
        }

    });
    this.drag.on('dragmove', function(obj) {
        function lineStart() {

            self.to({
                x: obj.mouseX,
                y: obj.mouseY
            }, {
                x: rePoint.left,
                y: rePoint.top
            });
        }

        function lineEnd() {
            self.to({
                x: rePoint.left,
                y: rePoint.top
            }, {
                x: obj.mouseX,
                y: obj.mouseY
            });
        }
        switch (ctrl) {
            case 'lineStart':
                lineStart();
                break;
            case 'lineEnd':
                lineEnd();
                break;
        }
    });
    this.drag.on('dragend', function() {
        this.start();
    });

    this.on('appendToAfter', function() {

        this.to(this.startPoint, this.endPoint);
    })
}

module.exports = Line;