let config = require( './config.js' );
let service = require( './cqgjj.js' );

service.initCookie( config.initOptions).then( ( cookie ) =>{

    config.cookie = cookie.info.substring( 0, cookie.info.indexOf('; ') );
    config.setCookie( config.cookie );
    return service.getCheckCode( config.checkCodeOptions );

}).then( (checkCodeStatus) =>{
    if( checkCodeStatus.errStatus === 0 ){
        return service.inputCheckCode( );
    }

}).then( checkCode => {

    if( checkCode.errStatus === 0 ){
        config.setCheckCode( checkCode.info );
        config.loginOptions.headers["Content-Length"] = config.loginOptions.form.length;
        console.log( config.loginOptions );
        return service.login( config.loginOptions );
    }

}).then( baseInfo => {
    console.log( baseInfo );
}).catch( err => {
    console.log( err );
});


