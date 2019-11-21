import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderItemsOne } from "../templates/itemsOne.template";
import { renderItems } from "../templates/items.template";

export class CategoryComponent extends Component {
    constructor(id, {items}, {filter}) {
        super(id);
        this.items = items;
        this.filter = filter;
    }

    init() {
        if (this.$el) {
            this.$el.addEventListener('click', buttonHandler.bind(this));

            if (localStorage.getItem('category')) {
                localStorage.removeItem('sortByAll', 'true'); // установка значения для компонента Filter

                const category = localStorage.getItem('category'),
                    bounded = breadcrumbActiveLink.bind(this);

                document.querySelector('#loader').classList.add('hide');
                bounded(category); // <- ф-я окраски li по нажатию на breadcrumb

                // отображем айтемсы если был нажат breadcrumb
                (async function(){
                    const fData = await apiService.getItemsOne(category),
                        html = renderItemsOne(category, fData);
                    document.querySelector('#roster').insertAdjacentHTML('afterbegin', html);  
                }())

                // очищаем ключ category чтобы данные не показывались всегда
                localStorage.removeItem('category');
            }
        }
    }
}

async function buttonHandler(e) {
    e.preventDefault();
    if (e.target.dataset.category && e.target.dataset.category != 'all') {
        localStorage.removeItem('sortByAll'); // установка значения для компонента Filter

        this.filter.clearChecked();
        this.items.onShow();
        btnActiveLink(e);

        const category = e.target.dataset.category.toLowerCase(),
            fData = await apiService.getItemsOne(category),
            html = renderItemsOne(category, fData);

        this.items.onHide();
        document.querySelector('#roster').insertAdjacentHTML('afterbegin', html);
    } else if (e.target.dataset.category === 'all') {
        localStorage.setItem('sortByAll', 'true'); // установка значения для компонента Filter

        this.filter.clearChecked();
        this.items.onShow();
        btnActiveLink(e);
        
        const fData = await apiService.getItems(),
            categories = Object.keys(fData),
            html = renderItems(categories, fData);

        this.items.onHide();
        document.querySelector('#roster').insertAdjacentHTML('afterbegin', html);
    }
}

// Окраска li по нажатию
function btnActiveLink(e) {
    Array.from(e.target.parentNode.parentNode.querySelectorAll('#catLi')).forEach(li => li.classList.remove('active'));
    e.target.classList.add('active');
    localStorage.setItem('currentCategory', e.target.dataset.category.toLowerCase());
}

// Окраска li по нажатию на breadcrumb
function breadcrumbActiveLink(category) {
    const links = this.$el.querySelectorAll('#catLi');
    Array.from(links).forEach(li => li.classList.remove('active'));
    Array.from(links).forEach(li => li.dataset.category.toLowerCase() === category ? li.classList.add('active') : false);
    Array.from(links).forEach(li => li.dataset.category.toLowerCase() === category ? localStorage.setItem('currentCategory', li.dataset.category.toLowerCase()) : false);
}