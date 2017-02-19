/**
 * Created by lenovo on 2017/2/17.
 */

let request = require( 'request' );
let initOptions =  {
    url: 'https://grcx.dgsi.gov.cn/',
    method: 'GET',
    headers: {},
    strictSSL: false
}
request( initOptions, function( err, response, body ){
    console.log( response.headers );

})