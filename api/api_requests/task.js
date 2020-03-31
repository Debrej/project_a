module.exports = function(app, sequelize, models, keycloak) {
  console.log("\ttask requests loaded");

  let Task = models.Task;
  let User_Requirement = models.User_Requirement;

  /**
   *   This request gets all the tasks in the database.
   *   arguments :
   *               none
   *   returns :
   *               an json array of tasks
   */
  app.get("/task", keycloak.protect("realm:user"), function(req, res) {
    Task.findAll({
      where: req.query
    })
      .then(tasks => {
        res.send({ task: tasks });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request gets all the tasks that require one specific user
   *  arguments:
   *              user_id: the id of the user
   *  returns:
   *              a json array of tasks
   */
  app.get("/task/require_user", keycloak.protect("realm:user"), function(
    req,
    res
  ) {
    User_Requirement.findAll({ where: { user_id: req.body.user } })
      .then(requirements => {
        let task_ids = [];
        for (let i in requirements) {
          task_ids.push(requirements[i].task_id);
        }
        Task.findAll({ where: { id: task_ids } })
          .then(tasks => {
            res.send({ tasks: tasks });
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
   *  This request gets all the tasks that require one or multiple teams
   *  arguments:
   *              teams: an array of team ids
   *  returns:
   *              a json array of tasks
   */
  app.get("/task/require_team", keycloak.protect("realm:user"), function(
    req,
    res
  ) {
    User_Requirement.findAll({ where: { team_id: req.body.teams } })
      .then(requirements => {
        let task_ids = [];
        for (let i in requirements) {
          task_ids.push(requirements[i].task_id);
        }
        Task.findAll({ where: { id: task_ids } })
          .then(tasks => {
            res.send({ tasks: tasks });
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
   *  This requests creates a new task with the name, description, starting and ending date, supervisor, team, location and activity
   *  arguments :
   *              name: the name of the task
   *              description: a description of the task
   *              start_date: the starting date and time of the task
   *              end_date: the ending date and time of the task
   *              supervisor_id: the user id of the supervisor of the task
   *              team_id: the team id
   *              location_id: the location of the task
   *              activity_id: the activity id of the activity the task belongs to
   *
   *  returns :
   *              a json object containing the created task
   */
  app.post("/task", keycloak.protect("realm:user_modifier"), function(
    req,
    res
  ) {
    Task.create(req.body)
      .then(task => {
        res.send({ task: task });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This requests updates an task according to its id.
   *  arguments :
   *              id : the id of the task
   *              name: the name of the task
   *              description: a description of the task
   *              start_date: the starting date and time of the task
   *              end_date: the ending date and time of the task
   *              supervisor_id: the user id of the supervisor of the task
   *              team_id: the team id
   *              location_id: the location of the task
   *              activity_id: the activity id of the activity the task belongs to
   *
   *  returns :
   *              the updated object
   */
  app.put("/task", keycloak.protect("realm:user_modifier"), function(
    req,
    res
  ) {
    Task.update(req.body, {
      where: {
        id: req.body.id
      }
    })
      .then(() => {
        Task.findByPk(req.body.id)
          .then(task => {
            res.send({ task: task });
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
   *  This requests deletes an task according to its id.
   *  arguments :
   *              id : the id of the task
   *  returns :
   *              a result being 1 if succeeded, 0 else
   */
  app.delete("/task", keycloak.protect("realm:user_modifier"), function(
    req,
    res
  ) {
    Task.destroy({
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
