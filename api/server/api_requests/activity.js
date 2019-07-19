module.exports = function(app, sequelize, models){

    console.log('\tactivity requests loaded');

    let Activity = models.Activity;

    /**
     *   This request gets all the activities in the database.
     *   arguments :
     *               none
     *   returns :
     *               an json array of activities
     */
    app.get('/activity', function(req, res){
        Activity.findAll()
            .then(activities => {
                res.send({'activity': activities});
            })
            .catch(err => {
                res.send({'error': err});
            });
    });

    /**
     *   This request gets an activity according to its id.
     *   arguments :
     *               id : the id of the activity
     *   returns :
     *               a json object containing the activity
     */
    app.get('/activity/:id', function(req, res){
        Activity.findByPk(req.params.id)
            .then(activity => {
                res.send({'activity': activity});
            })
            .catch(err => {
                res.send({'error': err});
            });
    });

    /**
     *  This requests creates a new activity with the name, description, starting and ending date, supervisor id and event id
     *  arguments :
     *              name: the name of the activity
     *              description: a description of the activity
     *              start_date: the starting date and time of the activity
     *              end_date: the ending date and time of the activity
     *              supervisor: the user id of the supervisor of the activity
     *              event_id: the id of the event that the activity belongs to
     *
     *  returns :
     *              a json object containing the created activity
     */
    app.post('/activity', function(req, res){
        Activity.create(
                {
                    name: req.body.name,
                    description: req.body.description,
                    start_date: req.body.start_date,
                    end_date: req.body.end_date,
                    supervisor: req.body.supervisor,
                    eventId: req.body.event_id
                }
            )
            .then(activity => {
                res.send({'activity': activity});
            })
            .catch(err => {
                res.send({'error': err});
            });
    });

    /**
     *  This requests updates an activity according to its id.
     *  arguments :
     *              id : the id of the activity
     *              name: the name of the activity
     *              description: a description of the activity
     *              start_date: the starting date and time of the activity
     *              end_date: the ending date and time of the activity
     *              supervisor: the user id of the supervisor of the activity
     *              event_id: the id of the event that the activity belongs to
     *
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */
    app.put('/activity/:id', function(req, res){
        Activity.update(
                {
                    name: req.body.name,
                    description: req.body.description,
                    start_date: req.body.start_date,
                    end_date: req.body.end_date,
                    supervisor: req.body.supervisor,
                    eventId: req.body.event_id
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            .then(result => {
                res.send({'result': result});
            })
            .catch(err => {
                res.send({'error': err});
            });
    });

    /**
     *  This requests deletes an activity according to its id.
     *  arguments :
     *              id : the id of the activity
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */
    app.delete('/activity/:id', function(req, res){
        Activity.destroy(
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            .then(result => {
                res.send({'result': result});
            })
            .catch(err => {
                res.send({'error': err});
            });
    });
};