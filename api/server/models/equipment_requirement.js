module.exports = function(sequelize, Sequelize, Task, Activity, Equipment) {

    const Task_Equipment_Requirement = sequelize.define('task_equipment_requirement', {
        // attributes
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        // options
    });

    Task.hasMany(Task_Equipment_Requirement);
    Equipment.hasMany(Task_Equipment_Requirement);

    const Activity_Equipment_Requirement = sequelize.define('activity_equipment_requirement', {
        // attributes
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        // options
    });

    Activity.hasMany(Activity_Equipment_Requirement);
    Equipment.hasMany(Activity_Equipment_Requirement);

    return {'task_equipment': Task_Equipment_Requirement, 'activity_equipment': Activity_Equipment_Requirement};
};