module.exports = function(app, connection){

    console.log('equipment requests loaded');

    //region EQUIPMENT

    app.get('/equipment', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.post('/equipment', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.put('/equipment', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.delete('/equipment', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    //endregion

    //region EQUIPMENT TYPE

    app.get('/equipment_type', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.post('/equipment_type', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.put('/equipment_type', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.delete('/equipment_type', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    //endregion
};