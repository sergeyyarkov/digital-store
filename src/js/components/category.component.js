import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderItemsOne } from "../templates/itemsOne.template";
import { renderItems } from "../templates/items.template";

export class CategoryComponent extends Component {
    constructor(id, {items}) {
        super(id);
        this.items = items;
    }

    init() {
        if (this.$el) {
            this.$el.addEventListener('click', buttonHandler.bind(this));

            if (localStorage.getItem('category')) {
                const category = localStorage.getItem('category');
                const bounded = breadcrumbActiveLink.bind(this);
                document.querySelector('#loader').classList.add('hide');
                bounded(category);
                // отображем данные если был нажат breadcrumb
                (async function(){
                    const fData = await apiService.getItemsOne(category);
                    const html = renderItemsOne(category, fData);
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
        this.items.onShow();
        btnActiveLink(e);

        const category = e.target.dataset.category.toLowerCase();
        const fData = await apiService.getItemsOne(category);
        const html = renderItemsOne(category, fData);

        this.items.onHide();
        document.querySelector('#roster').insertAdjacentHTML('afterbegin', html);
    } else if (e.target.dataset.category === 'all') {
        this.items.onShow();
        btnActiveLink(e);
        const fData = await apiService.getItems(),
                categories = Object.keys(fData);

        const html = renderItems(categories, fData);
        this.items.onHide();
        document.querySelector('#roster').insertAdjacentHTML('afterbegin', html);
    }
}

function btnActiveLink(e) {
    Array.from(e.target.parentNode.parentNode.querySelectorAll('li a')).forEach(li => li.classList.remove('active'));
    e.target.classList.add('active');
}

function breadcrumbActiveLink(category) {
    const links = this.$el.querySelectorAll('.category-items ul li a');
    Array.from(links).forEach(li => li.classList.remove('active'));
    Array.from(links).forEach(li => {
        if (li.dataset.category.toLowerCase() === category) {
            li.classList.add('active');
        }
    });
}