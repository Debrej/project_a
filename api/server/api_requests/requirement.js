module.exports = function(app, sequelize, models){

    console.log('\tuser_requirement requests loaded');

    let Requirement = models.User_Requirement;
    /**
     * This request gets all the requirements in the database.
     * arguments :
     *              none
     *
     */
    app.get('/user_requirement', function(req, res){
        Requirement.findAll()
            .then(requirements => {
                res.send({'requirements': requirements});
            })
            .catch(err =>{
                res.status(500).send({'error': err})
            });
    });

    /**
     *   This request gets an user_requirement according to its id.
     *   arguments :
     *               id : the id of the user_requirement
     *   returns :
     *               a json object containing the user_requirement
     */

    app.get('/user_requirement/:id',function (req,res) {
        Requirement.findByPk(req.params.id)
            .then(requirement =>{
                res.send({'requirement': requirement})
            })
            .catch(err =>{
                res.status(500).send({'error': err})
            });
    });

    /**
     * This request creates a new user_requirement with the quantity, user_id, team_id and task_id
     * arguments :
     *          quantity : the number of needed volunteer(s)
     *          user_id : the _id of the needed volunteer(s)
     *          team_id : the team of the needed volunteer(s)
     *          task_id : the _id of the task for which the user_requirement is created
     *          shift_id : the id of the shift on which the requirement is
     * returns :
     *          a json array containing the created user_requirement(s)
     */

    app.post('/user_requirements', function(req, res){
        Requirement.bulkCreate(req.body.requirements)
            .then(requirements => {
                res.send({'requirements': requirements})
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests updates a user_requirement according to its id.
     *  arguments :
     *              id : the id of the shift
     *              quantity : the number of needed volunteer(s)
     *              user_id : the _id of the needed volunteer(s)
     *              team_id : the team of the needed volunteer(s)
     *              task_id : the _id of the task for which the user_requirement is created
     *              shift_id : the id of the shift on which the requirement is
     *  returns :
     *              the updated object
     */

    app.put('/user_requirement/:id', function(req, res){
        Requirement.update(
            {
                quantity : req.body.quantity,
                user_id : req.body.user_id,
                team_id : req.body.team_id,
                task_id : req.body.task_id,
                shift_id : req.body.shift_id
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
     *  This requests deletes a user_requirement according to its id.
     *  arguments :
     *              id : the id of the user_requirement
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */

    app.delete('/user_requirement/:id', function(req, res){
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