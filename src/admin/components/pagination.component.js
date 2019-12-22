import { Component } from "../core/component";
import { apiService } from "../services/api.service";

export class PaginationComponent extends Component {
    constructor(id, {items}) {
        super(id);
        this.limit = 5;
        this.items = items;
    }

    async init() {
        await this.insertPages();
        this.$pages = this.$el.querySelectorAll('li');
        this.$el.addEventListener('click', this.buttonHandler.bind(this));
        this.$el.querySelector('li').nextElementSibling.classList.add('active');
    }

    buttonHandler(e) {
        e.preventDefault();
        if (e.target.dataset.move) {
            const value = parseInt(e.target.dataset.move),
                target = e.target.parentNode;

            this.removeActive();
            target.classList.add('active');
            this.moveTo(value);
        } else if (e.target.tagName.toLowerCase() === 'i') {
            const moveType = e.target.parentNode.dataset.type,
                value = parseInt(this.$el.dataset.page);

            moveType === 'prev' ? this.movePrev(value, this.$pages) : this.moveNext(value, this.$pages);
        }
    }

    updatePage(value) {
        this.$el.setAttribute('data-page', value); 
    }

    removeActive() {
        this.$pages.forEach(li => li.classList.remove('active'));
    }

    setActive(li, value) {
        li.forEach(li => {const page = parseInt(li.querySelector('a').dataset.move);page === value ? li.classList.add('active') : false;});
    }

    movePrev(value, li) {
        if (value === 1) {
            return 0;
        } else {
            --value;
            this.removeActive();
            this.setActive(li, value);
            this.updatePage(value);
            this.items.onShow();
            this.items.insertItems(value, this.limit);
            this.items.onHide();
        }
    }

    moveTo(value) {
        this.updatePage(value);
        this.items.onShow();
        this.items.insertItems(value, this.limit);
        this.items.onHide();
    }

    moveNext(value, li) {
        const length = this.$pages.length - 2;
        if (value === length) {
            return 0;
        } else {
            ++value;
            this.removeActive();
            this.setActive(li, value);
            this.updatePage(value);
            this.items.onShow();
            this.items.insertItems(value, this.limit);
            this.items.onHide();   
        }
    }

    async insertPages() {
        const pages = await apiService.getItems(),
            count = pages.length / this.limit;
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
}