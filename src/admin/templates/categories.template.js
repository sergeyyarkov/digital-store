export function renderCategories(categories) {
    return categories.map(category => `<option value='${category._id}' data-icon="../img/service-icons/${category.img}">${category.title[0].toUpperCase() + category.title.slice(1)}</option>`).join('');
}