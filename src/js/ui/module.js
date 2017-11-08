const Component = require('../uibase/component');


class Module extends Component {
    constructor() {
        super({
            width: 200,
            height: 100,
            useResize: false
        });
        this.incontent = '';
        this.outcontent = '';
        this.eventcontent = '';
        this.actioncontent = '';
    }
    contentRender() {
        return [
            '<div ref="moduleTitle" class="cool-module-title"></div>',
            '<div class="cool-module-inter cool-module-inter-in"></div>',
            '<div class="cool-module-inter cool-module-inter-out"></div>',
            '<div class="cool-module-inter cool-module-inter-event"></div>',
            '<div class="cool-module-inter cool-module-inter-action"></div>'
        ].join('')
    }
}

module.exports = Module;