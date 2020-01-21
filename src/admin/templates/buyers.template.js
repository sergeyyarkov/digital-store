export function renderBuyers(buyers) {
    let html = '';
    buyers.forEach(buyer => {
        html += `<tr data-info='{"bill_id": "${buyer.bill_id}", "email": "${buyer.email}", "method": "${buyer.method[0].toUpperCase() + buyer.method.slice(1)}", "date": "${new Date(buyer.date).toLocaleDateString()}", "amount": "${buyer.amount}", "data": "${buyer.data}"}'><td>${buyer.email}</td><td>${buyer.method[0].toUpperCase() + buyer.method.slice(1)}</td><td>${new Date(buyer.date).toLocaleDateString()}</td><td>${buyer.amount} ₽</td><td><button id="billDataOpen" class="btn orange">Данные аккаунтов</button></td></tr>`;
    });
    return html;
}