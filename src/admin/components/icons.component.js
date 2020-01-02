import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderIcons } from "../templates/icons.template";

export class IconsComponent extends Component {
    constructor(id) {
        super(id);
    }

    setElems() {
        this.$icons = this.$el.querySelector('#selectIcons');
        this.$delete = this.$el.querySelector('#dellIcon');
        this.$delete.addEventListener('submit', this.dellIcon.bind(this));
    }

    async init() {
        const icons = await apiService.getIcons();
        this.$icons.insertAdjacentHTML('beforeend', renderIcons(icons));
        M.FormSelect.init(this.$icons);
    }

    async dellIcon(e) {
        e.preventDefault();
        const icons = await apiService.getIcons(),
            currIcon = e.target.elements[0].value,
            index = icons.indexOf(currIcon);

        index != -1 ? e.target.submit() : alert('Выберите иконку для удаления.');
    }
}