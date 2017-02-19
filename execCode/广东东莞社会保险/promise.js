var data = 1;
let init = function( data ){
    return new Promise( function( resolve, reject){
        data += 1;
        resolve( data );
    });
}

let init2 = function( data ){
    return new Promise( function( resolve, reject){
        data += 2;
        resolve( data );
    });
}

let init3 = function( data ){
    return new Promise( function( resolve, reject){
        data += 3;
        console.log( '执行1')
        resolve( data );
        console.log( '执行2')
        reject( data );
        console.log( '执行3')
    });
}

let init4 = function( data ){
    return new Promise( function( resolve, reject){
        data += 4;
        resolve( data );
    });
}

init( data ).then( ( res )=>{
    console.log( res );
    return init2( res );
}).then( res1 =>{
    console.log( res1 );
    return init3( res1 );
}).then( res2 => {
    console.log( res2 );
    return init3( res2 );
}).then( res3 => {
    console.log( res3 );
    return init3( res3 );
}).catch( resErr => {
    console.log( resErr );
});

//init( data ).then( ( res )=>{
//
//    console.log( `then1 = ${res}` );
//
//    init2( res ).then( ( res2) => {
//
//        console.log( `then2 = ${res2}` );
//
//        init3( res2 ).then( ( res3) => {
//
//            console.log( `then3 = ${res3}` );
//
//            init4( res3 ).then( ( res4) => {
//
//                console.log( `then4 = ${res4}` );
//
//            })
//
//        })
//
//    })
//})