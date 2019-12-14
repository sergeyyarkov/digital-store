export function renderCategories(categories) {
    let html = '';
    categories.forEach(category => {
        html += `<option value='{"id": "${category._id}", "title": "${category.title}", "img": "${category.img}", "type": "${category.type}", "format": "${category.format}"}' data-icon="../img/service-icons/${category.img}">${category.title[0].toUpperCase() + category.title.slice(1)}</option>`;
    });
    return html;
}