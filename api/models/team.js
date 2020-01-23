module.exports = function(sequelize, Sequelize, User) {
  console.log("\tteam model loaded");

  const Team = sequelize.define(
    "team",
    {
      // attributes
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      confidence_level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      priority: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#888888"
      }
    },
    {
      underscored: true
    }
  );

  User.hasOne(Team, { foreignKey: "supervisor_id" });

  return Team;
};
