import { Component } from "../core/component";

export class PaginationComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    // вставляем кнопки со страницами и назначаем ивент
    initialize(pages, insertTo, request) {
        this.insertButtons(pages);
        this.$pages = Array.from(this.$el.querySelectorAll('li'));
        this.$el.onclick = (e) => this.buttonHandler(e, insertTo, request);
        this.moveTo(1, insertTo, request); // показываем первую страницу
        this.$el.querySelector('li').nextElementSibling.classList.add('active'); 
    }

    removeActive() {
        this.$pages.forEach(li => li.classList.remove('active'));
    }

    setActive(li, value) {
        li.forEach(li => {const page = parseInt(li.querySelector('a').dataset.move);page === value ? li.classList.add('active') : false;});
    }

    buttonHandler(e, insertTo, request) {
        e.preventDefault();
        if (e.target.dataset.move) {
            const page = parseInt(e.target.dataset.move),
                target = e.target.parentNode;

            this.removeActive();
            target.classList.add('active');
            this.moveTo(page, insertTo, request);
        } else if (e.target.tagName.toLowerCase() === 'i') {
            const moveType = e.target.parentNode.dataset.type,
                page = parseInt(this.$el.dataset.page);

            moveType === 'prev' ? this.movePrev(page, this.$pages, insertTo, request) : this.moveNext(page, this.$pages, insertTo, request);
        }
    }

    movePrev(page, li, insertTo, request) {
        if (page === 1) return 0; else {
            --page;
            this.removeActive();
            this.setActive(li, page);
            this.moveTo(page, insertTo, request);
        }
    }

    // выполняем запрос на сервер и выводим на данные
    async moveTo(page, insertTo, request) {
        try {
            this.$el.setAttribute('data-page', page);
            insertTo.innerHTML = '';
            this.loader.show();
            insertTo.insertAdjacentHTML('afterbegin', await request(page));
            this.loader.hide();
        } catch (error) {
            this.loader.hide();
            this.$el.classList.add('hide');
            insertTo.parentNode.innerHTML = '<h1>Товаров или категорий в магазине нету.</h1>'; 
        }
    }

    moveNext(page, li, insertTo, request) {
        const length = this.$pages.length - 2;
        if (page === length) return 0; else {
            ++page;
            this.removeActive();
            this.setActive(li, page);
            this.moveTo(page, insertTo, request); 
        }
    }

    insertButtons(pages) {
        const count = Math.ceil(pages / 5);
        let html = '';

        // назад
        html += '<li><a class="disabled" href="#" data-type="prev"><i class="material-icons">chevron_left</i></a></li>';
        
        // все страницы
        for (let i = 1; i <= count; i++) {
            html += `<li><a href="#" data-move="${i}">${i}</a></li>`;
        }

        // вперед
        html += '<li><a class="disabled" href="#" data-type="next"><i class="material-icons">chevron_right</i></a></li>';
        this.$el.insertAdjacentHTML('afterbegin', html);
    }

    hide() {
        this.$el.classList.add('hide');
    }
}