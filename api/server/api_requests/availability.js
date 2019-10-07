module.exports = function(app, sequelize, models){

    let Availability = models.Availability;

    console.log('availability requests loaded');

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
     *              id_user: the id of the user
     *  returns:
     *              a json array of availabilities
     */
    app.get('/availability/user/:id_user', function(req, res){
        Availability.findAll({where: {userId: req.params.id_user}})
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
     *              id_shift: the id of the shift
     *  returns:
     *              a json array of availabilities
     */
    app.get('/availability/shift/:id_shift', function(req, res){
        Availability.findAll({where: {shiftId: req.params.id_shift}})
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
     *              userId: the id of the user
     *              shiftId: the id of the shift
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
     *              userId: the id of the user
     *              shiftId: the id of the shift
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