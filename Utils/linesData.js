/**
 * Created by wisp on 2015/5/1.
 */
var http = require('http');
var querystring = require('querystring');
var fs = require('fs');

var linesFileName = 'linesData.txt';
function getSid(line, callback, failCallback) {
    var data = querystring.stringify({
        idnum: line
    });
    var req = http.request({
        host: "shanghaicity.openservice.kankanews.com",
        path: '/public/bus/get',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
            'Content-Length': Buffer.byteLength(data)
        }
    }, function (res) {
        var bodyText = "";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            bodyText += chunk;
            console.log(bodyText);
        });
        res.on('end', function () {
            var body;
            try {
                body = JSON.parse(bodyText);
            }
            catch(e) { console.error(e.message); }
            if (body && body.sid){
                console.log('get sid ' + body.sid + 'for line ' + line);
                callback(body.sid);
            }
            else{
                console.error('get sid failed for line ' + line);
                failCallback();
            }
        });
    });

    req.on('error', function(e) {
        console.error('problem with request: ' + e.message);
    });
    req.write(data);
    req.end();
}
var o = {
    initialized: false,
    lines: ['01路','04路','1001路','1002路','1003路','1004路','1005路','1006路','1007路','1008路','1009路','100路','1010路','1011路','1012路','1013路','1015路','1016路','1017路','1018路','1019路','101路','1020路','1021路','1022路','1023路','1024路','1025路','1026路','1027路','1028路','1029路','102路','1030路','1031路','1032路','1033路','1034路','1035路','1036路','1037路','1038路','1039路','103路','1040路','1041路','1042路','1043路','1045路','1046路','1047路','1048路','1049路','104路','1050路','1051路','1052路','1053路','1054路','1055路','1056路','1057路','1058路','1059路','105路','1060路','1061路','1062路','1063路','1065路','1066路','1067路','1068路','1069路','106路','1070路','1071路','1072路','1073路','1074路','1075路','1076路','1077路','1078路','1079路','107路','1080路','1081路','1082路','1084路','1085路','1086路','1087路','1088路','1089路','108路','1090路','1091路','1092路','1093路','1094路','1095路','1096路','1097路','1098路','1099路','109路','1100路','1101路','1102路','110路','1111路','111路','112路','112区间','113路','115路','116B','116路','117路','118路','119路','11路','1201路','1202路','1203路','1204路','1205路','1206路','1207路','1208路','1209路','120路','1210路','1212路','1215路','1217路','1218路','1219路','121路','1220路','1221路','1222路','1223路','1228路','122路','123路','123区间','124路','127路','129路','130路','131路','132路','133路','134路','135路','136路','137路','138路','139路','13路','13区间','140路','141路','142路','144路','145路','146路','147路','149路','14路','150路','151路','152路','155路','157路','158路','159路','15路','1600路','1601路','1602路','1603路','1604路','1605路','160路','1611路','161路','162路','163路','164路','1650路','1651路','165路','166路','167路','168路','169路','1701路','170路','1711路','171路','1721路','172路','1731路','173路','174路','175路','177路','178路','179路','17路','180路','180区间','181路','182路','183路','184路','185路','187路','188路','189路','189区间','18路','190路','197路','198路','19路','205路','206路','20路','210路','216路','218路','219路','21路','220路','222路','224路','22路','23路','24路','252路','253路','257路','25路','26路','28路','309路','313路','314路','319路','323路','327路','338路','33路','340路','36路','37路','405路','406路','40路','41路','42路','43路','44路','451路','453路','454路','455路','45路','46路','46路区间','47路','48路','49路','502路','508路','50路','50路区间','510路','518路','519路','51路','51路区间','522路','527路','528路','52路','537路','538路','547路','548路','54路','551路','552路','554路','559路','55路','561路','56路','572路','572路区间','573路','576路','577路','57路','581路','583路','58路','597路','59路','604路','607路','609路','60路','610路','611路','614路','615路','61路','624路','627路','628路','629路','62路','630路','632路','636路','636路区间','638路','639路','63路','640路','64路','65路','66路','66区间','67路','68路','69路','6路','700路','701路','702路','703B路','703路','704B路','704路','705路','707路','708路','709路','70路','711路','712路','713路','714路','715路','716路','717路','718路','719路','71路','720路','721路','722路','723路','724路','725路','726路','727路','728路','729路','72路','730路','731路','732路','733路','734路','735路','736路','737路','738路','739路','740路','741路','742路','743路','744路','745路','746路','747路','748路','749路','74路','74路区间','750路','751路','752路','753路','754路','755路','757路','758路','759路','760路','761路','762路','763路','764路','765路','766路','767路','768路','76路','770路','772路','774路','775路','776路','777路','778路','779路','780路','781路','782路','783路','784路','785路','786路','787路','789路','78路','790路','791路','792路','793路','794路','795路','796路','798路','799路','79路','803路','804路','805路','807路','808路','809路','80路','810路','812路','813路','815路','817路','818路','819路','81路','820路','823路','824路','825路','827路','828路','82路','830路','831路','836路','837路','838路','839路','839路区间','83路','840路','841路','842路','843路','845路','846路','849路','84路','850路','853路','855路','856路','858路','859路','85路','862路','863路','864路','867路','868路','869路','870路','871路','87路','88路','89路','8路','909路','90路','911路','911路区间','912路','915路','91路','920路','921路','923路','925路','926路','927路','929路','92B路','92路','930路','931路','932路','933路','934路','935路','936路','937路','939路','93路','941路','942路','944路','946路','947路','948路','94路','950路','951路','952B','952路','955路','958路','959路','95路','95路区间','960路','961路','962路','963路','966路','969路','96路','970路','971路','973路','974路','975路','976路','977路','978路','97路','980路','981路','983路','984路','985路','986路','986路区间','987路','988路','989路','98路','990路','991路','991路区间','992路','993路','995路','99路','宝山10路','宝山11路','宝山12路','宝山13路','宝山14路','宝山15路','宝山16路','宝山17路','宝山18路','宝山19路','宝山1路','宝山20路','宝山21路','宝山22路','宝山23路','宝山25路','宝山2路','宝山3路','宝山4路','宝山5路','宝山6路','宝山7路','宝山81路','宝山82路','宝山83路','宝山84路','宝山85路','宝山86路','宝山87路','宝山88路','宝山89路','宝山8路','宝山9路','堡陈北线','堡陈中线','堡陈专线','堡红线','堡进线','堡七线','堡胜专线','堡四线','北安跨线','北安区间','北安线','北蔡1路','北蔡2路','北嘉线','蔡陆专线','曹路1路','曹路2路','曹路3路','曹路4路','漕泾一路','长南线','长兴1路','长兴2路','长兴3路','长兴4路','长征1路','陈白线','陈凤线','陈凤线区间','陈前线','城桥1路','崇明东滩1路','崇明东滩2路','崇明乡村10路','崇明乡村11路','崇明乡村1路','崇明乡村2路','崇明乡村3路','崇明乡村4路','崇明乡村5路','崇明乡村6路','崇明乡村7路','崇明乡村9路','川白线','川奉专线','川芦专线','川三线','川沙2路','川沙3路','川沙4路','川沙5路','大桥六线','大桥三线','大桥四线','大桥五线','大桥一线','大团2路','枫泾7路','枫梅线','枫戚快线','奉卫线','港新线','高川专线','古美环线','航泥专线','航头3路','合庆1路','合庆2路','鹤莘线','横沙1路','横沙2路','横新线','虹桥枢纽1路','虹桥枢纽4路','虹桥枢纽7路','沪川线','沪南线','沪松专线','沪唐专线','花木1路','花木2路','惠南10路','惠南11路','惠南1路','惠南2路','惠南3路','惠南4路','惠南5路','惠南6路','惠南8路','机场八线','机场七线','江川3路','江南专线','金漕线','金枫线','金桥1路','金山1路','金山2路','金山3路','金山4路','金山5路','金山6路','金山7路','金山8路','金山9路','金山工业区二路','金山工业区一路','金山卫二路','金山卫一路','金石线','金张卫支线','老港1路','两滨专线','六灶2路','龙大专线','龙东专线','龙港快线','龙惠专线','龙临专线','龙芦专线','龙新芦专线','芦潮港1路','芦杜专线','陆家嘴金融城1路','陆家嘴金融城2路','陆家嘴金融城3路','陆家嘴金融城4路','马莘专线','闵东线','闵红线','闵马线','闵吴线','闵莘线','闵行16路','闵行1路','闵行20路','闵行22路','南堡支线','南堡专线','南川线','南东专线','南风线','南海二线','南海线','南红专线','南建专线','南江专线','南金线','南科快线','南隆专线','南闵专线','南南线','南牛线','南七线','南同专线','南卫线','南新专线','南新专线（崇明）','南裕专线','南园1路','南跃线','泥城1路','泥城2路','泥城4路','泥城5路','浦东10路','浦东11路','浦东12路','浦东13路','浦东15路','浦东17路','浦东18路','浦东19路','浦东1路','浦东20路','浦东21路','浦东22路','浦东24路','浦东25路','浦东26路','浦东27路','浦东29路','浦东2路','浦东30路','浦东31路','浦东32路','浦东33路','浦东35路','浦东3路','浦东4路','浦东6路','浦东7路','浦东8路','浦东9路','浦江11路','浦江1路','浦江2路','浦江3路','浦江4路','浦江5路','浦江6路','浦江7路','浦卫线','浦卫专线','七宝1路','青枫专线','三林1路','山阳二路','山阳二路工业区','山阳一路','山阳一路区间','上川专线','上嘉线','上佘定班线','上石线','申崇二线','申崇六线','申崇六线B','申崇六线B(崇明巴士)','申崇三线','申崇三线区间','申崇四线','申崇五线','申崇五线班车','申崇一线','申川专线','申方专线','申港1路','申港3路','施崂专线','石漕线','石川专线','石枫专线','石胡专线','石化三线','石化一线','石梅线','石南专线','石青专线','书院2路','书院3路','松江12路','松闵线','松亭石专线','松卫线','松卫专线','松新枫线','淞马专线','隧道八线','隧道二线','隧道九线','隧道六线','隧道三线','隧道一线','孙桥1路','塘南专线','塘卫线','亭林三路','外高桥1路','外高桥2路','外高桥3路','外高桥4路','万周专线','翔安专线','莘车线','莘荷线','莘金专线','莘庄1路','莘庄2路','莘庄3路','新场1路','新场2路','新场3路','新场5路','新川专线','新泾1路','新芦专线','徐川专线','徐闵线','徐闵夜宵专线','宣桥1路','洋山专线','洋山专线区间','张江1路','张江1路区间','张江环线','张南专线','张堰二路','张堰一路','周康10路','周康1路','周康2路','周康3路','周康4路','周康5路','周康6路','周康8路','周康9路','周南线','朱泾五路','朱钱卫线','朱松线','朱卫线','朱卫专线','祝桥1路','祝桥2路','祝桥3路','横长线','401路','南桥2路','闵行11路','练塘5路','南桥6路','莘松B线','青徐线区间'],
    //lines: ['01路','04路','1001路','1002路','1003路','1004路','1005路','1006路','1007路','1008路','1009路','100路','1010路','1011路','1012路','1013路'],
    sids:{},
    getAllLinesData: function(callback){
        var self = this;
        function getLineDataBatch(){
            var cnt = 0;
            for(var i=0; i< self.lines.length; i++){
                var line = self.lines[i];
                if (self.sids[line] === undefined) {
                    console.log(line + ' check, no sid,  '  + self.sids[line]);
                    (function(line) {
                        getSid(line, function (sid) {
                            self.sids[line] = sid;
                        }, function(){
                            self.sids[line] = null;
                        });
                    })(line);
                    if (++cnt >= 20){
                        break;
                    }
                }
            }
            if (cnt === 0) {
                if (timer)
                    clearTimeout(timer);
                console.log("get lines data complete, write it to file");
                fs.writeFile(linesFileName, JSON.stringify(self.sids), function(err){
                    if (err)
                        console.error('write linesData to file failed');
                    else
                        console.log('write linesData to file succeeded');
                });
                if (callback instanceof Function) {
                    callback();
                }
            }
        }
        var timer = setInterval(getLineDataBatch, 2000);
    },

    init: function(callback){
        o.initialized = true;
        var self = this;
        fs.readFile(linesFileName, {encoding: 'utf8'}, function (err, data) {
            if (err) {
                console.error('Cannot read lines data from file: ' + err);
                self.getAllLinesData(callback);
            }
            else {
                console.log('get lines data from file succeeded.');
                self.sids = JSON.parse(data);
                if (callback instanceof Function) {
                    callback();
                }
            }
        });
    }
};
if (!o.initialized){
    o.init();
}
module.exports = o;