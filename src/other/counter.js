export function insertCount(id, array) {
    const counter = document.getElementById(id);
    counter.innerHTML = array.length;
}