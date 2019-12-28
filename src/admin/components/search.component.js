import { Component } from "../core/component";

export class SearchComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    initialize(insertTo, request) {
        this.$el.onchange = (e) => {
            this.search(e, insertTo, request);
        }
    }

    async search(e, insertTo, request) {
        try {
            insertTo.innerHTML = '';
            this.loader.show();
            const query = e.target.value.trim(),
                items = await request(query);

            items != '' ? insertTo.insertAdjacentHTML('afterbegin', items) : insertTo.innerHTML = `По запросу "${query}" ничего не найдено...`;
            e.target.value = '';
            this.loader.hide();
        } catch (error) {
            console.error('Произошла ошибка.');
        }
    }
}