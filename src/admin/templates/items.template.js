export function renderItems(items, categories) {
    let html = '';

    categories.forEach(category => {
        items.forEach(item => {
            if (item.category.toLowerCase() === category.title.toLowerCase()) html += `<tr data-info='{"id": "${item._id}", "title": "${item.title}", "category": "${item.category}", "price": "${item.price}", "description": "${item.description}"}'><td><img src="../img/service-icons/${category.img}" alt="alt"></td><td>${item.title}</td><td>${item.category}</td><td>${new Date(item.date).toLocaleDateString()}</td><td>${item.count}</td><td>${item.price} ₽</td><td><button class="btn red">Удалить</button><button id="editItem" class="btn orange">Изменить</button></td></tr>`
        });
    });
    return html;
}