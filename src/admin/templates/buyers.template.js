export function renderBuyers(buyers) {
    if (!buyers.error) {
        return buyers.map(buyer => `<tr data-id="${buyer.bill_id}"><td>${buyer.email}</td><td>${buyer.method[0].toUpperCase() + buyer.method.slice(1)}</td><td>${new Date(buyer.date).toLocaleDateString()}</td><td>${buyer.amount} ₽</td><td><button id="billDataOpen" class="btn orange">Данные аккаунтов</button></td></tr>`).join('');   
    } else {
        return 'Покупателей в магазине пока что нету';
    }
}