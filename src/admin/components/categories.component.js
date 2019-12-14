import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderCategories } from "../templates/categories.template";

export class CategoriesComponent extends Component {
    constructor(id) {
        super(id);
        if (this.$el) {
            this.$editSelect = this.$el.querySelector('#edit select');
            this.$deleteSelect = this.$el.querySelector('#delete select');
            this.$addForm = this.$el.querySelector('#categoryAdd');
            this.$deleteForm = this.$el.querySelector('#categoryDelete');
            
            this.$addForm.addEventListener('submit', this.addCategory.bind(this));
            this.$deleteForm.addEventListener('submit', this.deleteCategory.bind(this));
            this.$editSelect.addEventListener('change', this.insertData);
        }
    }

    async init() {
        const categories = await apiService.getCategories();
        const html = renderCategories(categories);

        this.$editSelect.insertAdjacentHTML('beforeend', html);
        this.$deleteSelect.insertAdjacentHTML('beforeend', html);
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
        index != -1 ? this.$deleteForm.submit() : alert('Выберите категорию.');
    }
}