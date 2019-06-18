module.exports = function(app, connection){

    console.log('location requests loaded');

    app.get('/location', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.post('/location', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.put('/location', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.delete('/location', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });
};