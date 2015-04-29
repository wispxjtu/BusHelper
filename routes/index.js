var express = require('express');
var http = require('http');
var querystring = require('querystring');
var router = express.Router();

function getLine(callback){
  var data =querystring.stringify({
    idnum: '129·'
  });
  var req = http.request({
    host:"shanghaicity.openservice.kankanews.com",
    path: '/public/bus/get',
    method:'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
      'Content-Length': Buffer.byteLength(data)
    }
  }, function(res){
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log("body: " + chunk);
    });
    callback.call();
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.write(data);
  req.end();
}

/* GET home page. */
router.get('/', function(req, res, next) {
  getLine(function(){
    res.render('index', { title: 'Express' });
  })
});

module.exports = router;
