module.exports = function(sequelize, Sequelize, Equipment_Type, Location) {

    console.log('\tequipment model loaded');

    const Equipment = sequelize.define('equipment', {
        // attributes
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT('medium')
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true
    });

    Equipment.belongsTo(Equipment_Type, { foreignKey: 'equipment_type_id'});

    Location.hasOne(Equipment, { foreignKey: 'pickup_location'});
    Location.hasOne(Equipment, { foreignKey: 'drop_location'});

    return Equipment;
};