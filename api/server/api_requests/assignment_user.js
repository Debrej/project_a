module.exports = function(app, sequelize, models){

    console.log('assignment_user requests loaded');

    let Availability = models.Availability;

    app.get('/assignment_user/availability/:availability_id', function(req, res){
        Availability.findByPk(req.params.availability_id)
            .then(availability => {
                availability.getTasks()
                    .then(tasks => {
                        res.send({'tasks': tasks});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({'error': err});
            });
    });

    app.post('/assignment_user/:availability_id', function(req, res){
        Availability.findByPk(req.params.availability_id)
            .then(availability => {
                availability.addTasks(req.body.tasks)
                    .then(tasks => {
                        res.send({'tasks': tasks});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({'error': err});
            });
    });

    app.put('/assignment_user', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });

    app.delete('/assignment_user', function(req, res){
        res.send({'method': req.method, 'originalUrl': req.originalUrl, 'baseUrl': req.baseUrl});
    });
};