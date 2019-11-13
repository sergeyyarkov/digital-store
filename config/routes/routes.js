const routes = {
    // Index
    indexRoute: function(req, res) {
        res.render('index');
    }, 

    // How-to-buy
    howToBuyRoute: function(req, res) {
        res.render('how-to-buy');
    },

    // Contacts
    contactsRoute: function(req, res) {
        res.render('contacts');
    },

    // Comments
    commentsRoute: function(req, res) {
        res.render('comments');
    },
    
    // My-orders
    myOrdersRoute: function(req, res) {
        res.render('my-orders');
    }
}

module.exports = function(server) {
    server.get('/', routes.indexRoute);
    server.get('/how-to-buy', routes.howToBuyRoute);
    server.get('/contacts', routes.contactsRoute);
    server.get('/comments', routes.commentsRoute);
    server.get('/my-orders', routes.myOrdersRoute)
}