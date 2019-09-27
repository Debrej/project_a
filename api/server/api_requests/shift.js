module.exports = function(app, sequelize, models){

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
        Shift.findAll().then(shifts => {
            res.send({'shifts': shifts});
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
       Shift.findByPk(req.params.id).then(shift => {
           res.send({'shift': shift});
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
            shiftCategoryId: req.body.shift_category_id
        }).then(shift => {
            res.send({'shift': shift});
        }).catch(err => {
            res.send({'error': err});
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
                shiftCategoryId: req.body.shift_category_id
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
                    res.send({'error': err});
                });
        }).catch(err => {
            res.send({'error': err});
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
            res.send({'shift': shift});
        }).catch(err => {
            res.send({'error': err});
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
                res.send({'error': err});
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
            res.send({'error': err});
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
                    res.send({'error': err});
                });
        }).catch(err => {
            res.send({'error': err});
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
            res.send({'error': err});
        });
    });

    //endregion
};