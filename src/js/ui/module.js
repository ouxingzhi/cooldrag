const Base = require('../base/base');
const Dom = require('../base/dom');
const Component = require('../uibase/component');


/**
 * 模块类
 */

/*
接口定义
{
    id:123,
    component_id:123,
    label:'标题',
    explain:"balabala"
}
*/

class Module extends Component {
    constructor() {
        super({
            width: 200,
            height: 100,
            useResize: false
        });
        this.el.addClass('cool-ui-module');
    }
    contentRender() {
        return [
            '<div ref="moduleTitle" class="cool-module-title"></div>',
            '<div class="cool-module-inter cool-module-inter-in">',
            '<div class="inter-title">输入</div>',
            '<div ref="interIn" class="inter-box">',
            testCreateInterDom(),
            '</div>',
            '</div>',
            '<div class="cool-module-inter cool-module-inter-out">',
            '<div class="inter-title">输出</div>',
            '<div ref="interOut" class="inter-box">',
            testCreateInterDom(),
            '</div>',
            '</div>',
            '<div class="cool-module-inter cool-module-inter-event">',
            '<div class="inter-title">事件</div>',
            '<div ref="interEvent" class="inter-box">',
            testCreateInterDom(),
            '</div>',
            '</div>',
            '<div class="cool-module-inter cool-module-inter-action">',
            '<div class="inter-title">行为</div>',
            '<div ref="interAction" class="inter-box">',
            testCreateInterDom(),
            '</div>',
            '</div>'
        ].join('')
    }

    updateInter(obj) {
        var input = obj.input || [];
        var output = obj.output || [];
        var event = obj.event || [];
        var action = obj.action || [];
        var self = this;
        Base.each(input, function(item) {
            var el = Dom.$(createInterDom(item));
            self.$refs.interIn.append(el)
        });
        Base.each(output, function(item) {
            var el = Dom.$(createInterDom(item));
            self.$refs.interOut.append(el)
        });

        Base.each(event, function(item) {
            var el = Dom.$(createInterDom(item));
            self.$refs.interEvent.append(el)
        });

        Base.each(action, function(item) {
            var el = Dom.$(createInterDom(item));
            self.$refs.interAction.append(el)
        });
        this.reScanInterface();
    }
}

function createInterDom(obj) {
    return [
        '<div class="cool-module-interface-box">',
        '<div class="cool-module-interface-title">' + obj.label + '</div>',
        '<div interface="' + obj.id + '" class="cool-module-interface"></div>',
        '</div>'
    ].join('')
}

function testCreateInterDom() {
    return createInterDom({
        id: 1,
        label: '接口1'
    })
}

module.exports = Module;