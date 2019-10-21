module.exports = function(app, sequelize, models){

    console.log('\tshift_task requests loaded');

    let Task = models.Task;
    let Shift = models.Shift;

    /**
     *   This request gets all the shifts for a specific task
     *   arguments :
     *               task_id: the id of the task
     *   returns :
     *               a json array of shifts
     */
    app.get('/shift_task/:task_id', function(req, res){
        Task.findByPk(req.params.task_id)
            .then(task => {
                task.getShifts()
                    .then(ret => {
                        res.send({'shifts': ret});
                    })
                    .catch(err => {
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });

    /**
     *  This request gets all the tasks on a specific shift
     *  arguments:
     *              shift_id: the id of the shift
     *  returns:
     *              a json array of tasks
     */
    app.get('/shift_task/shift/:shift_id', function(req, res) {
        Shift.findByPk(req.params.shift_id)
            .then(shift => {
                shift.getTasks()
                    .then(tasks => {
                        res.send({'tasks': tasks});
                    })
                    .catch(err => {
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });


    /**
     *  This request adds an array of shifts to the task.
     *  arguments:
     *              task_id: the id of the task
     *              shift_ids: the array of shifts
     *  returns:
     *              a json array of shifts
     */
    app.post('/shift_task/:task_id', function(req, res){
        Task.findByPk(req.params.task_id)
            .then(task => {
                task.addShifts(req.body.shift_ids)
                    .then(ret => {
                        res.send({'task': ret});
                    })
                    .catch(err => {
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });

    });

    /**
     *  This request updates the shifts of a task
     *  arguments:
     *              task_id: the id of the task
     *              shift_ids: the array of shifts
     *  returns:
     *              a json array of shifts
     */
    app.put('/shift_task/:task_id', function(req, res){
        Task.findByPk(req.params.task_id)
            .then(task => {
                task.setShifts(req.body.shift_ids)
                    .then(() => {
                        task.getShifts()
                            .then(ret => {
                                res.send({'shifts': ret});
                            })
                            .catch(err => {
                                res.status(500).send({'error': err});
                            });
                    })
                    .catch(err => {
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });

    /**
     *  This request deletes the specified shifts from a task
     *  arguments:
     *              task_id: the id of the task
     *              shift_ids: the array of shifts
     *  returns:
     *              a json array of shifts
     */
    app.delete('/shift_task/:task_id', function(req, res){
        Task.findByPk(req.params.task_id)
            .then(task => {
                task.removeShifts(req.body.shift_ids)
                    .then(() => {
                        task.getShifts()
                            .then(ret => {
                                res.send({'result': ret});
                            })
                            .catch(err => {
                                res.status(500).send({'error': err});
                            });
                    })
                    .catch(err => {
                        res.status(500).send({'error': err});
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err});
            });
    });
};