module.exports = function(sequelize, Sequelize) {
  console.log("\tequipment type model loaded");

  return sequelize.define(
    "equipment_type",
    {
      // attributes
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      underscored: true
    }
  );
};
