module.exports = function(app, connection){

    const sql_requests = require('./sql_requests/user.json');

    console.log('user requests loaded');


    /*
        Retrieve all users in the database, with all the fields
     */
    app.get('/user', function(req, res){

        // Logging the request
        console.log(req.method + ' ' + req.originalUrl);

        // SQL request
        connection.query(sql_requests.get_all_users, function(err, rows, fields){

            //if an error occurs, send status 1 with the error message
            if (err) {res.send({'status': 1, 'SQL_message': err});}

            //else, send status 0 with the results of the request
            else{
                res.send({'status': 0, 'user' : rows});
            }
        });
    });

    app.post('/user', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.put('/user', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.delete('/user', function(req, res){
        console.log(req.method + ' ' + req.originalUrl);
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });
};