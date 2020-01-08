module.exports = function(app, sequelize, models){

    console.log('\tequipment and equipment type requests loaded');

    //region EQUIPMENT

    let Equipment = models.Equipment;

    /**
     *   This request gets all the equipments in the database.
     *   arguments :
     *               none
     *   returns :
     *               an json array of equipments
     */
    app.get('/equipment', function(req, res){
        Equipment.findAll()
            .then(equipments => {
                res.send({'equipments': equipments});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *   This request gets an equipment according to its id.
     *   arguments :
     *               id : the id of the equipment
     *   returns :
     *               a json object containing the equipment
     */
    app.get('/equipment/id/:id', function(req, res) {
        Equipment.findByPk(req.params.id)
            .then(equipment => {
                res.send({'equipment': equipment});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests creates a new equipment with the name, description, quantity,
     *  equipment type id, pickup location and drop location.
     *  arguments :
     *              name: the name of the equipment
     *              description: a brief description of the equipment
     *              quantity: the quantity of equipment there is
     *              equipment_type_id: the id of the equipment type
     *              pickup_location: the id of the pickup location
     *              drop_location: the id of the drop location
     *
     *  returns :
     *              a json object containing the created equipment
     */
    app.post('/equipment', function(req, res){
        Equipment.create(
                {
                   name: req.body.name,
                   description: req.body.description,
                   quantity: req.body.quantity,
                   equipment_type_id: req.body.equipment_type_id,
                   pickup_location: req.body.pickup_location,
                   drop_location: req.body.drop_location
                }
            )
            .then(equipment => {
                res.send({'equipment': equipment});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests updates an equipment with the name, description, quantity,
     *  equipment type id, pickup location and drop location according to its id.
     *  arguments :
     *              id: the id of the equipment
     *              name: the name of the equipment
     *              description: a brief description of the equipment
     *              quantity: the quantity of equipment there is
     *              equipment_type_id: the id of the equipment type
     *              pickup_location: the id of the pickup location
     *              drop_location: the id of the drop location
     *
     *  returns :
     *              the updated object
     */
    app.put('/equipment/:id', function(req, res){
        Equipment.update(
                {
                    name: req.body.name,
                    description: req.body.description,
                    quantity: req.body.quantity,
                    equipment_type_id: req.body.equipment_type_id,
                    pickup_location: req.body.pickup_location,
                    drop_location: req.body.drop_location
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            .then(() => {
                Equipment.findByPk(req.params.id)
                    .then(equipment => {
                        res.send({'equipment': equipment});
                    })
                    .catch(err => {
                        res.status(500).send({'error': err})
                    });            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests deletes an equipment according to its id.
     *  arguments :
     *              id : the id of the equipment
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */
    app.delete('/equipment/:id', function(req, res){
        Equipment.destroy({
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

    //endregion

    //region EQUIPMENT TYPE

    let Equipment_Type = models.Equipment_Type;

    /**
     *   This request gets all the equipment types in the database.
     *   arguments :
     *               none
     *   returns :
     *               an json array of equipment types
     */
    app.get('/equipment_type', function(req, res){
        Equipment_Type.findAll()
            .then(equipment_types => {
                res.send({'equipment_type': equipment_types});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *   This request gets an equipment type according to its id.
     *   arguments :
     *               id : the id of the equipment type
     *   returns :
     *               a json object containing the equipment type
     */
    app.get('/equipment_type/id/:id', function (req, res) {
        Equipment_Type.findByPk(req.params.id)
            .then(equipment_type => {
                res.send({'equipment_type': equipment_type})
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests creates a new equipment type with the name.
     *  arguments :
     *              name: the name of the equipment type
     *
     *  returns :
     *              a json object containing the created equipment type
     */
    app.post('/equipment_type', function(req, res){
        Equipment_Type.create(
            {
                name: req.body.name
            })
            .then(equipment_type => {
                res.send({'equipment_type': equipment_type});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });

    });

    /**
     *  This requests updates an equipment type according to its id.
     *  arguments :
     *              id : the id of the equipment type
     *              name : the name of the equipment type
     *
     *  returns :
     *              the updated object
     */
    app.put('/equipment_type/:id', function(req, res){
        Equipment_Type.update(
                {
                    name: req.body.name
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            .then(() => {
                Equipment_Type.findByPk(req.params.id)
                    .then(equipment_type => {
                        res.send({'equipment_type': equipment_type});
                    })
                    .catch(err => {
                        res.status(500).send({'error': err})
                    });            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests deletes an equipment type according to its id.
     *  arguments :
     *              id : the id of the equipment type
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */
    app.delete('/equipment_type/:id', function(req, res){
        Equipment_Type.destroy({
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

    //endregion
};