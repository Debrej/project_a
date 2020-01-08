module.exports = function(app, sequelize, models){

    console.log('\tequipment_requirement requests loaded');

    let Requirement = models.Equipment_Requirement;

    /**
     *  This request gets all the equipment requirements in the database
     *  arguments:
     *              none
     *  returns:
     *              a json array of equipment requirements
     */
    app.get('/equipment_requirement', function(req, res){
        Requirement.findAll()
            .then(requirements => {
                res.send({'requirements': requirements});
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });

    /**
     *  This request gets an equipment requirement according to its id
     *  arguments:
     *              id: the id of the equipment requirement
     *  returns:
     *              a json object of the equipment requirement
     */
    app.get('/equipment_requirement/id/:id', function(req, res){
        Requirement.findByPk(req.params.id)
            .then(requirements => {
                res.send({'requirement': requirements});
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });

    /**
     *  This request creates multiple requirement with an array of requirements
     *  arguments:
     *              task_id: the id of the task
     *              activity_id: the id of the activity
     *              equipment_id: the id of the equipment
     *              shift_id: the id of the shift
     *              quantity: the quantity of the equipment
     *  returns:
     *              a json array of created event
     */
    app.post('/equipment_requirement', function(req, res){
        Requirement.bulkCreate(req.body.requirements)
            .then(requirements => {
                res.send({'requirements': requirements})
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This request updates a requirement according to its id
     *  arguments:
     *              id: the id of the requirement
     *              task_id: the id of the task
     *              activity_id: the id of the activity
     *              equipment_id: the id of the equipment
     *              shift_id: the id of the shift
     *  returns:
     *              a json array of created event
     */
    app.put('/equipment_requirement/:id', function(req, res){
        Requirement.update(req.body,{
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                Requirement.findByPk(req.params.id)
                    .then(requirements => {
                        res.send({'requirement': requirements});
                    })
                    .catch(err => {
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This request deletes a requirement according to its id
     *  arguments:
     *              id: the id of the requirement
     *  returns:
     *              a result being 1 if the request succeeded, 0 else
     */
    app.delete('/equipment_requirement/:id', function(req, res){
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