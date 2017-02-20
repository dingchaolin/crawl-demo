var c = "4427218";
var u = "CNZZDATA" + c;
var r = "1487582948";

function j() {
    try {
        return this.a.qa = h.referrer || ""
    } catch (a) {
        g(a, "gR failed")
    }
}

function g(a, b) {
    try {
        var c =
            [];
        c.push("siteid=4427218");
        c.push("name=" + f(a.name));
        c.push("msg=" + f(a.message));
        c.push("r=" + f('http://www.cqgjj.cn/'));
        c.push("page=" + f('http://s16.cnzz.com'));
        c.push("agent=" + f('User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240'));
        c.push("ex=" + f(b));
        c.push("rnd=" + Math.floor(2147483648 * Math.random()));
        (new Image).src = "http://jserr.cnzz.com/log.php?" + c.join("&")
    } catch (d) {}
}

var i = g("cnzz_eid") || "none";
var f = encodeURIComponent;
function O() {
    try {
        var a = u + "=",
            b = [],
            c = new Date;
        c.setTime(c.getTime() + 157248E5);
        if (1E8 < c) {
            if ("none" !== i)
                b.push(f(i));
            else {
                var d = Math.floor(2147483648 * Math.random()) + "-" + r + "-" + this.C(this.j());
                b.push(f(d))
            }
            b.push(this.r);
            0 < b.length ?
                (a += f(b.join("|")), a += "; expires=" + c.toUTCString(), a += "; path=/") : a += "; expires=" + (new Date(0)).toUTCString()
        } else
            "none" !== this.a.i ? b.push("cnzz_eid=" + f(this.a.i)) : (d = Math.floor(2147483648 * Math.random()) + "-" + this.r + "-" + this.C(this.j()), b.push("cnzz_eid=" + f(d))), b.push("ntime=" + r), 0 < b.length ? (a += f(b.join("&")), a += "; expires=" + c.toUTCString(), a += "; path=/") : a += "; expires=" + (new Date(0)).toUTCString();
        //#######################################################
        h.cookie = a
        alert( h.cookie );
        console.log( `cookie=${h.cookie}` );
        //##########################################################
    } catch (e) {
        g(e, "sS failed")
    }
}
