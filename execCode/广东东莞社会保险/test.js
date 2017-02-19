let str = 'wwww';
let f = function(){
    return 'www';
}
let info = {
    data:'',
    a :{
        a: 1
    },
    b :{
        a: 1
    },
    c :{
        a: 1,
        data:f()
    },
    setA: function( data ){
        this.a.a = ++data;
        this.b.a = ++data;
        this.c.a = ++data;

    }
}

module.exports = info;
