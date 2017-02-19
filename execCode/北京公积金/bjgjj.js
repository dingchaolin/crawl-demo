var request = require( 'request' );
var fs = require( 'fs' );
var cheerio = require('cheerio');

var Encrypt = require( './encrypt.js');
var fMcM3 = "pdcss123";
var TjXjbs4 = "css11q1a";
var fEAI5 = "co1qacq11";
var mm = "363101";//密码明文
var bh = "6217000010068552267";//账号明文
var mmE = Encrypt(mm, fMcM3, TjXjbs4, fEAI5);//密码密文
var bhE = Encrypt(bh, fMcM3, TjXjbs4, fEAI5);//账号密文

//console.log( mmE, bhE );

var data = {};
data.mm = mmE;
data.bh = bhE;
data.gjjcxjjmyhpppp = "1234";

var url = 'http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-login.jsp' ;

request.get(url, function (err, httpResponse, body) {

        if (err) console.log(err);
        //var $ = cheerio.load(body);
        console.log( httpResponse.headers);
        var headers = // httpResponse.headers;
        {
                "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Encoding":"gzip, deflate",
                "Accept-Language":"zh-CN,zh;q=0.8",
                "Cache-Control":"max-age=0",
                "Connection":"keep-alive",
                //Content-Length:494
                "Content-Type":"application/x-www-form-urlencoded",
                "Cookie":"JSESSIONID=5A1DF0FBBE54E9AE50DA8ABFFA971EAD.tomcat1; JSESSIONID=AB9B60DB46A13986952FF5B29603AA64.tomcat1",
                "Host":"www.bjgjj.gov.cn",
                "Origin":"http://www.bjgjj.gov.cn",
                "Referer":"http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-login.jsp",
                "Upgrade-Insecure-Requests":"1",
                "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        }

        var urlChoice = "http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-choice.jsp"
        var options = {
                url: urlChoice,
                method: 'POST',
                headers: headers,
                json: true,
                form: data
        }

        request(options, function (err, httpResponse, body) {
            try {
                if (err) console.log(err);
                var res = body;//JSON.parse(body);
                console.log( res );
            } catch (ex) {
                console.log(ex);
            }
        });

});





