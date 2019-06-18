module.exports = function(app, connection){

    console.log('assignment_equipment requests loaded');

    app.get('/assignment_equipment', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.post('/assignment_equipment', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.put('/assignment_equipment', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.delete('/assignment_equipment', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });
};