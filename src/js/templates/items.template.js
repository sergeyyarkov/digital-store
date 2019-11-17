export function renderItems(categories, items) {

    let html = '';

    categories.forEach(category => {
        html += `<div class="items-category">
                    <h2 class="small-title">${category}</h2>
                </div>`;
            items[category].forEach(item => {
                if (item) {
                    html += `
                        <div class="items-list">
                        <div class="items-list__name">
                            <div class="list-icon">
                                <img src="./img/service-icons/${item.image}" alt="#">
                            </div>
                            <div class="list-title">
                                <a href="/item/${item._id}">${item.title}</a>
                            </div>
                        </div>
                        <div class="items-list__info">
                            <div class="list-count">
                                <span>${item.count} шт.</span>
                            </div>
                            <div class="list-one">
                                <span>Цена за 1 шт.</span>
                            </div>
                            <div class="list-price">
                                <span>${item.price}</span>
                            </div>
                            <div class="list-buttons">
                                <button class="btn-small waves-effect waves-light">Купить</button>
                                <button class="btn-small waves-effect waves-light"><i
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
                    </div>
                `
                }
            });
    });

    return html;
}