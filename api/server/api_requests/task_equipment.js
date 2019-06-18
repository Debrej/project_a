module.exports = function(app, connection){

    console.log('task_equipment requests loaded');

    app.get('/task_equipment', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.post('/task_equipment', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.put('/task_equipment', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.delete('/task_equipment', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });
};