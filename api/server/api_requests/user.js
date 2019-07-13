module.exports = function(app, sequelize){

    console.log('user requests loaded');

    /*
        Retrieve all users in the database, with all the fields
     */
    app.get('/user', function(req, res){

    });

    app.post('/user', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.put('/user', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.delete('/user', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });
};