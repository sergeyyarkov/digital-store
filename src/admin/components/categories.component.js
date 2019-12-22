import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderCategories } from "../templates/categories.template";
import { renderIcons } from "../templates/icons.template";

export class CategoriesComponent extends Component {
    constructor(id) {
        super(id);
    }

    setElems() {
        // обозначим все селекты для рендера в них наши категории и иконки в дальнейшем
        this.$editSelect = this.$el.querySelector('#edit select');
        this.$dellSelect = this.$el.querySelector('#delete select');
        this.$iconsSelect = this.$el.querySelector('#icons select');
        this.$dellIconsSelect = this.$el.querySelector('#dellIcon select');

        // формы
        this.$dellIconFrom = this.$el.querySelector('#dellIcon'); // удаление иконки
        this.$addForm = this.$el.querySelector('#addCategory'); // добавление категории
        this.$dellForm = this.$el.querySelector('#dellCategory'); // удаление категории
        
        // добавим ивенты на наши формы
        this.$dellIconFrom.addEventListener('submit', this.dellIcon.bind(this));
        this.$addForm.addEventListener('submit', this.addCategory.bind(this));
        this.$dellForm.addEventListener('submit', this.deleteCategory.bind(this));
    }

    async init() {
        const categories = await apiService.getCategories(),
            icons = await apiService.getIcons(),
            icons_html = renderIcons(icons),
            categories_html = renderCategories(categories);

        this.$editSelect.insertAdjacentHTML('beforeend', categories_html);
        this.$dellSelect.insertAdjacentHTML('beforeend', categories_html);
        this.$iconsSelect.insertAdjacentHTML('beforeend', icons_html);
        this.$dellIconsSelect.insertAdjacentHTML('beforeend', icons_html);
        M.FormSelect.init(document.querySelectorAll('select')); // Инициализируем все селекты только после их рендера!
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

    async dellIcon(e) {
        e.preventDefault();
        const icons = await apiService.getIcons(),
            currIcon = e.target.elements[0].value,
            index = icons.indexOf(currIcon);

        index != -1 ? e.target.submit() : alert('Выберите иконку для удаления.');
    }
}