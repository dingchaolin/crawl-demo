let info = {
    a :{
        a: 1
    },
    b :{
        a: 1
    },
    c :{
        a: 1
    },
    setA: function( data ){
        this.a.a = ++data;
        this.b.a = ++data;
        this.c.a = ++data;
    }
}

module.exports = info;
