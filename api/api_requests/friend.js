module.exports = function(app, sequelize, models, Sequelize) {
  const Op = Sequelize.Op;
  let Friendship = models.Friendship;
  let User = models.User;

  console.log("\tfriend requests loaded");

  /**
   *  This request gets all the friendships in the database
   *  arguments:
   *              none
   *  return:
   *              a json array of friendships
   */
  app.get("/friendship", function(req, res) {
    Friendship.findAll({ where: req.query })
      .then(friends => {
        res.send({ friendships: friends });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request gets all the friends of a given user
   *  arguments:
   *              user_id: the id of the user
   *  return:
   *              a json array of users
   */
  app.get("/friendship/user", function(req, res) {
    Friendship.findAll({
      where: {
        [Op.or]: {
          user_id: req.query.user_id,
          friend_id: req.query.user_id
        }
      }
    })
      .then(friends => {
        let user_ids = [];
        for (let i in friends) {
          user_ids.push(friends[i].user_id);
          user_ids.push(friends[i].friend_id);
        }
        user_ids = [...new Set(user_ids)];
        User.findAll({
          where: {
            [Op.and]: {
              id: user_ids,
              [Op.not]: {
                id: req.query.user_id
              }
            }
          }
        })
          .then(friends => {
            res.send({ friends: friends });
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
   *  This request creates multiple friendships with an array of friendship
   *  arguments:
   *              user_id: the id of the user
   *              friend_id: the user id of the friend
   *  return:
   *              a json array of the created friendships
   */
  app.post("/friendship", function(req, res) {
    Friendship.bulkCreate(req.body.friendships)
      .then(friendships => {
        res.send({ friendships: friendships });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ error: err });
      });
  });

  /**
   *  This request updates a friendship according to its id
   *  arguments:
   *              id: the id of the friendship
   *              user_id: the id of the user
   *              friend_id: the user id of the friend
   *  return:
   *              a json array of the created friendships
   */
  app.put("/friendship", function(req, res) {
    Friendship.update(req.body, { where: { id: req.body.id } })
      .then(() => {
        Friendship.findByPk(req.body.id)
          .then(friend => {
            res.send({ friendship: friend });
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
   *  This request deletes a friendship according to its id
   *  arguments:
   *              id: the id of the friendship
   *  return:
   *              a result being 1 if the request succeeded, 0 else
   */
  app.delete("/friendship", function(req, res) {
    Friendship.destroy({ where: { id: req.body.id } })
      .then(result => {
        res.send({ result: result });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ error: err });
      });
  });
};
