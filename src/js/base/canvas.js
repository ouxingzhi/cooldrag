
const Event = require('./event');
const Dom = require('./dom');

class Canvas extends Event{
    constructor(){
        super();
        this._el = Dom.$('<canvas></canvas>');
    }
    element(){
        return this._el;
    }
}

module.exports = Canvas;