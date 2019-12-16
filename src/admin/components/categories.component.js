import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderCategories } from "../templates/categories.template";
import { renderIcons } from "../templates/icons.template";

export class CategoriesComponent extends Component {
    constructor(id) {
        super(id);
        if (this.$el) {
            this.$editSelect = this.$el.querySelector('#edit select');
            this.$deleteSelect = this.$el.querySelector('#delete select');
            this.$iconsSelect = this.$el.querySelector('#img select');
            this.$dellIconsSelect = this.$el.querySelector('#imgDell select');

            this.$dellIconFrom = this.$el.querySelector('#iconDell');
            this.$addForm = this.$el.querySelector('#categoryAdd');
            this.$deleteForm = this.$el.querySelector('#categoryDelete');
            
            this.$dellIconFrom.addEventListener('submit', this.dellIcon.bind(this));
            this.$addForm.addEventListener('submit', this.addCategory.bind(this));
            this.$deleteForm.addEventListener('submit', this.deleteCategory.bind(this));
        }
    }

    async init() {
        const categories = await apiService.getCategories();
        const icons = await apiService.getIcons();
        const icons_html = renderIcons(icons);
        const html = renderCategories(categories);

        this.$editSelect.insertAdjacentHTML('beforeend', html);
        this.$deleteSelect.insertAdjacentHTML('beforeend', html);
        this.$iconsSelect.insertAdjacentHTML('beforeend', icons_html);
        this.$dellIconsSelect.insertAdjacentHTML('beforeend', icons_html);
        M.FormSelect.init(document.querySelectorAll('select')); // Инициализируем все селекты только после их рендера!
    }

    async addCategory(e) {
        e.preventDefault();
        const categories = await apiService.getCategories();
        const title = this.$addForm.elements[0].value.toLowerCase().trim();
        const index = categories.map((category) => {return category.title}).indexOf(title);
        index != -1 ? alert('Такая категория уже существует, придумайте другое название.') : this.$addForm.submit();
    }

    async deleteCategory(e) {
        e.preventDefault();
        const categories = await apiService.getCategories();
        const title = this.$deleteForm.elements[0].value.toLowerCase().trim();
        const index = categories.map((category) => {return category.title}).indexOf(title);
        index != -1 ? this.$deleteForm.submit() : alert('Выберите категорию для удаления.');
    }

    async dellIcon(e) {
        e.preventDefault();
        const icons = await apiService.getIcons();
        const currIcon = e.target.elements[0].value;
        const index = icons.indexOf(currIcon);
        index != -1 ? e.target.submit() : alert('Выберите иконку для удаления.');
    }
}