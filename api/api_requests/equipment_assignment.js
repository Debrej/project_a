module.exports = function(app, sequelize, models){

    console.log('\tequipment_assignment requests loaded');

    let Assignment = models.Equipment_Assignment;

    /**
     *  This request gets all the equipment assignments
     *  arguments:
     *              none
     *  returns:
     *              a json array of equipment assignments
     */
    app.get('/equipment_assignment/', function(req, res){
        Assignment.findAll()
            .then(equipment_assigments => {
                res.send({"equipment_assignments": equipment_assigments});
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({'error': err});
            });
    });

    /**
     *  This request gets a equipment assignment according to its id
     *  arguments:
     *              id: the id of the equipment assignment
     *  returns:
     *              an object containing the equipment assignment
     */
    app.get('/equipment_assignment/id/:id', function(req, res){
        Assignment.findByPk(req.params.id)
            .then(equipment_assignment => {
                res.send({"equipment_assignment": equipment_assignment});
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({'error': err});
            });
    });

    /**
     *  This request creates multiple equipment assignments with a json array of assignment
     *  arguments:
     *              equipment_requirement_id: the id of the equipment requirement
     *              quantity: the quantity assigned
     *  returns:
     *              a json array of created assignments
     */
    app.post('/equipment_assignment', function(req, res){
        Assignment.bulkCreate(req.body.assignments)
            .then(equipment_assigments => {
                res.send({"equipment_assignments": equipment_assigments});
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({'error': err});
            });
    });

    /**
     *  This request updates a equipment assignment according to its id
     *  arguments:
     *              id: the id of the assignment
     *              equipment_requirement_id: the id of the equipment requirement
     *              quantity: the quantity assigned
     *  returns:
     *              a json object containing the updated object
     */
    app.put('/equipment_assignment/:id', function(req, res){
        Assignment.update(req.body,{where: {id: req.params.id}})
            .then(() => {
                Assignment.findByPk(req.params.id)
                    .then(equipment_assignment => {
                        res.send({"equipment_assignment": equipment_assignment});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({'error': err});
            });
    });

    /**
     *  This request deletes a equipment assignment according to its id
     *  arguments:
     *              id: the id of the equipment assignment
     *  returns:
     *              a result being 1 if the request succeeded, 0 else
     */
    app.delete('/equipment_assignment/:id', function(req, res){
        Assignment.destroy({where: {id: req.params.id}})
            .then(ret => {
                res.send({'result': ret});
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });
};