module.exports = function(app, sequelize, models){

    let Location = models.Location;

    console.log('\tlocation requests loaded');

    /**
     *   This request gets all the locations in the database.
     *   arguments :
     *               none
     *   returns :
     *               an json array of locations
     */
    app.get('/location', function(req, res){
        Location.findAll()
            .then(locations => {
                res.send({'location': locations});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *   This request gets a location according to its id.
     *   arguments :
     *               id : the id of the location
     *   returns :
     *               a json object containing the location
     */
    app.get('/location/id/:id', function(req, res){
        Location.findByPk(req.params.id)
            .then(location => {
                res.send({'location': location});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests creates a new location with the name, description and gps coordinates.
     *  arguments :
     *              name: the name of the location
     *              description: a brief description of the location
     *              gps_long: the longitude of the location
     *              gps_lat: the latitude of the location
     *
     *  returns :
     *              a json object containing the created location
     */
    app.post('/location', function(req, res){
        Location.create(
                {
                    name: req.body.name,
                    description: req.body.description,
                    gps_long: req.body.gps_long,
                    gps_lat: req.body.gps_lat
                }
            )
            .then(location => {
                res.send({'location': location});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests updates a location according to its id.
     *  arguments :
     *              id : the id of the location
     *              name: the name of the location
     *              description: a brief description of the location
     *              gps_long: the longitude of the location
     *              gps_lat: the latitude of the location
     *
     *  returns :
     *              the updated object
     */
    app.put('/location/:id', function(req, res){
        Location.update(
                {
                    name: req.body.name,
                    description: req.body.description,
                    gps_long: req.body.gps_long,
                    gps_lat: req.body.gps_lat
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            .then(() => {
                Location.findByPk(req.params.id)
                    .then(location => {
                        res.send({'location': location});
                    })
                    .catch(err => {
                        res.status(500).send({'error': err})
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests deletes a location according to its id.
     *  arguments :
     *              id : the id of the location
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */
    app.delete('/location/:id', function(req, res){
        Location.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(result => {
                res.send({'result': result});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });
};