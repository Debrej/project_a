const express = require('express');
let router = express.Router();

router.get('/event', (req, res) => {
    res.render('create/event.ejs');
});

router.get('/location', (req, res) => {
    res.render('create/location.ejs');
});

module.exports = router;