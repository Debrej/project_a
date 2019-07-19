module.exports = function(app, sequelize, models){

    console.log('\tcomment requests loaded');

    let Comment = models.CommentObject;

    /**
     *   This request gets all the comments in the database.
     *   arguments :
     *               none
     *   returns :
     *               an json array of comments
     */
    app.get('/comment', function(req, res){
        Comment.findAll().then(comments => {
            res.send({'comments': comments});
        });
    });

    /**
     *   This request gets a comment according to its id.
     *   arguments :
     *               id : the id of the comment
     *   returns :
     *               a json object containing the comment
     */
    app.get('/comment/:id', function(req, res){
        Comment.findByPk(req.params.id).then(comment => {
            res.send({'comment': comment});
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
    app.post('/comment', function(req, res){
        Comment.create({
            content: req.body.content,
            date: req.body.date,
            userId: req.body.user_id,
            activityId: req.body.activity_id,
            taskId: req.body.task_id
        }).then(comment => {
            res.send({'comment': comment});
        }).catch(err => {
            res.send({'error': err});
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
     *              a result being 1 if succeeded, 0 else
     */
    app.put('/comment/:id', function(req, res){
        Comment.update(
            {
                content: req.body.content,
                date: req.body.date,
                userId: req.body.user_id,
                activityId: req.body.activity_id,
                taskId: req.body.task_id
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
     *  This requests deletes a comment according to its id.
     *  arguments :
     *              id : the id of the comment
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */
    app.delete('/comment/:id', function(req, res){
        Comment.destroy({
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