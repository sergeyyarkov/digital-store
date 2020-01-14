export function renderBuyers(buyers) {
    let html = '';
    buyers.forEach(buyer => {
        html += `<tr><td>${buyer.email}</td><td>${buyer.method[0].toUpperCase() + buyer.method.slice(1)}</td><td>${new Date(buyer.date).toLocaleDateString()}</td><td>${buyer.amount} ₽</td></tr>`;
    });
    return html;
}