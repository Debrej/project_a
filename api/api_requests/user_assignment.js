module.exports = function(app, sequelize, models) {
  console.log("\tuser_assignment requests loaded");

  let User_Assignment = models.User_Assigment;

  /**
   *  This request gets all the user assignments
   *  arguments:
   *              none
   *  returns:
   *              a json array of user assignments
   */
  app.get("/user_assignment/", function(req, res) {
    User_Assignment.findAll()
      .then(user_assigments => {
        res.send({ user_assignments: user_assigments });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request gets a user assignment according to its id
   *  arguments:
   *              id: the id of the user assignment
   *  returns:
   *              an object containing the user assignment
   */
  app.get("/user_assignment/id/:id", function(req, res) {
    User_Assignment.findByPk(req.params.id)
      .then(user_assignment => {
        res.send({ user_assignment: user_assignment });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request creates multiple user assignments with a json array of assignment
   *  arguments:
   *              user_id: the id of the user
   *              availability_id: the id of the availability
   *  returns:
   *              a json array of created assignments
   */
  app.post("/user_assignment", function(req, res) {
    User_Assignment.bulkCreate(req.body.user_assignments)
      .then(user_assigments => {
        res.send({ user_assignments: user_assigments });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request updates a user assignment according to its id
   *  arguments:
   *              id: the id of the assignment
   *              user_id: the id of the user
   *              availability_id: the if of the availability
   *  returns:
   *              a json object containing the updated object
   */
  app.put("/user_assignment/:id", function(req, res) {
    User_Assignment.update(req.body, { where: { id: req.params.id } })
      .then(() => {
        User_Assignment.findByPk(req.params.id)
          .then(user_assignment => {
            res.send({ user_assignment: user_assignment });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request deletes a user assignment according to its id
   *  arguments:
   *              id: the id of the user assignment
   *  returns:
   *              a result being 1 if the request succeeded, 0 else
   */
  app.delete("/user_assignment/:id", function(req, res) {
    User_Assignment.destroy({ where: { id: req.params.id } })
      .then(ret => {
        res.send({ result: ret });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });
};
