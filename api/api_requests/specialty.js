module.exports = function(app, sequelize, models, keycloak) {
  console.log("\tspecialty requests loaded");

  let Specialty = models.Specialty;

  /**
   *   This request gets all the specialties in the database.
   *   arguments :
   *               none
   *   returns :
   *               an json array of specialties
   */
  app.get("/specialty", keycloak.protect("realm:user"), function(req, res) {
    Specialty.findAll({
      where: req.query
    })
      .then(specialties => {
        res.send({ specialty: specialties });
      })
      .catch(err => {
        res.status(500).send({ error: err });
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
  app.post("/specialty", keycloak.protect("realm:user_admin"), function(
    req,
    res
  ) {
    Specialty.create(req.body)
      .then(specialty => {
        res.send({ specialty: specialty });
      })
      .catch(err => {
        res.status(500).send({ error: err });
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
  app.put("/specialty", keycloak.protect("realm:user_admin"), function(
    req,
    res
  ) {
    Specialty.update(req.body, {
      where: {
        id: req.body.id
      }
    })
      .then(() => {
        Specialty.findByPk(req.body.id)
          .then(specialty => {
            res.send({ specialty: specialty });
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
   *  This requests deletes a specialty according to its id.
   *  arguments :
   *              id : the id of the specialty
   *  returns :
   *              a result being 1 if succeeded, 0 else
   */
  app.delete("/specialty", keycloak.protect("realm:user_admin"), function(
    req,
    res
  ) {
    Specialty.destroy({
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
