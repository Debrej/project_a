module.exports = function(app, sequelize, models, keycloak) {
  let Location = models.Location;

  console.log("\tlocation requests loaded");

  /**
   *   This request gets all the locations in the database.
   *   arguments :
   *               none
   *   returns :
   *               an json array of locations
   */
  app.get("/location", keycloak.protect("realm:user"), function(req, res) {
    Location.findAll({
      where: req.query
    })
      .then(locations => {
        res.send({ location: locations });
      })
      .catch(err => {
        res.status(500).send({ error: err });
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
  app.post("/location", keycloak.protect("realm:user_modifier"), function(
    req,
    res
  ) {
    Location.create(req.body)
      .then(location => {
        res.send({ location: location });
      })
      .catch(err => {
        res.status(500).send({ error: err });
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
  app.put("/location", keycloak.protect("realm:user_modifier"), function(
    req,
    res
  ) {
    Location.update(req.body, {
      where: {
        id: req.body.id
      }
    })
      .then(() => {
        Location.findByPk(req.body.id)
          .then(location => {
            res.send({ location: location });
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
   *  This requests deletes a location according to its id.
   *  arguments :
   *              id : the id of the location
   *  returns :
   *              a result being 1 if succeeded, 0 else
   */
  app.delete("/location", keycloak.protect("realm:user_modifier"), function(
    req,
    res
  ) {
    Location.destroy({
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
};
