const request = require('request');
const cheerio = require( 'cheerio' );
const fs = require( 'fs' );
const iconv = require("iconv-lite");

let config = require('./config.js');

let data = {
    "ywType": "login",
    "SFZHM": "511322198101117817",
    "PASSWORD": "51132219",
    "imagecheck": ""
}

let userInfo = "";
let start = function( initOptions ){
        request( initOptions, function( err, response, body ){
            if( err ) {
                console.log( err );
            }
            let cookie = response.headers['set-cookie'].toString();
            config.cookie = cookie.substring( 0, cookie.indexOf('; ') );
            console.log( config.cookie )
            config.checkCodeOptions.headers.Cookie = config.cookie;
            config.loginOptions.headers.Cookie = config.cookie;
            config.userOptions.headers.Cookie = config.cookie;
            config.detailsOptions.headers.Cookie = config.cookie;
            //console.log( config.checkCodeOptions );
            getCheckCode( config.checkCodeOptions );
            process.stdin.setEncoding('utf8');

            process.stdin.on('readable', () => {
                let chunk = process.stdin.read();
                if (chunk !== null) {
                    let code = chunk.replace( /\n/i,"" );
                    data.imagecheck = code;
                    config.loginOptions.form = data;
                    config.loginOptions.headers["Content-Length"] = data.length;
                    login( config.loginOptions );
                }
            });

            process.stdin.on('end', () => {
                process.stdout.write('end');

            });
        })

}
//获取验证码图片
let getCheckCode = function( checkCodeOptions ){
    request( checkCodeOptions ).pipe( fs.createWriteStream( './checkImg.png' ) );
}

let login = function( loginOptions ){
    //console.log( loginOptions )
        request( loginOptions, function( err, response, body ){
            let data = iconv.decode(body, 'gb2312');
            //console.log( data );
            getUserData( config.userOptions );

        } )
};


let getUserData = function( userOptions ) {
    console.log(userOptions)
    request(userOptions, function (err, response, body) {
        let data = iconv.decode(body, 'gb2312');
        let $ = cheerio.load(data);
        let info = $.text().trim().replace(/\r\n\s+/gi, "  ");
        let fromStr = '个人基本资料查询';
        let start = info.indexOf(fromStr, 0);
        userInfo = info.substring(start, info.length);
        console.log(userInfo);
        getDetails(config.detailsOptions, '201602', '201702', 110);
        getDetails(config.detailsOptions, '201602', '201702', 210);

    });
}

/*
startDate
   YYYYMM  -- 201602
endDate
   YYYYMM  -- 201702
type
    110   养老保险
    210   失业保险
    310   医疗保险
    410   工伤保险
    510   生育保险
*/

let getDetails = function( detailsOptions, startDate, endDate, type ){
    let url = `https://grcx.dgsi.gov.cn/action/MainAction?ActionType=q_grcbxzjfmxcx&xzlx=${type}&ksjfsj=${startDate}&jsjfsj=${endDate}`;
    detailsOptions.url = url;
    request( detailsOptions, function( err, response, body ){
        let data = iconv.decode(body, 'gb2312');
        let $ = cheerio.load( data );
        let info = $.text().trim().replace(/\r\n\s+/gi, "  ");
        let fromStr = '个人参保险种缴费明细查询';
        let start = info.indexOf( fromStr,0 );
        var endDetailStr = '共有';
        var end = info.indexOf( endDetailStr,start );
        var detailInfo = info.substring( start, end );
        console.log( detailInfo );


    } );


}




start( config.initOptions );





