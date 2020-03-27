module.exports = function(sequelize, Sequelize, User, Event) {
  console.log("\tactivity model loaded");

  const Activity = sequelize.define(
    "activity",
    {
      // attributes
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT("medium")
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      contractor_name: {
        type: Sequelize.STRING
      },
      contractor_phone: {
        type: Sequelize.STRING
      },
      contractor_mail: {
        type: Sequelize.STRING
      },
      contractor_comment: {
        type: Sequelize.STRING
      },
      contractor_present_on_event: {
        type: Sequelize.STRING
      }
    },
    {
      underscored: true
    }
  );

  User.hasOne(Activity, { foreignKey: "supervisor_id" });

  Activity.belongsTo(Event, { foreignKey: "event_id" });

  return Activity;
};
