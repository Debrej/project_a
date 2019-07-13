module.exports = function(app, sequelize, models){
    /*require('./activity')(app, sequelize, Sequelize);
    require('./activity_equipment')(app, sequelize, Sequelize);
    require('./activity_location')(app, sequelize, Sequelize);
    require('./assignment_equipment')(app, sequelize, Sequelize);
    require('./assignment_user')(app, sequelize, Sequelize);
    require('./availability')(app, sequelize, Sequelize);
    require('./comment')(app, sequelize, Sequelize);
    require('./equipment')(app, sequelize, Sequelize);*/

    require('./event')(app, sequelize, models);

    /*require('./location')(app, sequelize, Sequelize);
    require('./notification')(app, sequelize, Sequelize);
    require('./requirement')(app, sequelize, Sequelize);
    require('./shift')(app, sequelize, Sequelize);
    require('./specialty')(app, sequelize, Sequelize);
    require('./task')(app, sequelize, Sequelize);
    require('./task_equipment')(app, sequelize, Sequelize);
    require('./task_shift')(app, sequelize, Sequelize);
    require('./team')(app, sequelize, Sequelize);
    require('./user')(app, sequelize, Sequelize);
    require('./user_team')(app, sequelize, Sequelize);*/
};