const express = require('express');
const app = express();

app.get('/test', function(req, res){
    res.send({'status': 0, 'ans': 'This is the first request'});
});

app.listen(2424, function(){
    console.log('Server running on port 2424\n\nLoading requests...');

    require('./api_requests/activity')(app);
    require('./api_requests/activity_equipment')(app);
    require('./api_requests/activity_location')(app);
    require('./api_requests/assignment_equipment')(app);
    require('./api_requests/assignment_user')(app);
    require('./api_requests/availability')(app);
    require('./api_requests/comment')(app);
    require('./api_requests/equipment')(app);
    require('./api_requests/event')(app);
    require('./api_requests/location')(app);
    require('./api_requests/notification')(app);
    require('./api_requests/requirement')(app);
    require('./api_requests/shift')(app);
    require('./api_requests/specialty')(app);
    require('./api_requests/task')(app);
    require('./api_requests/task_equipment')(app);
    require('./api_requests/task_shift')(app);
    require('./api_requests/team')(app);
    require('./api_requests/user')(app);
    require('./api_requests/user_team')(app);

    console.log('Loading requests complete\n');
});