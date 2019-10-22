module.exports = function(sequelize, Sequelize, Task, Activity, Equipment, Shift) {

    const Equipment_Requirement = sequelize.define('equipment_requirement', {
        // attributes
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true
    });

    Task.hasMany(Equipment_Requirement, { foreignKey: 'task_id' });
    Activity.hasMany(Equipment_Requirement, { foreignKey: 'activity_id'});
    Equipment.hasMany(Equipment_Requirement, { foreignKey: 'equipment_id'});
    Shift.hasMany(Equipment_Requirement, { foreignKey: 'shift_id'});

    return Equipment_Requirement;
};