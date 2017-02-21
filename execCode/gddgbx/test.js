let config = require( './config.js' );
let service = require( './gddgbx.js' );

service.initCookie( config.initOptions ).then( ( cookie ) => {

    config.cookie = cookie.info.substring( 0, cookie.info.indexOf('; ') );
    console.log( config.cookie )
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

    config.loginOptions.headers["Content-Length"] = config.loginOptions.form.length;
    //config.loginOptions.headers["Content-Length"] = JSON.stringify( config.loginOptions.form ).length;
    return service.login( config.loginOptions );

}).then( loginStatus => {
    if( loginStatus.errStatus === 0 ){
        return service.getUserBasicInfo( config.userOptions );
    }else{
        throw new Error( "Error" );
    }
}).then( userBasicInfo => {
    console.log( '******************用户基本信息*********************************************');
    console.log( userBasicInfo.info );

    return service.getDetailInfo( config.detailsOptions, '201403', '201702', 110 );

}).then( detailInfo => {
    console.log( '******************用户缴费详情1********************************************');
    console.log( detailInfo.info );

    return service.getDetailInfo( config.detailsOptions, '201403', '201702', 210 );

}).then( detailInfo => {
    console.log( '******************用户缴费详情2*********************************************');
    console.log( detailInfo.info );
}).catch( err => {
    console.log( '出错了,错误信息为：', err );
})
