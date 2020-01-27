module.exports = function(app, sequelize, models, Sequelize) {
  const Op = Sequelize.Op;

  console.log("\tsearch requests loaded");

  /**
   *  This request gets all the activities matching the search term in their name, description, contractor name or contractor comment
   *  arguments:
   *              search_term: the string that will be searched within the object
   *  returns:
   *              a json array of activities
   */
  app.get("/search/activity", function(req, res) {
    models.Activity.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: req.body.search_term
            }
          },
          {
            description: {
              [Op.substring]: req.body.search_term
            }
          },
          {
            contractor_name: {
              [Op.substring]: req.body.search_term
            }
          },
          {
            contractor_comment: {
              [Op.substring]: req.body.search_term
            }
          }
        ]
      }
    })
      .then(activities => {
        res.send({ activities: activities });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request gets all the comments matching the search term in the content
   *  arguments:
   *              search_term: the string that will be searched within the object
   *  returns:
   *              a json array of comments
   */
  app.get("/search/comment", function(req, res) {
    models.CommentObject.findAll({
      where: {
        [Op.or]: [
          {
            content: {
              [Op.substring]: req.body.search_term
            }
          }
        ]
      }
    })
      .then(comments => {
        res.send({ comments: comments });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request gets all the equipments matching the search term in the name or description
   *  arguments:
   *              search_term: the string that will be searched within the object
   *  returns:
   *              a json array of equipments
   */
  app.get("/search/equipment", function(req, res) {
    models.Equipment.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: req.body.search_term
            }
          },
          {
            description: {
              [Op.substring]: req.body.search_term
            }
          }
        ]
      }
    })
      .then(equipments => {
        res.send({ equipments: equipments });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request gets all the equipment types matching the search term in the name
   *  arguments:
   *              search_term: the string that will be searched within the object
   *  returns:
   *              a json array of equipment types
   */
  app.get("/search/equipment_type", function(req, res) {
    models.Equipment_Type.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: req.body.search_term
            }
          }
        ]
      }
    })
      .then(equipment_types => {
        res.send({ equipment_types: equipment_types });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request gets all the events matching the search term in the name or description
   *  arguments:
   *              search_term: the string that will be searched within the object
   *  returns:
   *              a json array of events
   */
  app.get("/search/event", function(req, res) {
    models.Event.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: req.body.search_term
            }
          },
          {
            description: {
              [Op.substring]: req.body.search_term
            }
          }
        ]
      }
    })
      .then(events => {
        res.send({ events: events });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request gets all the locations matching the search term in the name or description
   *  arguments:
   *              search_term: the string that will be searched within the object
   *  returns:
   *              a json array of locations
   */
  app.get("/search/location", function(req, res) {
    models.Location.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: req.body.search_term
            }
          },
          {
            description: {
              [Op.substring]: req.body.search_term
            }
          }
        ]
      }
    })
      .then(locations => {
        res.send({ locations: locations });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request gets all the tasks matching the search term in the name or description
   *  arguments:
   *              search_term: the string that will be searched within the object
   *  returns:
   *              a json array of tasks
   */
  app.get("/search/task", function(req, res) {
    models.Task.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: req.body.search_term
            }
          },
          {
            description: {
              [Op.substring]: req.body.search_term
            }
          }
        ]
      }
    })
      .then(tasks => {
        res.send({ tasks: tasks });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request gets all the teams matching the search term in the name
   *  arguments:
   *              search_term: the string that will be searched within the object
   *  returns:
   *              a json array of teams
   */
  app.get("/search/team", function(req, res) {
    models.Team.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: req.body.search_term
            }
          }
        ]
      }
    })
      .then(teams => {
        res.send({ teams: teams });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request gets all the users matching the search term in the name or description
   *  arguments:
   *              search_term: the string that will be searched within the object
   *  returns:
   *              a json array of users
   */
  app.get("/search/user", function(req, res) {
    models.User.findAll({
      where: {
        [Op.or]: [
          {
            first_name: {
              [Op.substring]: req.body.search_term
            }
          },
          {
            last_name: {
              [Op.substring]: req.body.search_term
            }
          },
          {
            surname: {
              [Op.substring]: req.body.search_term
            }
          },
          {
            comment: {
              [Op.substring]: req.body.search_term
            }
          },
          {
            experience: {
              [Op.substring]: req.body.search_term
            }
          },
          {
            incapacity: {
              [Op.substring]: req.body.search_term
            }
          }
        ]
      }
    })
      .then(users => {
        res.send({ users: users });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });
};
