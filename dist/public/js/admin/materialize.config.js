document.addEventListener('DOMContentLoaded', function () {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.Collapsible.init(document.querySelectorAll('.collapsible'));
    M.Modal.init(document.querySelectorAll('.modal'));

    //- active временно!!!!!
    const currentPage = document.querySelector('#editCollapse .collapsible-body ul').dataset.current;
    const pages = document.querySelectorAll('#editCollapse .collapsible-body ul li');
    pages.forEach(page => {
        if (currentPage === page.dataset.page) {
            page.classList.add('active');
            const list = M.Collapsible.getInstance(document.querySelector('#editCollapse'));
            list.open();
        }
    })
});
