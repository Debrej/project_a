module.exports = function(app, sequelize, models){

    require('./activity')(app, sequelize, models);
    require('./comment')(app, sequelize, models);
    require('./event')(app, sequelize, models);
    require('./shift')(app, sequelize, models);
    require('./location')(app, sequelize, models);
    require('./equipment')(app, sequelize, models);
    require('./notification')(app, sequelize, models);
    require('./specialty')(app, sequelize, models);
    require('./task')(app, sequelize, models);
    require('./team')(app, sequelize, models);
    require('./user')(app, sequelize, models);

    require('./activity_location')(app, sequelize, models);
    require('./requirement')(app, sequelize, models);
    require('./availability')(app, sequelize, models);
    require('./assignment_user')(app, sequelize, models);


    /*
    require('./activity_equipment')(app, sequelize, models);
    require('./assignment_equipment')(app, sequelize, models);

    require('./task_equipment')(app, sequelize, models);*/

};