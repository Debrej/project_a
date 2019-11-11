const express = require('express');
let router = express.Router();

router.get('/activity', (req, res) => {
    res.render('create/activity.ejs');
});

router.get('/equipment', (req, res) => {
    res.render('create/equipment.ejs');
});

router.get('/event', (req, res) => {
    res.render('create/event.ejs');
});

router.get('/location', (req, res) => {
    res.render('create/location.ejs');
});

router.get('/task', (req, res) => {
    res.render('create/task.ejs');
});

module.exports = router;