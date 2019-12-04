export class Component {
    constructor(id) {
        this.$el = document.getElementById(id);
        this.init();
    }

    init() {}

    onShow() {}

    onHide() {}

    hide() {
        this.$el ? this.$el.classList.add('hide') : false
    }
    
    show() {
        this.$el ? this.$el.classList.remove('hide') : false
    }
}