module.exports = function(app, sequelize, models){

    let Activity = models.Activity;

    console.log('activity_location requests loaded');

    app.get('/activity_location/:id_activity', function(req, res){
        Activity.findByPk(req.params.id_activity)
            .then(activity => {
                activity.getLocations()
                    .then(ret => {
                        res.send({'locations': ret});
                    })
                    .catch(err => {
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });

    app.post('/activity_location/:id_activity', function(req, res){
        Activity.findByPk(req.params.id_activity)
            .then(activity => {
                activity.addLocations(req.body.location_ids)
                    .then(ret => {
                        res.send({'locations': ret});
                    })
                    .catch(err => {
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });

    app.put('/activity_location/:id_activity', function(req, res){
        Activity.findByPk(req.params.id_activity)
            .then(activity => {
                activity.setLocations(req.body.location_ids)
                    .then(() => {
                        activity.getLocations()
                            .then(ret => {
                                res.send({'locations': ret});
                            })
                            .catch(err => {
                                res.status(500).send({'error': err});
                            });
                    })
                    .catch(err => {
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });

    app.delete('/activity_location/:id_activity', function(req, res){
        Activity.findByPk(req.params.id_activity)
            .then(activity => {
                activity.removeLocations(req.body.location_ids)
                    .then(() => {
                        activity.getLocations()
                            .then(ret => {
                                res.send({'locations': ret});
                            })
                            .catch(err => {
                                res.status(500).send({'error': err});
                            });
                    })
                    .catch(err => {
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });
};