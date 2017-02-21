let config = require( './config.js' );
let service = require( './bjgjj.js' );

service.initCookie( config.initOptions).then( cookie => {

    config.cookie = cookie.info.substring( 0, cookie.info.indexOf('; ') );
    config.setCookie( config.cookie );
    return service.initFaviconCookie( config.faviconOptions );

}).then( faviconCookie => {
    config.cookie += "; " + faviconCookie.info.substring( 0, faviconCookie.info.indexOf('; ') );
    console.log( config.cookie );
    config.setCookie( config.cookie );
    return service.getCheckCode( config.checkCodeOptions );

}).then( codeStatus => {
    if( codeStatus.errStatus ===0 ){
        return service.inputCheckCode();
    }else{
        throw new Error( 'check code input error...');
    }
}).then( checkCode => {
    config.setCheckCode( checkCode.info );
    //console.log( JSON.stringify( config) )

    return service.getLk( config.lkOptions );

}).then( lk => {

    config.setLk( lk.info );
    config.loginOptions.headers["Content-Length"] = config.loginOptions.form.length;
    //config.loginOptions.headers["Content-Length"] = JSON.stringify( config.loginOptions.form ).length;
    return service.login( config.loginOptions );

}).then( loginStatus => {
    if( loginStatus.errStatus === 0 ){
        return service.getUserInfo( config.infoOptions );
    }

}).then( ( result) => {
    console.log( JSON.stringify( result ) );
}).catch( err => {
    console.log( err );
})
