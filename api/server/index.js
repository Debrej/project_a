//region SET UP

const express = require('express');
const mysql = require('mysql');
const dateFormat = require('date-format');

const host = "localhost:2424";
const pwd_bd = require('./assets/json/pwd.json').pwd_project_a;

const app = express();

//endregion

//region DATABASE CONNECTION

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'project_a',
    database: 'project_a',
    password: pwd_bd
});

connection.connect();

connection.query('SELECT 1 + 1 AS status', function(err, rows, fields) {
    if (err) {console.log("ERROR WHEN CONNECTING");}
    else{
        console.log('Connection to DB acquired\n');
    }
});

//endregion

//region MIDDLEWARE

app.use(function(req, res, next){
    let log = "["+dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")+"] : "+req.method+" "+host+req.originalUrl+" FROM "+req.ip+"\n";
    console.log(log);
    next();
});

//endregion

//region SERVER START

app.listen(2424, function(){
    console.log('Server running on port 2424\n\nLoading requests...');

    require('./api_requests/activity')(app, connection);
    require('./api_requests/activity_equipment')(app, connection);
    require('./api_requests/activity_location')(app, connection);
    require('./api_requests/assignment_equipment')(app, connection);
    require('./api_requests/assignment_user')(app, connection);
    require('./api_requests/availability')(app, connection);
    require('./api_requests/comment')(app, connection);
    require('./api_requests/equipment')(app, connection);
    require('./api_requests/event')(app, connection);
    require('./api_requests/location')(app, connection);
    require('./api_requests/notification')(app, connection);
    require('./api_requests/requirement')(app, connection);
    require('./api_requests/shift')(app, connection);
    require('./api_requests/specialty')(app, connection);
    require('./api_requests/task')(app, connection);
    require('./api_requests/task_equipment')(app, connection);
    require('./api_requests/task_shift')(app, connection);
    require('./api_requests/team')(app, connection);
    require('./api_requests/user')(app, connection);
    require('./api_requests/user_team')(app, connection);

    console.log('Loading requests complete\n');
});

//endregion