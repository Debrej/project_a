module.exports = function(app, sequelize, models, Sequelize) {
  const Op = Sequelize.Op;

  console.log("\tuser_requirement requests loaded");

  let Requirement = models.User_Requirement;
  let Shift = models.Shift;
  let User = models.User;
  let Team = models.Team;

  /**
   * This request gets all the requirements in the database.
   * arguments :
   *              none
   *  returns :
   *              a json array of requirements
   */
  app.get("/user_requirement", function(req, res) {
    Requirement.findAll()
      .then(requirements => {
        res.send({ requirements: requirements });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *   This request gets an user_requirement according to its id.
   *   arguments :
   *               id : the id of the user_requirement
   *   returns :
   *               a json object containing the user_requirement
   */
  app.get("/user_requirement/id/:id", function(req, res) {
    Requirement.findByPk(req.params.id)
      .then(requirement => {
        res.send({ requirement: requirement });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request gets all the user meeting a requirement
   *  arguments:
   *              id: the id of the requirement
   *  returns:
   *              a json array of users
   */
  app.get("/user_requirement/users/:id", function(req, res) {
    Requirement.findByPk(req.params.id)
      .then(requirement => {
        let user_id = requirement.user_id;
        let team_id = requirement.team_id;
        if (user_id != null) {
          User.findByPk(user_id)
            .then(users => {
              res.send({ users: users });
            })
            .catch(err => {
              res.status(500).send({ error: err });
            });
        } else if (team_id != null) {
          Team.findByPk(team_id)
            .then(team => {
              team
                .getUsers()
                .then(users => {
                  res.send({ users: users });
                })
                .catch(err => {
                  res.status(500).send({ error: err });
                });
            })
            .catch(err => {
              res.status(500).send({ error: err });
            });
        }
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request gets all the requirement on a time window
   *  arguments:
   *              start_date: the starting date and time of the time window
   *              end_date: the ending date and time of the time window
   *  returns:
   *              a json array of requirements
   */
  app.get("/user_requirement/window", function(req, res) {
    Shift.findAll({
      where: {
        start_date: {
          [Op.gte]: new Date(req.body.start_date)
        },
        end_date: {
          [Op.lte]: new Date(req.body.end_date)
        }
      }
    })
      .then(shifts => {
        let shift_ids = [];
        for (let i in shifts) {
          shift_ids.push(shifts[i].id);
        }
        Requirement.findAll({
          where: {
            shift_id: shift_ids
          }
        })
          .then(requirements => {
            res.send({ requirements: requirements });
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
  app.post("/user_requirements", function(req, res) {
    Requirement.bulkCreate(req.body.requirements)
      .then(requirements => {
        res.send({ requirements: requirements });
      })
      .catch(err => {
        res.status(500).send({ error: err });
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
  app.put("/user_requirement/:id", function(req, res) {
    Requirement.update(
      {
        quantity: req.body.quantity,
        user_id: req.body.user_id,
        team_id: req.body.team_id,
        task_id: req.body.task_id,
        shift_id: req.body.shift_id
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(() => {
        Requirement.findByPk(req.params.id)
          .then(requirement => {
            res.send({ requirement: requirement });
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
   *  This requests deletes a user_requirement according to its id.
   *  arguments :
   *              id : the id of the user_requirement
   *  returns :
   *              a result being 1 if succeeded, 0 else
   */
  app.delete("/user_requirement/:id", function(req, res) {
    Requirement.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(requirement => {
        res.send({ result: requirement });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });
};
