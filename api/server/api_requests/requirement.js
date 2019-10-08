module.exports = function(app, sequelize, models){

    console.log('requirement requests loaded');

    let Requirement = models.Requirement;
    /**
     * This request gets all the requirements in the database.
     * arguments :
     *              none
     *
     */
    app.get('/requirement', function(req, res){
        Requirement.findAll()
            .then(requirements => {
                res.send({'requirements': requirements});
            })
            .catch(err =>{
                res.status(500).send({'error': err})
            });
    });

    /**
     *   This request gets an requirement according to its id.
     *   arguments :
     *               id : the id of the requirement
     *   returns :
     *               a json object containing the requirement
     */

    app.get('/requirement/:id',function (req,res) {
        Requirement.findByPk(req.params.id)
            .then(requirement =>{
                res.send({'requirement': requirement})
            })
            .catch(err =>{
                res.status(500).send({'error': err})
            });
    });

    /**
     * This request creates a new requirement with the quantity, user_id, team_id and task_id
     * arguments :
     *          quantity : the number of needed volunteer(s)
     *          user_id : the _id of the needed volunteer(s)
     *          team_id : the team of the needed volunteer(s)
     *          task_id : the _id of the task for which the requirement is created
     * returns :
     *          a json array containing the created requirement(s)
     */

    app.post('/requirements', function(req, res){
        Requirement.bulkCreate(req.body.requirements)
            .then(requirements => {
                res.send({'requirements': requirements})
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests updates a requirement according to its id.
     *  arguments :
     *              id : the id of the shift
     *              quantity : the number of needed volunteer(s)
     *              user_id : the _id of the needed volunteer(s)
     *              team_id : the team of the needed volunteer(s)
     *              task_id : the _id of the task for which the requirement is created
     *  returns :
     *              the updated object
     */

    app.put('/requirement/:id', function(req, res){
        Requirement.update(
            {
                quantity : req.body.quantity,
                user_id : req.body.user_id,
                team_id : req.body.team_id,
                task_id : req.body.task_id
            },{
                where : {
                    id: req.params.id
                }
            }
        ).then( () => {
            Requirement.findByPk(req.params.id)
                .then(requirement =>{
                    res.send({'requirement': requirement});
                })
                .catch(err => {
                    res.status(500).send({'error': err})
                });
        }).catch(err => {
            res.status(500).send({'error': err})
        });
    });

    /**
     *  This requests deletes a requirement according to its id.
     *  arguments :
     *              id : the id of the requirement     *
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */

    app.delete('/requirement/:id', function(req, res){
        Requirement.destroy({
            where:{
                id: req.params.id
            }
        }).then(requirement => {
            res.send({'result': requirement})
        }).catch(err =>{
            res.status(500).send({'error': err})
        });
    });
};