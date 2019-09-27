module.exports = function(app, sequelize, models){

    let Event = models.Event;

    console.log('\tevent requests loaded');

    /**
    *   This request gets all the events in the database.
    *   arguments :
    *               none
    *   returns :
    *               an json array of events
    */
    app.get('/event', function(req, res){
        Event.findAll().then(events => {
            res.send({'events': events});
        });
    });

    /**
    *   This request gets an event according to its id.
    *   arguments :
    *               id : the id of the event
    *   returns :
    *               a json object containing the event
    */
    app.get('/event/:id', function(req, res){
       Event.findByPk(req.params.id).then(event => {
                res.send({'event': event});
            })
           .catch(err => {
                res.send({'error': err});
            });
    });

    /**
    *   This request create a new event with the name, description and start and end dates.
    *   arguments :
    *               name : a 255 characters maximum name for the event
    *               description : a text to describe quickly the event
    *               start_date : the starting date of the event
    *               end_date : the ending date of the event
    *   returns :
    *               a json object containing the created event
    */
    app.post('/event', function(req, res){
        Event.create({
                name: req.body.name,
                description: req.body.description,
                start_date: new Date(req.body.start_date),
                end_date: new Date(req.body.end_date)
            })
            .then(event => {
                res.send({'event': event});
            })
            .catch(err => {
                res.send({'error': err});
            });
    });

    /**
    *   This request updates the event according to its id.
    *   arguments :
    *               id : the id of the event
    *               name : the new name of the event
    *               description : the new description of the event
    *               start_date : the new starting date of the event
    *               end_date : the new end_date of the event
    *   returns :
    *               the updated object
    */
    app.put('/event/:id', function(req, res){
        Event.update(
            {
                name: req.body.name,
                description: req.body.description,
                start_date: new Date(req.body.start_date),
                end_date: new Date(req.body.end_date)
            },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                Event.findByPk(req.params.id)
                    .then(event => {
                        res.send({'event': event});
                    })
                    .catch(err => {
                        res.send({'error': err});
                    });
            })
            .catch(err => {
                res.send({'error': err});
            });
    });


    /**
    *   This request delete an event according to its id.
    *   arguments :
    *               id : the id of the event
    *   returns :
    *               a result being 1 if succeeded, 0 else
    */
    app.delete('/event/:id', function(req, res){
        Event.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(event => {
                res.send({'result': event});
            })
            .catch(err => {
                res.send({'error': err});
            });
    });
};