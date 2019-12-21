export function renderItems(categories, items) {
    let html = '';
    try {
        categories.forEach(category => {
            html += `<div class="items-category">
                        <h2 class="small-title">${category.title}</h2>
                    </div>`;
            category.itemsInCategory = 0; // счетчит для отслеживания категорий где нету айтемов
            try {
                items.forEach(item => {
                    if (item.category.toLowerCase() === category.title.toLowerCase()) {
                        category.itemsInCategory += 1;
                        html += `
                    <div class="items-list">
                            <div  class="items-list__name">
                                <div class="list-icon">
                                    <img src="./img/service-icons/${category.img}" alt="#">
                                </div>
                                <div class="list-title">
                                    <a href="/product/${item._id}">${item.title}</a>
                                </div>
                            </div>
                            <div class="items-list__info">
                                <div class="list-date">
                                        <small>${diffDates(new Date(), new Date(item.date))}</small>
                                    </div>
                                <div class="list-count">
                                    <span>${item.count} шт.</span>
                                </div>
                                <div class="list-one">
                                    <span>Цена за 1 шт.</span>
                                </div>
                                <div class="list-price">
                                    <span>${item.price.toFixed(2)}₽</span>
                                </div>
                                <div id="rosterButtons" data-id="${item._id}" data-title="${item.title}" data-count="${item.count}" data-price="${item.price} class="list-buttons">
                                    <button id="payOpen" class="btn-small waves-effect waves-light">Купить</button>
                                    <button id="addItem" class="btn-small waves-effect waves-light"><i
                                            class="material-icons">shopping_cart</i></button>
                                </div>
                            </div>
                        </div>`;
                    }
                })
                category.itemsInCategory === 0 
                    ? html += '<div class="items-list"><span>В этой категории товаров пока что нету.</span></div>'
                    : false;
            } catch {
                html += '<div class="items-list"><span>В этой категории товаров пока что нету.</span></div>';
            }
        });
    } catch {
        html += '<div class="items-list"><span>Добавьте хотя бы одну категорию.</span></div>';
    }
    return html;
}

function diffDates(firstDate, secondDate) {
    let diff = Math.floor((firstDate - secondDate) / (60 * 60 * 24 * 1000));
    if (diff <= 0) {
        return 'добавлено сегодня';
    }
    return diff + ' дней назад';
}