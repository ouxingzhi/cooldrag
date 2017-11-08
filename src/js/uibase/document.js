
const Dom = require('../base/dom');
const View = require('./view');
const DrawBase = require('../base/drawbase');

class Document extends View{
    constructor(root){
        super();
        super.el.addClass('cool-document');
        initEvent.call(this);
        this.modules = [];
    }
    appendTo(root){
        Dom.$(root).append(this.el);
    }
    render(){
        return '<div><div class="hit"></div></div>'
    }
    addModule(module){
        this.modules.push(module);
        this.el.append(module.el);
    }
}

function initEvent(){
    this.draw = new DrawBase({
        checkDown: function (e) {

        },
        onDragStart:function(){

        },
        onDragMove:function(){

        },
        onDragEnd:function(){
            
        }
    })
}

module.exports = Document;