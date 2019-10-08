module.exports = function(sequelize, Sequelize, Task, Activity, Equipment) {

    const Task_Equipment_Requirement = sequelize.define('task_equipment_requirement', {
        // attributes
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true
    });

    Task.hasMany(Task_Equipment_Requirement, { foreignKey: 'task_id'});
    Equipment.hasMany(Task_Equipment_Requirement, { foreignKey: 'equipment_id'});

    const Activity_Equipment_Requirement = sequelize.define('activity_equipment_requirement', {
        // attributes
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true
    });

    Activity.hasMany(Activity_Equipment_Requirement, { foreignKey: 'activity_id'});
    Equipment.hasMany(Activity_Equipment_Requirement, { foreignKey: 'equipment_id'});

    return {'task_equipment': Task_Equipment_Requirement, 'activity_equipment': Activity_Equipment_Requirement};
};