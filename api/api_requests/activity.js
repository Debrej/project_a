module.exports = function(app, sequelize, models, keycloak) {
  console.log("\tactivity requests loaded");

  let Activity = models.Activity;

  /**
   *   This request gets all the activities in the database.
   *   arguments :
   *               none
   *   returns :
   *               an json array of activities
   */
  app.get("/activity", keycloak.protect("realm:user"), function(req, res) {
    Activity.findAll({
      where: req.query
    })
      .then(activities => {
        res.send({ activity: activities });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This requests creates a new activity with the name, description, starting and ending date, supervisor id and event id
   *  arguments :
   *              name: the name of the activity
   *              description: a description of the activity
   *              start_date: the starting date and time of the activity
   *              end_date: the ending date and time of the activity
   *              supervisor_id: the user id of the supervisor of the activity
   *              event_id: the id of the event that the activity belongs to
   *              contractor_name: the name of the contractor
   *              contractor_phone: the phone of the contractor
   *              contractor_mail: the mail of the contractor
   *              contractor_comment: a comment on the contractor
   *              contractor_present_on_event: if the contractor is present during the event
   *  returns :
   *              a json object containing the created activity
   */
  app.post("/activity", keycloak.protect("realm:user_modifier"), function(
    req,
    res
  ) {
    Activity.create(req.body)
      .then(activity => {
        res.send({ activity: activity });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request updates an activity according to its id.
   *  arguments :
   *              id : the id of the activity
   *              name: the name of the activity
   *              description: a description of the activity
   *              start_date: the starting date and time of the activity
   *              end_date: the ending date and time of the activity
   *              supervisor_id: the user id of the supervisor of the activity
   *              event_id: the id of the event that the activity belongs to
   *              contractor_name: the name of the contractor
   *              contractor_phone: the phone of the contractor
   *              contractor_mail: the mail of the contractor
   *              contractor_comment: a comment on the contractor
   *              contractor_present_on_event: if the contractor is present during the event
   *  returns :
   *              the updated object
   */
  app.put("/activity", keycloak.protect("realm:user_modifier"), function(
    req,
    res
  ) {
    Activity.update(req.body, { where: { id: req.body.id } })
      .then(() => {
        Activity.findByPk(req.body.id)
          .then(activity => {
            res.send({ activity: activity });
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
   *  This requests deletes an activity according to its id.
   *  arguments :
   *              id : the id of the activity
   *  returns :
   *              a result being 1 if succeeded, 0 else
   */
  app.delete("/activity", keycloak.protect("realm:user_modifier"), function(
    req,
    res
  ) {
    Activity.destroy({ where: { id: req.body.id } })
      .then(result => {
        res.send({ result: result });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });
};
