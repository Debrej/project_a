module.exports = function(app, sequelize, models){

    console.log('\tspecialty requests loaded');

    let Specialty = models.Specialty;

    /**
     *   This request gets all the specialties in the database.
     *   arguments :
     *               none
     *   returns :
     *               an json array of specialties
     */
    app.get('/specialty', function(req, res){
        Specialty.findAll()
            .then(specialties => {
                res.send({'specialty': specialties});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *   This request gets a specialty according to its id.
     *   arguments :
     *               id : the id of the specialty
     *   returns :
     *               a json object containing the specialty
     */
    app.get('/specialty/:id', function(req, res){
        Specialty.findByPk(req.params.id)
            .then(specialty => {
                res.send({'specialty': specialty});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests creates a new specialty with the name and year
     *  arguments :
     *              name: the name of the specialty
     *              year: the year in the specialty
     *
     *  returns :
     *              a json object containing the created specialty
     */
    app.post('/specialty', function(req, res){
        Specialty.create({
                name: req.body.name,
                year: req.body.year
            })
            .then(specialty => {
                res.send({'specialty': specialty});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests updates a specialty according to its id.
     *  arguments :
     *              id : the id of the specialty
     *              name: the name of the specialty
     *              year: the year in the specialty
     *
     *  returns :
     *              the updated object
     */
    app.put('/specialty/:id', function(req, res){
        Specialty.update({
                name: req.body.name,
                year: req.body.year
            },
            {
                where:{
                    id: req.params.id
                }
            }
            )
            .then(() => {
                Specialty.findByPk(req.params.id)
                    .then(specialty => {
                        res.send({'specialty': specialty});
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
     *  This requests deletes a specialty according to its id.
     *  arguments :
     *              id : the id of the specialty
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */
    app.delete('/specialty/:id', function(req, res){
        Specialty.destroy(
                {
                    where:{
                        id: req.params.id
                    }
                }
            )
            .then(result => {
                res.send({'result': result});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });
};