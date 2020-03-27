module.exports = function(sequelize, Sequelize) {
  console.log("\tspecialty model loaded");

  return sequelize.define(
    "specialty",
    {
      // attributes
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER
      }
    },
    {
      underscored: true
    }
  );
};
