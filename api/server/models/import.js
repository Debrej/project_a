module.exports = function(sequelize, Sequelize){
    let db = {};

    db.Specialty = require('./specialty')(sequelize, Sequelize);
    db.User = require('./user')(sequelize, Sequelize, db.Specialty);
    db.Team = require('./team')(sequelize, Sequelize, db.User);
    db.Notification = require('./notification')(sequelize, Sequelize, db.User, db.Team);

    db.Location = require('./location')(sequelize, Sequelize);
    db.Event = require('./event')(sequelize, Sequelize);
    db.Activity = require('./activity')(sequelize, Sequelize, db.User, db.Event);
    db.Task = require('./task')(sequelize, Sequelize, db.User, db.Activity, db.Location, db.Team);
    db.CommentObject = require('./comment')(sequelize, Sequelize, db.User, db.Activity, db.Task);

    db.Equipment_Type = require('./equipment_type')(sequelize, Sequelize);
    db.Equipment = require('./equipment')(sequelize, Sequelize, db.Equipment_Type, db.Location);

    db.Shift_Category = require('./shift_category')(sequelize, Sequelize);
    db.Shift = require('./shift')(sequelize, Sequelize, db.Shift_Category);

    /**
     * Creation of table availability which represents which shifts a user is available on
     */

    db.Availability = require('./availability')(sequelize, Sequelize, db.Shift, db.User);

    db.User_Requirement = require('./user_requirement')(sequelize, Sequelize, db.User, db.Team, db.Task, db.Shift);

    db.User_Assigment = require('./user_assignment')(sequelize, Sequelize, db.User, db.Availability);

    db.Equipment_Requirement = require('./equipment_requirement')(sequelize, Sequelize, db.Task, db.Activity, db.Equipment, db.Shift);

    db.Equipment_Assignment = require('./equipment_assignment')(sequelize, Sequelize, db.Equipment_Requirement);

    /**
     * Table user_team which represents in which teams users are
     */
    db.User.belongsToMany(db.Team, {through: 'user_team'});
    db.Team.belongsToMany(db.User, {through: 'user_team'});

    /**
     * Table friend which represents friendship between users
     */
    db.Friendship = require('./friendship')(sequelize, Sequelize, db.User);

    /**
     * Table activity_location which represents on which location(s) activities are located
     */
    db.Activity.belongsToMany(db.Location, {through: 'activity_location'});
    db.Location.belongsToMany(db.Activity, {through: 'activity_location'});

    return db;
};