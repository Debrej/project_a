module.exports = function(app, sequelize, models, keycloak) {
  console.log("\tequipment and equipment type requests loaded");

  //region EQUIPMENT

  let Equipment = models.Equipment;
  let Equipment_Type = models.Equipment_Type;

  /**
   *   This request gets all the equipments in the database.
   *   arguments :
   *               none
   *   returns :
   *               an json array of equipments
   */
  app.get("/equipment", keycloak.protect("realm:user"), function(req, res) {
    Equipment.findAll({
      where: req.query,
      include: [
        {
          model: Equipment_Type,
          as: "equipment_type"
        }
      ]
    })
      .then(equipments => {
        res.send({ equipments: equipments });
      })
      .catch(err => {
        res.status(500).send({ error: err });
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
  app.post("/equipment", keycloak.protect("realm:user_modifier"), function(
    req,
    res
  ) {
    Equipment.create(req.body)
      .then(equipment => {
        res.send({ equipment: equipment });
      })
      .catch(err => {
        res.status(500).send({ error: err });
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
  app.put("/equipment", keycloak.protect("realm:user_modifier"), function(
    req,
    res
  ) {
    Equipment.update(req.body, {
      where: {
        id: req.body.id
      }
    })
      .then(() => {
        Equipment.findByPk(req.body.id)
          .then(equipment => {
            res.send({ equipment: equipment });
          })
          .catch(err => {
            res.status(500).send({ error: err });
          });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This requests deletes an equipment according to its id.
   *  arguments :
   *              id : the id of the equipment
   *  returns :
   *              a result being 1 if succeeded, 0 else
   */
  app.delete("/equipment", keycloak.protect("realm:user_log"), function(
    req,
    res
  ) {
    Equipment.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(result => {
        res.send({ result: result });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  //endregion

  //region EQUIPMENT TYPE

  /**
   *   This request gets all the equipment types in the database.
   *   arguments :
   *               none
   *   returns :
   *               an json array of equipment types
   */
  app.get("/equipment_type", keycloak.protect("realm:user"), function(
    req,
    res
  ) {
    Equipment_Type.findAll({ where: req.query })
      .then(equipment_types => {
        res.send({ equipment_type: equipment_types });
      })
      .catch(err => {
        res.status(500).send({ error: err });
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
  app.post("/equipment_type", keycloak.protect("realm:user_log"), function(
    req,
    res
  ) {
    Equipment_Type.create(req.body)
      .then(equipment_type => {
        res.send({ equipment_type: equipment_type });
      })
      .catch(err => {
        res.status(500).send({ error: err });
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
  app.put("/equipment_type", keycloak.protect("realm:user_log"), function(
    req,
    res
  ) {
    Equipment_Type.update(req.body, {
      where: {
        id: req.body.id
      }
    })
      .then(() => {
        Equipment_Type.findByPk(req.body.id)
          .then(equipment_type => {
            res.send({ equipment_type: equipment_type });
          })
          .catch(err => {
            res.status(500).send({ error: err });
          });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This requests deletes an equipment type according to its id.
   *  arguments :
   *              id : the id of the equipment type
   *  returns :
   *              a result being 1 if succeeded, 0 else
   */
  app.delete("/equipment_type", keycloak.protect("realm:user_log"), function(
    req,
    res
  ) {
    Equipment_Type.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(result => {
        res.send({ result: result });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  //endregion
};
