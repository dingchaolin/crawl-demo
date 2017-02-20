let config = require( './config.js' );

const request = require('request');
const cheerio = require( 'cheerio' );
const fs = require( 'fs' );
const iconv = require("iconv-lite");

module.exports = {
  initCookie: ( initOptions ) => {
      return new Promise( (resolve, reject ) => {
              request( initOptions, (err, response, body) => {

                  if( err ) {
                      reject( {errStatus: 1, info: err } );
                  }
                  else if( !response.statusCode || response.statusCode >= 300 ){
                      reject( {errStatus: 1, info: '服务器出错了...' } );
                  }
                  else {

                      resolve({errStatus: 0, info: response.headers['set-cookie'].toString()});
                  }

              });

      });
  },
    getCheckCode: ( checkCodeOptions ) => {

        return new Promise( (resolve, reject ) => {
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
        })
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
                    //let buffer = new Buffer(body)
                    //console.log( buffer )
                    let data = iconv.decode(body, 'utf8');
                    //data = cheerio.load( data ).text().trim().replace(/\r\n\s+/gi, "  ");;
                    console.log( data );
                    //if( data.indexOf( 'gjjcx-logineoor.jsp?id=2') != -1 ){
                    //
                    //    reject( {errStatus: 1, info: '密码错误' } );
                    //
                    //}else if( data.indexOf( 'gjjcx-logineoor.jsp?id=3') != -1){
                    //
                    //    reject( {errStatus: 1, info: '账号不存在' } );
                    //
                    //} else if( data.indexOf( '校验码错误') != -1 ) {
                    //
                    //    reject( {errStatus: 1, info: '校验码错误' } );
                    //
                    //}else {
                    //    resolve( { errStatus: 0, info: data } );
                    //}

                }

            } )
        });
    },
};
