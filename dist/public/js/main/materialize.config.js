document.addEventListener('DOMContentLoaded', function () {
    // Nav-mobile menu init
    M.Sidenav.init(document.querySelectorAll('.sidenav'))
    M.FormSelect.init(document.querySelectorAll('select'))
    M.updateTextFields();
});