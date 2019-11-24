export function defaultBtnColor(id, context) {
    if (context.querySelector(`#roster #addItem[data-id="${id}"]`)) {
        context.querySelector(`#roster #addItem[data-id="${id}"]`).classList.remove('orange');
        context.querySelector(`#roster #addItem[data-id="${id}"] i`).innerHTML = 'shopping_cart'; 
    }
}