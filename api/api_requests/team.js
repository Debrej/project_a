module.exports = function(app, sequelize, models, keycloak) {
  console.log("\tteam requests loaded");

  let Team = models.Team;

  //region GET REQUESTS

  /**
   *   This request gets all the teams in the database.
   *   arguments :
   *               none
   *   returns :
   *               an json array of teams
   */
  app.get("/team", keycloak.protect("realm:user"), function(req, res) {
    Team.findAll({
      where: req.query
    }).then(teams => {
      res.send({ team: teams });
    });
  });

  /**
   *   This request gets a team according to its id.
   *   arguments :
   *               id : the id of the team
   *   returns :
   *               a json object containing the team
   */
  app.get("/team/id/:id", keycloak.protect("realm:user"), function(req, res) {
    Team.findByPk(req.params.id).then(team => {
      res.send({ team: team });
    });
  });

  /**
   * This request gets the members of a team.
   *  arguments :
   *              id_team: the id of the team
   *
   *  returns :
   *              an json array of users members of the team
   *
   */
  app.get("/team/members/:id_team", keycloak.protect("realm:user"), function(
    req,
    res
  ) {
    Team.findByPk(req.params.id_team)
      .then(team => {
        team
          .getUsers()
          .then(result => {
            res.send({ team_members: result });
          })
          .catch(err => {
            res.status(500).send({ error: err });
          });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  //endregion

  //region POST REQUESTS

  /**
   *  This requests creates a new team with its name.
   *  arguments :
   *              name: the name of the team
   *              supervisor_id: the user id of the supervisor
   *
   *  returns :
   *              a json object containing the created team
   */
  app.post("/team", keycloak.protect("realm:user_affect"), function(req, res) {
    Team.create(req.body)
      .then(team => {
        res.send({ team: team });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  //endregion

  //region PUT REQUESTS

  /**
   *  This requests updates a team according to its id.
   *  arguments :
   *              id : the id of the team
   *              name: the name of the team
   *              supervisor_id: the user id of the supervisor
   *
   *  returns :
   *              the updated object
   */
  app.put("/team/:id", keycloak.protect("realm:user_affect"), function(
    req,
    res
  ) {
    Team.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        Team.findByPk(req.params.id)
          .then(team => {
            res.send({ team: team });
          })
          .catch(err => {
            res.status(500).send({ error: err });
          });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  //endregion

  //region DELETE REQUESTS

  /**
   *  This requests deletes a team according to its id.
   *  arguments :
   *              id : the id of the team
   *  returns :
   *              a result being 1 if succeeded, 0 else
   */
  app.delete("/team/:id", keycloak.protect("realm:user_affect"), function(
    req,
    res
  ) {
    Team.destroy({
      where: {
        id: req.params.id
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
