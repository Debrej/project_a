//region SET UP

const express = require('express');
const Sequelize = require('sequelize');
const dateFormat = require('date-format');

const host = "localhost:2424";
const pwd_bd = require('./assets/json/pwd.json').pwd_project_a;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

//endregion

//region DATABASE CONNECTION

let sequelize = new Sequelize('project_a', 'project_a', pwd_bd, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

/*
*   Here we connect Sequelize to our database
*/
sequelize.authenticate()
    .then(() => {
        console.log("\nConnection successful with Sequelize\n");
    })
    .catch(err => {
       console.log("\nThere was an error during connection : \n"+err);
    });

//endregion

//region MIDDLEWARE

/*
*   This method will be invoked on every request we get. It allows us to log every requests we get with its origin.
*/
app.use(function(req, res, next){
    let log = "["+dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")+"] : "+req.method+" "+host+req.originalUrl+" FROM "+req.ip+"\n";
    console.log(log);
    next();
});

/*
*   This method will allow CORS
*/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:2445"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//endregion

//region SERVER START

console.log('\n\tPROJECT_A LOADING...\n\n');

console.log('Loading models...\n');
let models = require('./models/import')(sequelize, Sequelize); // we retrieve the different models in a json object we will pass to the requests
console.log('\nLoading models complete\n');

console.log('Loading requests...\n');
require('./api_requests/import')(app, sequelize, models, Sequelize); // we add all the requests for every model to the app
console.log('\nLoading requests complete\n');


/*
*   Syncing the database mean that if there was a table missing from the database that we could have added, it will add this table.
*   Once its done, we launch the server as we are ready to fulfill requests.
* */
sequelize.sync({ force: true })
    .then(() => {
        console.log("\nDatabase synced");
        app.listen(2424, function() {
            require('./populate')(sequelize, models);
            console.log('\n\tPROJECT_A LOADING COMPLETE');
            console.log('\nServer running on port 2424');
        });
    })
    .catch(err => {
        console.log("Error during syncing :\n"+err);
    });

//endregion