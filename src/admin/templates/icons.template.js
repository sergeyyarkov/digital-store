export function renderIcons(icons) {
    return icons.map(icon => `<option value='${icon}' data-icon="../img/service-icons/${icon}">${icon}</option>`).join('');
}