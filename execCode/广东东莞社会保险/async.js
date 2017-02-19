let async = require( 'async' );
let data = 1;

async.waterfall( [
    function( cb ){
        data = init;
        cb( null, data );
    },
    function( res, cb ){
        res ++;
        cb( null, res );
    }

], function( err, result){
    console.log( result );
})
