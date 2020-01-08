module.exports = function(app, sequelize, models){

    console.log('\tteam requests loaded');

    let Team = models.Team;

    //region GET REQUESTS

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
    app.get('/team/id/:id', function(req, res){
        Team.findByPk(req.params.id).then(team => {
            res.send({'team': team});
        });
    });

    /**
     * This request gets the members of a team.
     *  arguments :
     *              id_team: the id of the team
     *
     *  returns :
     *              an json array of users members of the team
     *
     */
    app.get('/team/members/:id_team', function(req, res){
        Team.findByPk(req.params.id_team).then(team => {
            team.getUsers().then(result => {
                res.send({"team_members": result});
            }).catch(err => {
                res.status(500).send({'error': err})
            });
        }).catch(err => {
            res.status(500).send({'error': err})
        });
    });

    //endregion

    //region POST REQUESTS

    /**
     *  This requests creates a new team with its name.
     *  arguments :
     *              name: the name of the team
     *              supervisor_id: the user id of the supervisor
     *
     *  returns :
     *              a json object containing the created team
     */
    app.post('/team', function(req, res){
        Team.create({
            name: req.body.name,
            supervisor_id: req.body.supervisor_id
        }).then(team => {
            res.send({'team': team});
        }).catch(err => {
            res.status(500).send({'error': err})
        });
    });

    //endregion

    //region PUT REQUESTS

    /**
     *  This requests updates a team according to its id.
     *  arguments :
     *              id : the id of the team
     *              name: the name of the team
     *              supervisor_id: the user id of the supervisor
     *
     *  returns :
     *              the updated object
     */
    app.put('/team/:id', function(req, res){
        Team.update(
            {
                name: req.body.name,
                supervisor_id: req.body.supervisor_id
            },{
                where: {
                    id: req.params.id
                }
            }
        ).then(() => {
            Team.findByPk(req.params.id)
                .then(team => {
                    res.send({'team': team});
                })
                .catch(err => {
                    res.status(500).send({'error': err})
                });
        }).catch(err => {
            res.status(500).send({'error': err})
        });
    });

    //endregion

    //region DELETE REQUESTS

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
            res.status(500).send({'error': err})
        });
    });

    //endregion
};