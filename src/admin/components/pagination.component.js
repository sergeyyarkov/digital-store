import { Component } from "../core/component";

export class PaginationComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }
    
    /**
     * 
     * @param {number} length - кол-во товаров в магазине
     * @param {object} body - куда вставляем данные о первой странице
     * @param {function} request - функция async запроса
     */

    initialize(length, body, request) {
        // рендерим кнопку с первой страницой как независимую от других кнопок
        this.$el.insertAdjacentHTML('afterbegin', '<li><a href="#" data-move="1">1</a></li><li><span style="position: relative;top: 4px;padding: 4px;">...</span></li>');
        
        // рендерим сами кнопки и кнопки вперед - назад
        this.renderBtns(length);
        this.renderArrows();

        // показ первой страницы
        this.move(1, body, request);

        // назначаем ивент на кнопки
        this.$el.onclick = (e) => this.buttonHandler(e, body, request);
    }

    // страницу назад - вперед
    renderArrows() {
        const leftArrowHTML = '<li><a class="disabled" href="#" data-type="prev"><i class="material-icons">chevron_left</i></a></li>',
            rightArrowHTML = '<li><a class="disabled" href="#" data-type="next"><i class="material-icons">chevron_right</i></a></li>';

        this.$el.insertAdjacentHTML('afterbegin', leftArrowHTML);
        this.$el.insertAdjacentHTML('beforeend', rightArrowHTML); 
    }

    renderBtns(length) {
        let count = Math.ceil(length / 5),
            btnsHTML = '';

        // проверяем - если товаров > 21, рендерим максимум до пяти кнопок
        length > 21 ? count = 5 : count;

        this.count = Math.ceil(length / 5);
        for (let i = 2; i <= count; i++) {
            btnsHTML += `<li><a href="#" data-move="${i}">${i}</a></li>`;
        }

        this.$el.insertAdjacentHTML('beforeend', btnsHTML);
    }

    async move(page, body, request) {
        this.loader.show();
        const $btns = Array.from(this.$el.querySelectorAll('li a'));

        if (page === +$btns[$btns.length - 2].dataset.move && page < this.count) {
            const numbers = $btns.filter(btn => btn.dataset.move);
            
            for (let i = 1; i < numbers.length; i++) {
                let newIndex = numbers[i].textContent;
                ++newIndex;
                numbers[i].setAttribute('data-move', newIndex);
                numbers[i].textContent = newIndex;
            }
        }

        if (page === +$btns[2].dataset.move && page > 2) {
            const numbers = $btns.filter(btn => btn.dataset.move);
            
            for (let i = 1; i < numbers.length; i++) {
                let newIndex = numbers[i].textContent;
                --newIndex;
                numbers[i].setAttribute('data-move', newIndex);
                numbers[i].textContent = newIndex;
            }
        }

        if (page <= this.count) {
            // красим кнопки
            const numbers = $btns.filter(btn => btn.dataset.move);
                numbers.forEach(btn => btn.parentNode.classList.remove('active'));
                numbers.forEach(btn => {
                if (page === +btn.dataset.move) {
                    btn.parentNode.classList.add('active');
                }
            });
          const response = await request(page);
            body.innerHTML = '';
            if (response != '') {
                this.$el.setAttribute('data-page', page);
                body.insertAdjacentHTML('afterbegin', response);
            } else body.innerHTML = 'Данных нету.';
        }
        this.loader.hide();  
    }

    buttonHandler(e, body, request) {
        e.preventDefault();
        if (e.target.dataset.move) {
            const page = parseInt(e.target.dataset.move),
                target = e.target.parentNode;

            this.move(page, body, request);
        } else if (e.target.tagName.toLowerCase() === 'i') {
            const type = e.target.parentNode.dataset.type,
                page = parseInt(this.$el.dataset.page);

            switch (type) {
                case 'next':
                    this.next(page, body, request);
                    break;
                case 'prev':
                    this.prev(page, body, request);
                default:
                    break;
            }
        }
    }

    next(page, body, request) {
        this.move(++page, body, request);
    }

    prev(page, body, request) {
        --page;
        if (page < 1) {
            return 0;
        } else {
            this.move(page, body, request); 
        }
    }
}