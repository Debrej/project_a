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
        // options
    });

    Equipment.belongsTo(Equipment_Type);

    Location.hasOne(Equipment, { foreignKey: 'pickup_location'});
    Location.hasOne(Equipment, { foreignKey: 'drop_location'});

    return Equipment;
};