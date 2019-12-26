import { Modal } from "../core/modal";
import { apiService } from "../services/api.service";
import { renderIcons } from "../templates/icons.template";

export class editCategoryModal extends Modal {
    constructor(id, open, close) {
        super(id, open, close);
    }

    // перепишем метод для перевода ивента open в событие onchange
    init() {
        if (this.open) {
            this.open.addEventListener('change', this.show.bind(this));
            this.close.addEventListener('click', this.hide.bind(this));
            this.$el.querySelector('form').addEventListener('submit', this.updateCategory.bind(this));  
        }
    }
    
    async openHandler(e) {
        const data = JSON.parse(e.target.value);
        this.$el.querySelector('form .id input').value = data.id;
        this.$el.querySelector('form .originalTitle input').value = data.title[0].toUpperCase() + data.title.slice(1);
        this.$el.querySelector('form .title input').value = data.title[0].toUpperCase() + data.title.slice(1);
        this.$el.querySelector('form .type textarea').value = data.type;
        this.$el.querySelector('form .format input').value = data.format;

        const icons = await apiService.getIcons();
        const icons_html = renderIcons(icons);
        this.$el.querySelector('form .img select').insertAdjacentHTML('beforeend', icons_html);
        M.FormSelect.init(this.$el.querySelector('form .img select'));
        M.updateTextFields();
    }

    async updateCategory(e) {
        e.preventDefault();
        const form = this.$el.querySelector('form');
        const categories = await apiService.getCategories();
        const id = form.elements[0].value.toLowerCase().trim();
        const index = categories.map((category) => {return category._id}).indexOf(id);
        index != -1 ? form.submit() : alert('Категории с таким ID не существует.'); 
    }
}