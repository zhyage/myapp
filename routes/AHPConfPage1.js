var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
    res.sendfile('./views/AHPConfPage1.html');
    //res.sendfile('./views/bootstrap.html');
});

module.exports = router;