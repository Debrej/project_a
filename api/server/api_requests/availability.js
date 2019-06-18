module.exports = function(app, connection){

    console.log('availability requests loaded');

    app.get('/availability', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.post('/availability', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.put('/availability', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.delete('/availability', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });
};