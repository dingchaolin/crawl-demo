var request = require( 'request' );
var fs = require( 'fs' );
var cheerio = require('cheerio');
var iconv = require("iconv-lite");
var Encrypt = require( './encrypt.js');
var fMcM3 = "pdcss123";
var TjXjbs4 = "css11q1a";
var fEAI5 = "co1qacq11";
var mm = "363101";//密码明文
var bh = "6217000010068552267";//账号明文
var mmE = Encrypt(mm, fMcM3, TjXjbs4, fEAI5);//密码密文
var bhE = Encrypt(bh, fMcM3, TjXjbs4, fEAI5);//账号密文


var data = {
    lk:0,//请求之前获取
    lb:5,//固定值
    bh:bhE,
    mm:mmE,
    gjjcxjjmyhpppp:'',
    bh5:bh,
    mm5:mm,
    gjjcxjjmyhpppp5:'',
    bh2:'',
    mm2:'',
    gjjcxjjmyhpppp2:'',
    bh1:'',
    mm1:'',
    gjjcxjjmyhpppp1:'',
    bh3:'',
    mm3:'',
    gjjcxjjmyhpppp3:'',
    bh4:'',
    mm4:'',
    gjjcxjjmyhpppp4:''
}

var urlLogin = 'http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-login.jsp' ;
var urlFaviocon = 'http://www.bjgjj.gov.cn/favicon.ico' ;
var cookie = "";

var headersLogin = {
        "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Encoding":"gzip, deflate, sdch",
        "Accept-Language":"zh-CN,zh;q=0.8",
        "Connection":"keep-alive",
        "Host":"www.bjgjj.gov.cn",
        "Upgrade-Insecure-Requests":"1",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
};

var optionsLogin = {
    url: urlLogin,
    method: 'GET',
    headers: headersLogin,
}
//####################################
// 登陆首页
//#####################################
request(optionsLogin, function (err0, httpResponse0, body0) {

    //console.log( httpResponse0.headers);
    cookie = httpResponse0.headers['set-cookie'].toString();
    cookie = cookie.substring( 0, cookie.indexOf('; ') );

    var headersFaviocon = {
        "Accept":"image/webp,image/*,*/*;q=0.8",
        "Accept-Encoding":"gzip, deflate, sdch",
        "Accept-Language":"zh-CN,zh;q=0.8",
        "Connection":"keep-alive",
        "Host":"www.bjgjj.gov.cn",
        "Referer":"http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-login.jsp", "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
    };

    var optionsFaviocon = {
        url: urlLogin,
        method: 'GET',
        headers: headersFaviocon,
    }
//####################################
// Faviocon
//#####################################
    request( urlFaviocon, function( err1, httpResponse1, body1){
        //console.log( httpResponse1.headers);
        var cookie1 = httpResponse1.headers['set-cookie'].toString();
        cookie1 = cookie1.substring( 0, cookie1.indexOf('; ') );
        cookie += "; " + cookie1;
        console.log( "cookie=" + cookie );
        // 到此处cookie获取完成

//####################################
// 获取验证图片
//#####################################
        var urlImg = 'http://www.bjgjj.gov.cn/wsyw/servlet/PicCheckCode1?v='+ new Date();
        console.log( urlImg )
        var headersImg = {
            "Accept":"image/webp,image/*,*/*;q=0.8",
            "Accept-Encoding":"gzip, deflate, sdch",
            "Accept-Language":"zh-CN,zh;q=0.8",
            "Connection":"keep-alive",
            "Cookie":cookie,
            "Host":"www.bjgjj.gov.cn",
            "Referer":"http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-login.jsp",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
    };

        var optionsImg = {
            url: urlImg,
            method: 'GET',
            headers: headersImg,
        }
        request(optionsImg).pipe(fs.createWriteStream('./checkImg.png'))
        //###########################################
        // 将验证码输如到控制台
        //###########################################
        process.stdin.setEncoding('utf8');

        process.stdin.on('readable', () => {
            var chunk = process.stdin.read();
            if (chunk !== null) {
               //process.stdout.write(`data: ${chunk}`);
                var code = chunk.replace( /\n/i,"" );
                data.gjjcxjjmyhpppp = code;
                data.gjjcxjjmyhpppp5 = code;

                //#################################
                // 获取lk
                //#################################
                var lkUrl = 'http://www.bjgjj.gov.cn/wsyw/wscx/asdwqnasmdnams.jsp';
                var lkHeaders = {
                    "Accept":"*/*",
                    "Accept-Encoding":"gzip, deflate",
                    "Accept-Language":"zh-CN,zh;q=0.8",
                    "Connection":"keep-alive",
                    "Content-Length":0,
                    "Content-Type":"text/html;",
                    "Cookie":cookie,
                    "Host":"www.bjgjj.gov.cn",
                    "Origin":"http://www.bjgjj.gov.cn",
                    "Referer":"http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-login.jsp",
                    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
                }
                var lkOptions = {
                    url: lkUrl,
                    method: 'GET',
                    headers: lkHeaders

                };

                request(lkOptions, function (err, httpResponse, body) {
                    var lk = body.trim();
                    lk = lk.substring(4, lk.length);
                    data.lk = lk;

                    //#################################
                    // 请求用户信息中转页
                    //#################################
                    var urlChoice = "http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-choice.jsp"
                    var headers =
                    {
                        "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                        "Accept-Encoding":"gzip, deflate",
                        "Accept-Language":"zh-CN,zh;q=0.8",
                        "Cache-Control":"max-age=0",
                        "Connection":"keep-alive",
                        //Content-Length:494
                        "Content-Type":"application/x-www-form-urlencoded",
                        "Cookie":cookie,
                        "Host":"www.bjgjj.gov.cn",
                        "Origin":"http://www.bjgjj.gov.cn",
                        "Referer":"http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-login.jsp",
                        "Upgrade-Insecure-Requests":"1",
                        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
                    }
                    var options = {
                        url: urlChoice,
                        method: 'POST',
                        encoding:null,
                        headers: headers,
                        json: true,
                        form: data
                    }
                    //console.log( options );
                    request(options, function (err, httpResponse, body) {
                        try {
                            if (err) console.log(err);
                            var data = body;//JSON.parse(body);
                            data = iconv.decode(body, 'gb2312');
                            //console.log("" + data);
                            var $ = cheerio.load( data );
                            $('script').each(function () {
                                var script = $(this).html();
                                if( script.indexOf('gjj_cx.jsp?') != -1 ){
                                    script = script.substring( 'window.location=gjj_cx.jsp?'.length, script.length -1 );

                                    //#################################
                                    // 请求用户信息页
                                    //#################################
                                    var infoUrl = 'http://www.bjgjj.gov.cn/wsyw/wscx/gjj_cx.jsp' + script.trim();
                                    console.log(  "@@@@@@@@@@@@@@@@@@"+infoUrl );
                                    var infoHeaders = {
                                            "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                                            "Accept-Encoding":"gzip, deflate, sdch",
                                            "Accept-Language":"zh-CN,zh;q=0.8",
                                            "Connection":"keep-alive",
                                            "Cookie":cookie,
                                            "Host":"www.bjgjj.gov.cn",
                                            "Referer":"http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-choice.jsp",
                                            "Upgrade-Insecure-Requests":"1",
                                            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
                                    }
                                    var infoOptions = {
                                        url: infoUrl,
                                        method: 'GET',
                                        encoding:null,
                                        headers: infoHeaders,

                                    }
                                    request( infoOptions, function( err, response, body){
                                        var data = body;//JSON.parse(body);
                                        data = iconv.decode(body, 'gb2312');
                                        var $ = cheerio.load( data );
                                        var info = $.text().trim().replace(/\r\n\s+/gi, "  ");
                                        console.log( info );
                                        var fromStr = '住房公积金个人总账信息';
                                        var endStr = '当前余额 = 上年结转余额';
                                        var start = info.indexOf( fromStr,0 );
                                        var end = info.indexOf( endStr,start );
                                        var countInfo = info.substring( start, end );
                                        console.log( "#######################################################")
                                        console.log( countInfo );

                                        var fromDetailStr = '住房公积金个人明细账信息';
                                        var endDetailStr = '查看历史明细账信息';
                                        var start = info.indexOf( fromDetailStr,0 );
                                        var end = info.indexOf( endDetailStr,start );
                                        var detailInfo = info.substring( start, end );
                                        console.log( "#######################################################")
                                        console.log( detailInfo );




                                    } )

                                }
                            });
                        } catch (ex) {
                            console.log(ex);
                        }
                    });

                });

            }
        });

        process.stdin.on('end', () => {
            process.stdout.write('end');
        });


    })

});





