module.exports = function(app){

    console.log('activity requests loaded');

    app.get('/activity', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.post('/activity', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.put('/activity', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.delete('/activity', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });
};