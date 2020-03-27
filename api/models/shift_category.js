module.exports = function(sequelize, Sequelize) {
  console.log("\tshift category model loaded");

  return sequelize.define(
    "shift_category",
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
