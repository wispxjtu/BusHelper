/**
 * Created by wisp on 2015/5/2.
 */
var express = require('express');
var http = require('http');
var querystring = require('querystring');
var linesData = require('../Utils/linesData');
var router = express.Router();

var stopInfoArray = [];
function getStop(line, stop, direction, callback){
    var reqStopData = querystring.stringify({ stoptype:direction,stopid:stop,sid:linesData.sids[line] });
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
        var stopInfo;
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
            stopInfoArray.push({line: line, stopInfo: stopInfo});
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

router.get('/', function(req, res, next) {
    getStop("129路", "12.", "0", function(){
        getStop("106路", "10.", "0", function() {
            //res.setHeader('Content-Type', 'application/json; charset=utf-8');
            //res.write(JSON.stringify({status: stopInfoArray}));
            //res.end();
            res.render('index', { title: '上海公交助手', status: stopInfoArray});
        })
    });
    //next();
});
module.exports = router;