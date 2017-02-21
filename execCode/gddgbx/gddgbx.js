const request = require('request');
const cheerio = require( 'cheerio' );
const fs = require( 'fs' );
const iconv = require("iconv-lite");
const attr = require( './config.js' ).baseInfoAttr;
const detailAttr = require( './config.js' ).detailInfoAttr;
module.exports = {
    initCookie: (  initOptions ) => {

        return new Promise( ( resolve, reject) => {
            request( initOptions, ( err, response, body ) => {
                if( err ) {
                    reject( {errStatus: 1, info: err } );
                }
                else if( !response.statusCode || response.statusCode >= 300 ){
                    reject( {errStatus: 1, info: '出错了...' } );
                }
                else {
                    resolve({errStatus: 0, info: response.headers['set-cookie'].toString()});
                }
            })
        });
    },

    setCookie: ( config, cookie ) => {

        config.checkCodeOptions.headers.Cookie = cookie;
        config.loginOptions.headers.Cookie = cookie;
        config.userOptions.headers.Cookie = cookie;
        config.detailsOptions.headers.Cookie = cookie;

    },

    getCheckCode: ( checkCodeOptions ) => {

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

        })

    },

    login: ( loginOptions ) => {
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
                    if( data.indexOf( '登录失败') != -1 ){
                        reject( {errStatus: 1, info: data } );
                    }else{
                        resolve( { errStatus: 0, info: data } );
                    }

                }

            } )
        });
    },



getUserBasicInfo: ( userOptions ) => {
    //console.log(userOptions);
    return new Promise( ( resolve, reject ) => {
        request(userOptions, function (err, response, body) {

            if( err ) {
                reject( {errStatus: 1, info: err } );
            }
            else if( !response.statusCode || response.statusCode >= 300 ){
                reject( {errStatus: 1, info: '出错了...' } );
            }
            else{

                let data = iconv.decode(body, 'gb2312');
                let $ = cheerio.load(data);
                let info = $('tbody tr').children();
                let userBaseData = {};
                for( let i = 0, len = info.length; i < len; i++ ){
                    let tempData = info.eq(i).text().trim().replace(/\s+/gi, "");
                    if( i < 14 ){
                        userBaseData[attr[Math.floor( i/2 )]] = tempData;
                    }else if( i > 14 ){
                        userBaseData[attr[Math.floor( (i-1)/2  )]] = tempData;
                    }

                }
                resolve( { errStatus: 0, info: userBaseData } );

            }

        });
    });

},

    /*@param
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

     //注意
     //医疗保险只能从201310开始查询
     //其他保险查询时间段不能超过三年
     */
    getDetailInfo: ( detailsOptions, startDate, endDate, type ) => {
        return new Promise( ( resolve, reject) => {
            let url = `https://grcx.dgsi.gov.cn/action/MainAction?ActionType=q_grcbxzjfmxcx&xzlx=${type}&ksjfsj=${startDate}&jsjfsj=${endDate}`;
            detailsOptions.url = url;
            request( detailsOptions, function( err, response, body ){
                if( err ) {
                    reject( {errStatus: 1, info: err } );
                }
                else if( !response.statusCode || response.statusCode >= 300 ){
                    reject( {errStatus: 1, info: '出错了...' } );
                }
                else{
                    let data = iconv.decode(body, 'gb2312');
                    let $ = cheerio.load( data );
                    let info = $('tbody tr').children();
                    let userdetailData = [];
                    let tempDetail = {};
                    for( let i = 0, len = info.length; i < len; i++ ){
                        let tempData = info.eq(i).text().trim().replace(/\s+/gi, "");
                        if( i > 0 && i % 8 === 0 ){
                            userdetailData.push( tempDetail );
                            tempDetail = {};
                        }
                        tempDetail[detailAttr[i%8]] = tempData;
                    }

                    resolve( { errStatus: 0, info: userdetailData } );
                }

            } );
        })
    }

};
