module.exports = function(app, sequelize, models){

    let Activity = models.Activity;

    console.log('\tactivity_location requests loaded');

    /**
     * This request gets an activity according location to the activity id.
     * arguments :
     *              id : the id of the activity
     * returns :
     *              a json object
     */
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

    /**
     * This requests adds new locations to the specified activity
     * arguments :
     *              locations_ids : array of all the id that will be added
     * returns :
     *              a json array off all the added locations
     */
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


    /**
     * This requests updates locations from the specified activity
     * arguments :
     *              locations_ids : array of all the id that will be added
     * returns :
     *              a json array off all the added locations
     */
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

    /**
     * This request deletes the link between location(s) and an activity
     * arguments :
     *              locations_ids : array of all the id that will be added
     * returns :
     *              a json array off all the added locations
     */
    app.delete('/activity_location/:id_activity', function(req, res){
        Activity.findByPk(req.params.id_activity)
            .then(activity => {
                activity.removeLocations(req.body.location_ids)
                    .then(() => {
                        activity.getLocations()
                            .then(ret => {
                                res.send({'result': ret});
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