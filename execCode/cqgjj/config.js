module.exports = {

    cookie: "",

    initOptions : {
        url: 'http://www.cqgjj.cn/Member/UserIndexShow.aspx',
        method: 'GET',
        headers: {}
    },

    checkCodeOptions : {
        url: 'http://www.cqgjj.cn/Code.aspx',
        method: 'GET',
        headers: {
            "Accept":"image/webp,image/*,*/*;q=0.8",
            "Accept-Encoding":"gzip, deflate, sdch",
            "Accept-Language":"zh-CN,zh;q=0.8",
            "Connection":"keep-alive",
            "Cookie":"",
            "Host":"www.cqgjj.cn",
            "Referer":"http://www.cqgjj.cn/Member/UserLogin.aspx?type=gr",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        },
        encoding: null
    },

    loginOptions : {
        url: 'http://www.cqgjj.cn/Member/UserLogin.aspx?type=null',
        method: 'POST',
        encoding:'utf8',
        headers: {
            "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Encoding":"gzip, deflate",
            "Accept-Language":"zh-CN,zh;q=0.8",
            "Cache-Control":"max-age=0",
            "Connection":"keep-alive",
            "Content-Length":0,
            "Content-Type":"application/x-www-form-urlencoded",
            "Cookie":"",
            "Host":"www.cqgjj.cn",
            "Origin":"http://www.cqgjj.cn",
            "Referer":"http://www.cqgjj.cn/Member/UserLogin.aspx?type=gr",
            "Upgrade-Insecure-Requests":"1",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"

        },
        json: true,
        form: {
            "__VIEWSTATE": "m1dDoW/vmJ9wEjXGSoJP5UgLAqYW7MA1hPzbfzjSTmUrWJevXBPJ/EZWQr2ZWOXpcPzg6+UDe417WPC/gd44osz5VeynZKjkGYfxMEjE+otpncaptFX+H5pFbv6TSEFbt9tDsg==",
            "__VIEWSTATEGENERATOR": "9B5805F3",
            "__EVENTVALIDATION": "Xp8WVov7Kn8T3aOZ57oiGLgBpHRUg6fvri1pba6McdfBsvs/E2I65ZjtPnXtRiA9gvz3Yft68YC7Ix0QX+wYj/OfrkLzOu1/D03LQO4pTZ+38Urdn7RNYtDbZiAyTU+NllkpD5E8b07UjY/LZDhByGb3MFsnEus26g1t4EiZQbokXTQkuQnylyXw9rRPW+ejlBHtlnyeE2+uRuP0GxCMALibNx8=",
            "txt_loginname":"DOU15859059010",
            "txt_pwd":"ZHANGqinJIA0553",
            "txt_code":"w",
            "but_send":""
        }
    },
    setCookie: function( cookie ) {
        this.cookie = cookie;
        this.checkCodeOptions.headers.Cookie = cookie;
        this.loginOptions.headers.Cookie = cookie;

    },

    setCheckCode: function( imagecheck ) {
        this.loginOptions.form.txt_code = imagecheck;

    }
}