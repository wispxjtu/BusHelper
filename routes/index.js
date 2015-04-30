var express = require('express');
var http = require('http');
var querystring = require('querystring');
var router = express.Router();

var sid="";
var stopInfo = "";
function getLine(callback){
    var data =querystring.stringify({
        idnum: '129路'
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
        var bodyText = "";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            bodyText += chunk;
            console.log("body: " + chunk);
        });
        res.on('end', function(){
            var body = JSON.parse(bodyText);
            sid = body.sid;
            console.log(sid);
            getStop(callback);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    req.write(data);
    req.end();
}

function getStop(callback){
    var reqStopData = querystring.stringify({ stoptype:0,stopid:"12.",sid:sid });
    var reqStop = http.request({
        host:"shanghaicity.openservice.kankanews.com",
        path: '/public/bus/Getstop',
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
            'Content-Length': Buffer.byteLength(reqStopData)
        }
    }, function(resStop){
        var stopInfoText = "";
        resStop.setEncoding('utf8');
        resStop.on('data', function (chunk) {
            stopInfoText += chunk;
            console.log("stopInfoText: " + chunk);
        });
        resStop.on('end', function(){
            var dataall = JSON.parse(stopInfoText);
            var data = dataall[0] || dataall;

            if(typeof(data)=="undefined"){
                stopInfo = '等待发车';
            }
            else if((typeof(data.error) != "undefined") && (data.error!='')){
                if(data.error=='-2' || data=="undefined"){
                    stopInfo = '等待发车';
                }else{
                    alert('error');
                    return false;
                }
            }
            else if(typeof(data.time)=="undefined"){
                stopInfo = '等待发车';
            }
            else{
                //alert(data);
                var tx = data.time;
                if(tx.indexOf("分钟")>0){
                    stopInfo = data.terminal+' 还有'+data.stopdis+'站, 约'+data.time;
                }else{
                    stopInfo = data.terminal+' 还有'+data.stopdis+'站, 约'+Math.ceil(data.time/60)+'分钟';
                }
            }
            callback.call();
            console.log("end");
        });
    });

    reqStop.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    reqStop.write(reqStopData);
    reqStop.end();
}


/* GET home page. */
router.get('/', function(req, res, next) {
    getLine(function(){
        res.render('index', { title: 'Express', status: stopInfo});
    });
    //next();
});

module.exports = router;
