module.exports = function(app, sequelize, models){

    let moment = require('moment');

    console.log('\tshift and shift category requests loaded');

    //region SHIFT REQUESTS

    let Shift = models.Shift;

    /**
     *   This request gets all the shifts in the database.
     *   arguments :
     *               none
     *   returns :
     *               an json array of shifts
     */
    app.get('/shift', function(req, res){
        Shift.findAll()
        .then(shifts => {
            res.send({'shifts': shifts});
        })
        .catch( err => {
            res.status(500).send({'error': err});
        });
    });

    /**
     *   This request gets a shift according to its id.
     *   arguments :
     *               id : the id of the shift
     *   returns :
     *               a json object containing the shift
     */
    app.get('/shift/:id', function(req, res){
       Shift.findByPk(req.params.id)
       .then(shift => {
           res.send({'shift': shift});
       })
       .catch( err => {
           res.status(500).send({'error': err});
       });
    });

    /**
     *  This requests creates a new shift with the start date, end date, charisma and the shift category id.
     *  arguments :
     *              start_date : the starting date and time of the shift
     *              end_date : the ending date and time of the shift
     *              charisma : the number of charisma points awarded for this shift
     *              shift_category_id : the id of the shift category it belongs to
     *
     *  returns :
     *              a json object containing the created shift
     */
    app.post('/shift', function(req, res){
        Shift.create({
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            charisma: req.body.charisma,
            shift_category_d: req.body.shift_category_id
        })
        .then(shift => {
            res.send({'shift': shift});
        })
        .catch(err => {
            res.status(500).send({'error': err})
        });
    });

    /**
     *  This request creates multiple shifts with a starting date, ending date, charisma, shift category id and shift length in minutes
     *  arguments :
     *              start_date : the starting date and time of the shift window
     *              end_date : the ending date and time of the shift window
     *              charisma : the number of charisma points awarded for the shifts
     *              shift_category_id : the id of the shift category it belongs to
     *              shift_length : a single shift length defined in minutes
     *  returns :
     *              a json array containing the created shifts
     */
    app.post('/shift/window', function(req, res){
       let nb_shifts = Math.ceil(((new Date(req.body.end_date) - new Date(req.body.start_date))/(3600*1000)*60)/req.body.shift_length);
       let start_date = new Date(req.body.start_date);
       let shift_array = [];
       for(let i = 0; i < nb_shifts; i++) {
           let new_start_date = moment(start_date).add(req.body.shift_length * i, 'm').toDate();
           let new_end_date = moment(new_start_date).add(req.body.shift_length, 'm').toDate();
           shift_array[i] = {
               "start_date": new_start_date,
               "end_date": new_end_date,
               "charisma": req.body.charisma,
               "shift_category_id": req.body.shift_category_id
           };
       }
       Shift.bulkCreate(shift_array)
           .then(shifts => {
                res.send({'shifts': shifts})
           })
           .catch(err => {
               res.status(500).send({'error': err})
           });
   });

    /**
     *  This requests updates a shift according to its id.
     *  arguments :
     *              id : the id of the shift
     *              start_date : the starting date and time of the shift
     *              end_date : the ending date and time of the shift
     *              charisma : the number of charisma points awarded for this shift
     *              shift_category_id : the id of the shift category it belongs to
     *
     *  returns :
     *              the updated object
     */
    app.put('/shift/:id', function(req, res){
        Shift.update(
            {
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                charisma: req.body.charisma,
                shift_category_d: req.body.shift_category_id
            },{
                where: {
                    id: req.params.id
                }
            }
        ).then(() => {
            Shift.findByPk(req.params.id)
                .then(shift => {
                    res.send({'shift': shift});
                })
                .catch(err => {
                    res.status(500).send({'error': err})
                });
        }).catch(err => {
            res.status(500).send({'error': err})
        });
    });

    /**
     *  This requests deletes a shift according to its id.
     *  arguments :
     *              id : the id of the shift     *
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */
    app.delete('/shift/:id', function(req, res){
        Shift.destroy({
            where: {
                id: req.params.id
            }
        }).then(shift => {
            res.send({'result': shift});
        }).catch(err => {
            res.status(500).send({'error': err})
        });
    });

    //endregion

    //region SHIFT CATEGORY REQUESTS

    let Shift_Category = models.Shift_Category;

    /**
     *   This request gets all the shift categories in the database.
     *   arguments :
     *               none
     *   returns :
     *               an json array of shift categories
     */
    app.get('/shift_category', function(req, res){
        Shift_Category.findAll().then(shift_categories => {
          res.send({'shift_category': shift_categories});
        })
    });

    /**
     *   This request gets a shift category according to its id.
     *   arguments :
     *               id : the id of the shift category
     *   returns :
     *               a json object containing the shift category
     */
    app.get('/shift_category/:id', function(req, res){
        Shift_Category.findByPk(req.params.id)
            .then(shift_category => {
                res.send({'shift_category': shift_category})
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests creates a new shift category with the name.
     *  arguments :
     *              name: the name of the category
     *
     *  returns :
     *              a json object containing the created shift category
     */
    app.post('/shift_category', function(req, res){
        Shift_Category.create({
            name: req.body.name
        }).then(shift_category => {
            res.send({'shift_category': shift_category})
        }).catch(err => {
            res.status(500).send({'error': err})
        });
    });

    /**
     *  This requests updates a shift category according to its id.
     *  arguments :
     *              id : the id of the shift category
     *              name : the name of the shift category
     *
     *  returns :
     *              the updated object
     */
    app.put('/shift_category/:id', function(req, res){
        Shift_Category.update({
            name: req.body.name
        },
        {
            where: {
                id: req.params.id
            }
        }).then(() => {
            Shift_Category.findByPk(req.params.id)
                .then(shift_category => {
                    res.send({'shift_category': shift_category});
                })
                .catch(err => {
                    res.status(500).send({'error': err})
                });
        }).catch(err => {
            res.status(500).send({'error': err})
        });
    });

    /**
     *  This requests deletes a shift category according to its id.
     *  arguments :
     *              id : the id of the shift category
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */
    app.delete('/shift_category/:id', function(req, res){
        Shift_Category.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.send({'result': result});
        }).catch(err => {
            res.status(500).send({'error': err})
        });
    });

    //endregion
};