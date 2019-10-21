module.exports = function(app, sequelize, models){

    let Availability = models.Availability;

    console.log('\tavailability requests loaded');

    /**
     *  This request gets all the availabilities in the database
     *  arguments:
     *              none
     *  returns:
     *              a json array of availabilities
     */
    app.get('/availability', function(req, res){
        Availability.findAll()
            .then(availabilities => {
                res.send({'availabilities': availabilities});
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });

    /**
     *  This request gets an availability according to its id
     *  arguments:
     *              id: the id of the availability
     *  returns:
     *              a json array of availabilities
     */
    app.get('/availability/:id', function(req, res){
        Availability.findByPk(req.params.id)
            .then(availability => {
                res.send({'availability': availability});
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });


    /**
     *  This request gets all the shifts a user is available on
     *  arguments:
     *              user_id: the id of the user
     *  returns:
     *              a json array of availabilities
     */
    app.get('/availability/user/:user_id', function(req, res){
        Availability.findAll({where: {user_id: req.params.user_id}})
            .then(availabilities => {
                res.send({'availabilities': availabilities});
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });

    /**
     *  This request gets all the users available on a shift
     *  arguments:
     *              shift_id: the id of the shift
     *  returns:
     *              a json array of availabilities
     */
    app.get('/availability/shift/:shift_id', function(req, res){
        Availability.findAll({where: {shift_id: req.params.shift_id}})
            .then(availabilities => {
                res.send({'availabilities': availabilities});
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });

    /**
     *  This request creates multiple availabilities with an array of json objects containing a user id and a shift id
     *  arguments:
     *              user_id: the id of the user
     *              shift_id: the id of the shift
     *  returns:
     *              a json object containing the created availabilities
     */
    app.post('/availability', function(req, res){
        Availability.bulkCreate(req.body.availabilities)
            .then(availabilities => {
                res.send({'availabilities': availabilities});
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });

    /**
     *  This request updates an availability with a user id and a shift id
     *  arguments:
     *              user_id: the id of the user
     *              shift_id: the id of the shift
     *  returns:
     *              a json object containing the updated availability
     */
    app.put('/availability/:id', function(req, res){
        Availability.update(req.body,{where: {id: req.params.id}})
            .then(() => {
                Availability.findByPk(req.params.id)
                    .then(availability => {
                        res.send({'availability': availability});
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
     *  This request deletes an availability according to its id
     *  arguments:
     *              id: the id of the availability
     *  returns:
     *              a result of 1 if succeeded, 0 else
     */
    app.delete('/availability/:id', function(req, res){
        Availability.destroy({where: {id: req.params.id}})
            .then(ret => {
                res.send({'result': ret});
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });
};