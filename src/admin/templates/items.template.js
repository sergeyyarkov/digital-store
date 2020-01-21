export function renderItems(items, categories, info) {
    if (!items.error) {
        return categories.map(category => {
            return items.map((item, i) => {
                if (item.category.toLowerCase() === category.title.toLowerCase()) {
                    return `<tr data-info='{"id": "${item._id}", "title": "${item.title}", "category": "${item.category}", "price": "${item.price}", "description": "${item.description}", "data": "${info[i].data}"}'><td><img src="../img/service-icons/${category.img}" alt="alt"></td><td>${item.title}</td><td>${item.category[0].toUpperCase() + item.category.slice(1)}</td><td>${new Date(item.date).toLocaleDateString()}</td><td>${item.count}</td><td>${item.price} ₽</td><td><button id="deleteItem" class="btn red">Удалить</button><button id="editItem" class="btn orange">Изменить</button></td></tr>`;
                }
            }).join('');
        }).join('');  
    } else {
        return 'Данных нету.';
    }
}