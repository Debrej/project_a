//region INITIALIZATION
const express = require('express');
const dateFormat = require('date-format');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

/*
*   This method will be invoked on every request we get. It allows us to log every requests we get with its origin.
*/
const host = "localhost:2445";
app.use(function(req, res, next){
    let log = "["+dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")+"] : "+req.method+" "+host+req.originalUrl+" FROM "+req.ip+"\n";
    console.log(log);
    next();
});

//endregion

//region EXPRESS SET UP

app.use('/css', express.static('public/stylesheet'));
app.use('/js', express.static('public/javascript'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//endregion

//region ROUTES

let indexRouter = require('./routes/index');

app.use('/', indexRouter);

//endregion

app.listen(2445, () => {
    console.log('\n\tPROJECT_A FRONT LOADING COMPLETE');
    console.log('\nServer running on port 2445');
});