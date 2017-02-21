const request = require('request');
const cheerio = require( 'cheerio' );
const fs = require( 'fs' );
const iconv = require("iconv-lite");
const baseInfoAttr = require( './config.js').baseInfoAttr;
const detailInfoAttr = require( './config.js').detailInfoAttr;
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
        //console.log( checkCodeOptions.url )
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
                    // 获取用户基本信息
                    let userData = {};
                    let data = body;//JSON.parse(body);
                    data = iconv.decode(body, 'gb2312');
                    let $ = cheerio.load( data );
                    //$('td div[align="right"]').remove();//移除不必要的数据
                    let info = $('table[color=#0077a9] tr').children();
                    for( let i = 0, len = info.length; i < len; i++ ){
                        let tempData = info.eq(i).text();
                        userData[baseInfoAttr[Math.floor(i/2)]] = tempData.trim().replace(/\s+/gi, "");;
                    }
                    //console.log(  userData );
                    // 获取缴费明细
                    info = $('#tab-style tr').children();
                    let detailData = [];
                    let tempDetail = {};
                    //console.log( info.length, info );
                    for( let i = 0, len = info.length; i < len; i++ ){
                        let tempData = info.eq(i).text();
                        //console.log( i, tempData.trim().replace(/\s+/gi, "") );
                        if( i > 5 ){
                            tempDetail[detailInfoAttr[i%6]] = tempData.trim().replace(/\s+/gi, "");
                            if( i > 6 && i % 6 === 0 ){
                                detailData.push( tempDetail );
                                tempDetail = {};
                            }
                        }
                    }
                    //console.log( detailData );
                    resolve( { errStatus: 0, info: { userBaseInfo: userData, userDetailInfo:detailData } } );
                }

            } )
        } )
    }
}
