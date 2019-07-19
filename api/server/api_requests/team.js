module.exports = function(app, sequelize, models){

    console.log('\tteam requests loaded');

    let Team = models.Team;

    /**
     *   This request gets all the teams in the database.
     *   arguments :
     *               none
     *   returns :
     *               an json array of teams
     */
    app.get('/team', function(req, res){
        Team.findAll().then(teams => {
            res.send({'team': teams});
        });
    });

    /**
     *   This request gets a team according to its id.
     *   arguments :
     *               id : the id of the team
     *   returns :
     *               a json object containing the team
     */
    app.get('/team/:id', function(req, res){
        Team.findByPk(req.params.id).then(team => {
            res.send({'team': team});
        });
    });

    /**
     *  This requests creates a new team with its name.
     *  arguments :
     *              name: the name of the team
     *
     *  returns :
     *              a json object containing the created team
     */
    app.post('/team', function(req, res){
        Team.create({
            name: req.body.name
        }).then(team => {
            res.send({'team': team});
        }).catch(err => {
            res.send({'error': err});
        });
    });

    /**
     *  This requests updates a team according to its id.
     *  arguments :
     *              id : the id of the team
     *              name: the name of the team
     *
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */
    app.put('/team/:id', function(req, res){
        Team.update(
            {
                name: req.body.name
            },{
                where: {
                    id: req.params.id
                }
            }
        ).then(result => {
            res.send({'result': result});
        }).catch(err => {
            res.send({'error': err});
        });
    });

    /**
     *  This requests deletes a team according to its id.
     *  arguments :
     *              id : the id of the team
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */
    app.delete('/team/:id', function(req, res){
        Team.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.send({'result': result});
        }).catch(err => {
            res.send({'error': err});
        });
    });
};