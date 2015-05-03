var express = require('express');
var http = require('http');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    //getStop("129路", "12.", "0", function(){
    //    res.render('index', { title: '上海公交助手', status: stopInfo});
    //});
    res.render('index', { title: '上海公交助手'});
    //res.end("welcome to bus helper");
    //next();
});

module.exports = router;
