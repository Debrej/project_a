const multer = require("multer");
const fs = require("fs");

const upload = multer({ dest: global.appRoot + "/tmp/" });

module.exports = function(app, sequelize, models, keycloak) {
  let Event = models.Event;

  console.log("\tevent requests loaded");

  /**
   *   This request gets all the events in the database.
   *   arguments :
   *               none
   *   returns :
   *               an json array of events
   */
  app.get("/event", keycloak.protect("realm:user"), function(req, res) {
    Event.findAll({
      where: req.query
    }).then(events => {
      res.send({ events: events });
    });
  });

  /**
   *   This request create a new event with the name, description and start and end dates.
   *   arguments :
   *               name : a 255 characters maximum name for the event
   *               description : a text to describe quickly the event
   *               start_date : the starting date of the event
   *               end_date : the ending date of the event
   *              logo_url : the url for the logo of the event
   *   returns :
   *               a json object containing the created event
   */
  app.post("/event", keycloak.protect("realm:user_admin"), function(req, res) {
    Event.create(req.body)
      .then(event => {
        res.send({ event: event });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });

  /**
   *   This request uploads a photo for the event according to its id.
   *   arguments :
   *              file : the logo of the event in png or jpg
   *   returns :
   *               the updated object
   */
  app.put(
    "/event/photo/:id",
    keycloak.protect("realm:user_admin"),
    upload.single("file"),
    function(req, res) {
      const file = global.appRoot + "/uploads/event/" + req.file.filename;
      fs.rename(req.file.path, file, err => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          Event.update(
            {
              logo_url: req.file.filename
            },
            {
              where: {
                id: req.params.id
              }
            }
          )
            .then(() => {
              Event.findByPk(req.body.id)
                .then(event => {
                  res.send({ event: event });
                })
                .catch(err => {
                  res.status(500).send({ error: err });
                });
            })
            .catch(err => {
              res.status(500).send({ error: err });
            });
        }
      });
    }
  );

  /**
   *   This request updates the event according to its id.
   *   arguments :
   *               id : the id of the event
   *               name : the new name of the event
   *               description : the new description of the event
   *               start_date : the new starting date of the event
   *               end_date : the new end_date of the event
   *              logo_url : the url for the logo of the event
   *   returns :
   *               the updated object
   */
  app.put("/event", keycloak.protect("realm:user_admin"), function(req, res) {
    Event.update(req.body, {
      where: {
        id: req.body.id
      }
    })
      .then(() => {
        Event.findByPk(req.body.id)
          .then(event => {
            res.send({ event: event });
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
   *   This request delete an event according to its id.
   *   arguments :
   *               id : the id of the event
   *   returns :
   *               a result being 1 if succeeded, 0 else
   */
  app.delete("/event", keycloak.protect("realm:user_admin"), function(
    req,
    res
  ) {
    Event.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(event => {
        res.send({ result: event });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  });
};
