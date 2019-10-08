module.exports = function(sequelize, Sequelize, User, Activity, Task) {

    console.log('\tcomment model loaded');

    const CommentObject = sequelize.define('comment_object', {
        // attributes
        content: {
            type: Sequelize.TEXT('medium'),
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        underscored: true
    });

    User.hasOne(CommentObject, { foreignKey: 'user_id'});
    Activity.hasOne(CommentObject, { foreignKey: 'activity_id'});
    Task.hasOne(CommentObject, { foreignKey: 'task_id'});

    return CommentObject;
};