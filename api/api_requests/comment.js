module.exports = function(app, sequelize, models, keycloak) {
  console.log("\tcomment requests loaded");

  let Comment = models.CommentObject;

  /**
   *   This request gets all the comments in the database.
   *   arguments :
   *               none
   *   returns :
   *               an json array of comments
   */
  app.get("/comment", keycloak.protect("realm:user"), function(req, res) {
    Comment.findAll({
      where: req.query
    }).then(comments => {
      res.send({ comments: comments });
    });
  });

  /**
   *  This requests creates a new comment with the content, date, user, activity and task.
   *  arguments :
   *              content: the content of the comment
   *              date: the date and time of the comment
   *              user_id: the user id of the user that wrote the comment
   *              activity_id: the activity id of the activity on which the comment was written
   *              task_id: the task id of the task on which the comment was written
   *
   *  returns :
   *              a json object containing the created comment
   */
  app.post("/comment", keycloak.protect("realm:user_modifier"), function(
    req,
    res
  ) {
    Comment.create(req.body)
      .then(comment => {
        res.send({ comment: comment });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This requests updates a comment according to its id.
   *  arguments :
   *              id : the id of the comment
   *              content: the content of the comment
   *              date: the date and time of the comment
   *              user_id: the user id of the user that wrote the comment
   *              activity_id: the activity id of the activity on which the comment was written
   *              task_id: the task id of the task on which the comment was written
   *
   *  returns :
   *              the updated object
   */
  app.put("/comment", keycloak.protect("realm:user_modifier"), function(
    req,
    res
  ) {
    Comment.update(req.body, {
      where: {
        id: req.body.id
      }
    })
      .then(() => {
        Comment.findByPk(req.body.id)
          .then(comment => {
            res.send({ comment: comment });
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
   *  This requests deletes a comment according to its id.
   *  arguments :
   *              id : the id of the comment
   *  returns :
   *              a result being 1 if succeeded, 0 else
   */
  app.delete("/comment", keycloak.protect("realm:user_modifier"), function(
    req,
    res
  ) {
    Comment.destroy({
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
