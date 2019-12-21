export class Component {
    constructor(id) {
        this.$el = document.getElementById(id);
        this.$el ? this.setElems() : false;
        this.$el ? this.init() : false;
    }

    init() {}

    setElems() {}

    onShow() {}

    onHide() {}

    hide() {
        this.$el ? this.$el.classList.add('hide') : false
    }
    
    show() {
        this.$el ? this.$el.classList.remove('hide') : false
    }
}