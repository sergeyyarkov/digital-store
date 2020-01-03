import { Component } from '../core/component';

export class ContentComponent extends Component {
    constructor(id) {
        super(id);
    }

    setElems() {
        this.$info = this.$el.querySelector('#info');
    }

    init() {
        M.textareaAutoResize(this.$info);
    }
}