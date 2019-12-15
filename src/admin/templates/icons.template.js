export function renderIcons(icons) {
    let html = '';
    icons.forEach(icon => {
        html += `<option value='${icon}' data-icon="../img/service-icons/${icon}">${icon}</option>`;
    });
    return html;
}