const M = require('materialize-css');
export class MaterializeConfig {
    constructor() {
        document.addEventListener('DOMContentLoaded', function () {
            M.Sidenav.init(document.querySelectorAll('.sidenav'))
            M.FormSelect.init(document.querySelectorAll('select'))
        });
    }
}