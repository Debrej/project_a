module.exports = function(sequelize, Sequelize, Equipment_Requirement) {

    const Equipment_Assignment = sequelize.define('equipment_assignment', {
        // attributes
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true
    });

    Equipment_Requirement.hasMany(Equipment_Assignment, { foreignKey: 'equipment_requirement_id' });

    return Equipment_Assignment;
};