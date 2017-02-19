const request = require('request');
const cheerio = require( 'cheerio' );
const fs = require( 'fs' );
const iconv = require("iconv-lite");

module.exports = {
    initCookie: ( initOptions ) => {
        return new Promise( ( resolve, reject ) => {
            request( initOptions, (err, response, body) => {

                if( err ) {
                    reject( {errStatus: 1, info: err } );
                }
                else if( !response.statusCode || response.statusCode >= 300 ){
                    reject( {errStatus: 1, info: '出错了...' } );
                }
                else {
                    resolve({errStatus: 0, info: response.headers['set-cookie'].toString()});
                }

            });
        });
    },

    initFaviconCookie : ( faviconOptions ) => {
        return new Promise( ( resolve, reject ) => {
            request( faviconOptions, function( err, response, body){

                if( err ) {
                    reject( {errStatus: 1, info: err } );
                }
                else if( !response.statusCode || response.statusCode >= 300 ){
                    reject( {errStatus: 1, info: '出错了...' } );
                }
                else {
                    resolve({errStatus: 0, info: response.headers['set-cookie'].toString()});
                }
            });
        })
    },

    getCheckCode: ( checkCodeOptions ) => {
        checkCodeOptions.url += new Date();
        console.log( checkCodeOptions.url )
        return new Promise( ( resolve, reject) => {

            request( checkCodeOptions, ( err, response, body ) => {
                if( err ) {
                    reject( {errStatus: 1, info: err } );
                }
                else if( !response.statusCode || response.statusCode >= 300 ){
                    reject( {errStatus: 1, info: '出错了...' } );
                }
                else {
                    fs.writeFile('./checkImg.png', body, {encoding: ''}, ( err ) => {

                        if ( err ) {
                            reject( {errStatus: 1, info: '验证码保存出错...' } );
                        }else{
                            resolve( {errStatus: 0, info: '验证码保存成功...' } );
                        }

                    } );
                }

            })
        });
    },

    inputCheckCode: ( ) => {
        console.log( '请输入验证码:');
        return new Promise( ( resolve, reject) => {
            process.stdin.setEncoding('utf8');

            process.stdin.on('readable', () => {
                let chunk = process.stdin.read();
                if (chunk !== null) {
                    let code = chunk.replace( /\n/i,"" );
                    resolve( {errStatus: 0, info: code } );
                }
            });

            process.stdin.on('end', () => {
                process.stdout.write('end');

            });

        });

    },

    getLk : ( lkOptions ) => {
        return new Promise( ( resolve, reject ) => {
                request(lkOptions, function (err, response, body) {
                    let lk = body.trim();
                    lk = lk.substring(4, lk.length);
                    if( err ) {
                        reject( {errStatus: 1, info: err } );
                    }
                    else if( !response.statusCode || response.statusCode >= 300 ){
                        reject( {errStatus: 1, info: '出错了...' } );
                    }
                    else {
                        resolve({errStatus: 0, info: lk });
                    }

                });
        });
    },

    login : ( loginOptions ) => {
        return new Promise( ( resolve, reject ) => {
            //console.log( loginOptions )
            request( loginOptions, function( err, response, body ){

                if( err ) {
                    reject( {errStatus: 1, info: err } );
                }
                else if( !response.statusCode || response.statusCode >= 300 ){
                    reject( {errStatus: 1, info: '出错了...' } );
                }
                else{

                    let data = iconv.decode(body, 'gb2312');
                    data = cheerio.load( data ).text().trim().replace(/\r\n\s+/gi, "  ");;
                    //console.log( data );
                    if( data.indexOf( 'gjjcx-logineoor.jsp?id=2') != -1 ){

                        reject( {errStatus: 1, info: '密码错误' } );

                    }else if( data.indexOf( 'gjjcx-logineoor.jsp?id=3') != -1){

                        reject( {errStatus: 1, info: '账号不存在' } );

                    } else if( data.indexOf( '校验码错误') != -1 ) {

                        reject( {errStatus: 1, info: '校验码错误' } );

                    }else {
                        resolve( { errStatus: 0, info: data } );
                    }

                }

            } )
        });
    },

    getUserInfo : ( infoOptions ) => {
        return new Promise( ( resolve, reject ) =>{
            request( infoOptions, function( err, response, body){
                if( err ) {
                    reject( {errStatus: 1, info: err } );
                }
                else if( !response.statusCode || response.statusCode >= 300 ){
                    reject( {errStatus: 1, info: '出错了...' } );
                }
                else{
                    let userData = [];
                    let data = body;//JSON.parse(body);
                    data = iconv.decode(body, 'gb2312');
                    let $ = cheerio.load( data );
                    let info = $.text().trim().replace(/\r\n\s+/gi, "  ");
                    //console.log( info );

                    let fromStr = '住房公积金个人总账信息';
                    let endStr = '当前余额 = 上年结转余额';
                    let start = info.indexOf( fromStr,0 );
                    let end = info.indexOf( endStr,start );
                    let countInfo = info.substring( start, end );
                    //console.log( "#######################################################")
                    //console.log( countInfo );
                    userData.push( countInfo );
                    let fromDetailStr = '住房公积金个人明细账信息';
                    let endDetailStr = '查看历史明细账信息';
                    start = info.indexOf( fromDetailStr,0 );
                    end = info.indexOf( endDetailStr,start );
                    let detailInfo = info.substring( start, end );
                    //console.log( "#######################################################")
                    //console.log( detailInfo );
                    userData.push( detailInfo );
                    resolve( { errStatus: 0, info: userData } );
                }

            } )
        } )
    }
}
