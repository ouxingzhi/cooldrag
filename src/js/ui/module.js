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
    }
    contentRender() {
        return [
            '<div ref="moduleTitle" class="cool-module-title"></div>',
            '<div ref="interIn" class="cool-module-inter cool-module-inter-in"></div>',
            '<div ref="interOut" class="cool-module-inter cool-module-inter-out"></div>',
            '<div ref="interEvent" class="cool-module-inter cool-module-inter-event"></div>',
            '<div ref="interAction" class="cool-module-inter cool-module-inter-action"></div>'
        ].join('')
    }

    updateInter(obj){
        var input = obj.input || [];
        var output = obj.output || [];
        var event = obj.event || [];
        var action = obj.action || [];
        var self = this;
        Base.each(input,function(item){
            var el = Dom.$('<div interface="'+item.id+'" class="cool-module-interface"></div>');
            self.$refs.interIn.append(el)
        });
        Base.each(output, function (item) {
            var el = Dom.$('<div interface="' + item.id + '" class="cool-module-interface"></div>');
            self.$refs.interOut.append(el)
        });

        Base.each(event, function (item) {
            var el = Dom.$('<div interface="' + item.id + '" class="cool-module-interface"></div>');
            self.$refs.interEvent.append(el)
        });

        Base.each(action, function (item) {
            var el = Dom.$('<div interface="' + item.id + '" class="cool-module-interface"></div>');
            self.$refs.interAction.append(el)
        });
    }
}

module.exports = Module;