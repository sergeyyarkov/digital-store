export function renderCategories(categories) {
    return categories.map(category => `<option value='{"id": "${category._id}", "title": "${category.title}", "img": "${category.img}", "type": "${category.type}", "format": "${category.format}"}' data-icon="../img/service-icons/${category.img}">${category.title[0].toUpperCase() + category.title.slice(1)}</option>`).join('');
}