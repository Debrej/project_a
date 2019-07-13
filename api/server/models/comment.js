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
        // options
    });

    User.hasOne(CommentObject);
    Activity.hasOne(CommentObject);
    Task.hasOne(CommentObject);

    return CommentObject;
};