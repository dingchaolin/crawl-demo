let config = require('./config.js');

let fs = require( 'fs' );
const request = require('request');
let init = function( initOptions ){

    return new Promise( function( resolve, reject){
        request( initOptions, function( err, response, body ){

            if( err ) {
                reject( {errStatus: 1, info: err } );
            }else{
                console.log( `headers == ${response.headers['set-cookie']}` );
                //console.log( `headers == ${response.headers['set-cookie'].toString()}` );
                resolve( { errStatus: 0, info: response.headers['set-cookie'].toString() } );
            }
        })
    });
}
//获取验证码图片
let getCheckCode = function( checkCodeOptions ){
    request( checkCodeOptions ).pipe( fs.createWriteStream( './广东东莞社会保险/checkImg.png' ) );
}

config.loginOptions.headers.Cookie = "";


let login = function( loginOptions ){
    return new Promise( function( resolve, reject ){
        request( loginOptions, function( err, response, body ){
            if( err ) {
                reject( {errStatus: 1, info: err } );
            }
            resolve( { errStatus: 0, info: body } );
        } )
    });
};

init( config.initOptions).then( ( result ) => {


    if( result.errStatus === 1 ){
        throw new Error( result.info );
    }
    // 保存cookie信息

    config.cookie = result.info.substring( 0, result.info.indexOf('; ') );
    console.log( config.cookie )
    config.checkCodeOptions.headers.Cookie = config.cookie;
    config.loginOptions.headers.Cookie = config.cookie;

    console.log(  config.checkCodeOptions )
    getCheckCode( config.checkCodeOptions );

    process.stdin.setEncoding('utf8');

    process.stdin.on('readable', () => {
        let chunk = process.stdin.read();
        if (chunk !== null) {
            let code = chunk.replace( /\n/i,"" );
            config.loginOptions.form.imagecheck = code;
            console.log( code );
            login( config.loginOptions );
        }
    });

    process.stdin.on('end', () => {
        process.stdout.write('end');

    });
}).catch( ( err ) => {
    console.log( `出错了，错误信息： ${err} ` );
})








