var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.body)
    res.send('1234');
});

module.exports = router;