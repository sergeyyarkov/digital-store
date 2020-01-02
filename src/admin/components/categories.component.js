import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderCategories } from "../templates/categories.template";
import { renderIcons } from "../templates/icons.template";

export class CategoriesComponent extends Component {
    constructor(id) {
        super(id);
    }

    setElems() {
        // селекты в которых рендерится контент
        this.$editSelect = this.$el.querySelector('#editCategory_select'); // редактирование категории
        this.$dellSelect = this.$el.querySelector('#deleteCategory_select'); // удаление категории
        this.$iconsSelect = this.$el.querySelector('#icons_select'); // выбор иконки

        // обработка форм
        this.$addForm = this.$el.querySelector('#addCategory');
        this.$dellForm = this.$el.querySelector('#deleteCategory');
        
        // добавим ивенты на наши формы
        this.$addForm.addEventListener('submit', this.addCategory.bind(this));
        this.$dellForm.addEventListener('submit', this.deleteCategory.bind(this));
    }

    async init() {
        const categories = await apiService.getCategories(),
            icons = await apiService.getIcons();

        this.$editSelect.insertAdjacentHTML('beforeend', renderCategories(categories));
        this.$dellSelect.insertAdjacentHTML('beforeend', renderCategories(categories));
        this.$iconsSelect.insertAdjacentHTML('beforeend', renderIcons(icons));
        M.FormSelect.init(document.querySelectorAll('select'));
    }

    async addCategory(e) {
        e.preventDefault();
        const categories = await apiService.getCategories(),
            title = this.$addForm.elements[0].value.toLowerCase().trim(),
            index = categories.map((category) => {return category.title}).indexOf(title);

        index != -1 ? alert('Такая категория уже существует, придумайте другое название.') : this.$addForm.submit();
    }

    async deleteCategory(e) {
        e.preventDefault();
        const categories = await apiService.getCategories(),
            title = this.$dellForm.elements[0].value.toLowerCase().trim(),
            index = categories.map((category) => {return category.title}).indexOf(title);

        index != -1 ? this.$dellForm.submit() : alert('Выберите категорию для удаления.');
    }
}