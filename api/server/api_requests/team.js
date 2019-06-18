module.exports = function(app, connection){

    console.log('team requests loaded');

    app.get('/team', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.post('/team', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.put('/team', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.delete('/team', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });
};