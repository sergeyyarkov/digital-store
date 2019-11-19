import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderItems } from "../templates/items.template";

export class ItemsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    async init() {
        if (this.$el) {
            localStorage.setItem('sortByAll', 'true'); // установка значения для компонента Filter
            if (!localStorage.getItem('category')) {
            const roster = this.$el.querySelector('#roster');  // Список с товарами
            
            // Получаем все товары и вывоим их если нету ключа category в ls
               const fData = await apiService.getItems(),
                categories = Object.keys(fData);
            
                if (categories.length) {
                    const html = renderItems(categories, fData);
                    roster.insertAdjacentHTML('afterbegin', html);  
                } else {
                    roster.innerHTML = 'Товаров на сайте пока что нету';
                }

                // Убираем крутящийся лоадер
                this.loader.hide(); 
            } 
        } 
    }
    
    onHide() {
        this.$el.querySelector('#roster').innerHTML = '';
        this.loader.hide();
    }
    onShow() {
        this.$el.querySelector('#roster').innerHTML = '';
        this.loader.show();
    }
}