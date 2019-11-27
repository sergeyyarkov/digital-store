import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderItemsOne } from "../templates/itemsCategory.template";
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

                const category = localStorage.getItem('category');
                breadcrumbActiveLink.call(this, category); // окрашиваем категорию по нажатию на breadcrumb
                showItems.call(this, category); // отображем айтемсы если был нажат breadcrumb
                localStorage.removeItem('category'); // очищаем ключ category чтобы данные не показывались всегда
            }
        }
    }
}

async function showItems(category) {
    const fData = await apiService.getItemsOne(category),
        html = renderItemsOne(category, fData);

    this.items.onHide(); 
    this.items.insertItems(html);   
}

async function buttonHandler(e) {
    e.preventDefault();
    if (e.target.dataset.category && e.target.dataset.category != 'all') { // Выполняем логику если нажали на кнопки кроме "Все товары"
        localStorage.removeItem('sortByAll'); // установка значения для компонента Filter

        this.filter.clearChecked();
        this.items.onShow();
        btnActiveLink(e);

        const category = e.target.dataset.category.toLowerCase(),
            fData = await apiService.getItemsOne(category),
            html = renderItemsOne(category, fData);

        this.items.onHide();
        this.items.insertItems(html);
    } else if (e.target.dataset.category === 'all') { // Выполняем логику если нажали на кнопку "Все товары"
        localStorage.setItem('sortByAll', 'true'); // установка значения для компонента Filter

        this.filter.clearChecked();
        this.items.onShow();
        btnActiveLink(e);
        
        const fData = await apiService.getItems(),
            categories = Object.keys(fData),
            html = renderItems(categories, fData);

        this.items.onHide();
        this.items.insertItems(html);
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