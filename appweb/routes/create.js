const express = require('express');
let router = express.Router();

router.get('/event', (req, res) => {
    res.render('create/event.ejs');
});

module.exports = router;