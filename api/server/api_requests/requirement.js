module.exports = function(app, connection){

    console.log('requirement requests loaded');

    app.get('/requirement', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.post('/requirement', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.put('/requirement', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.delete('/requirement', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });
};