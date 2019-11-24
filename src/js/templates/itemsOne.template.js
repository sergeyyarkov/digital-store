export function renderItemsOne(category, items) {
    let html = '';

    html += `<div class="items-category">
                    <h2 class="small-title">${category}</h2>
                </div>`;

    items.forEach(item => {
        if (item) {
            html += `
                            <div class="items-list">
                            <div class="items-list__name">
                                <div class="list-icon">
                                    <img src="./img/service-icons/${item.image}" alt="#">
                                </div>
                                <div class="list-title">
                                    <a href="/product/${item._id}">${item.title}</a>
                                </div>
                            </div>
                            <div class="items-list__info">
                                <div class="list-date">
                                    <small>${item.date}</small>
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
                                <div class="list-buttons">
                                    <button class="btn-small waves-effect waves-light">Купить</button>
                                    <button data-id="${item._id}" data-title="${item.title}" data-date="${item.date}" data-count="${item.count}" data-price="${item.price}" id="addItem" class="btn-small waves-effect waves-light"><i
                                            class="material-icons">shopping_cart</i></button>
                                </div>
                            </div>
                        </div>
                    `
        } else {
            html += `
                        <div class="items-list">
                        <div class="items-list__name">
                            <div class="list-title">
                                <span>В этой категории пока что нету товаров</span>
                            </div>
                        </div>
                    </div>`;
        }
    });
    return html;
}