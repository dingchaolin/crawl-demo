const Encrypt = require( './encrypt.js');
const fMcM3 = "pdcss123";
const TjXjbs4 = "css11q1a";
const fEAI5 = "co1qacq11";
const mm = "363101";//密码明文
const bh = "6217000010068552267";//账号明文
const mmE = Encrypt(mm, fMcM3, TjXjbs4, fEAI5);//密码密文
const bhE = Encrypt(bh, fMcM3, TjXjbs4, fEAI5);//账号密文

module.exports = {
    cookie: "",

    initOptions : {
        url: 'http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-login.jsp',
        method: 'GET',
        headers: {
            "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Encoding":"gzip, deflate, sdch",
            "Accept-Language":"zh-CN,zh;q=0.8",
            "Connection":"keep-alive",
            "Host":"www.bjgjj.gov.cn",
            "Upgrade-Insecure-Requests":"1",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        }
    },

    faviconOptions : {
        url: 'http://www.bjgjj.gov.cn/favicon.ico',
        method: 'GET',
        headers: {
            "Accept":"image/webp,image/*,*/*;q=0.8",
            "Accept-Encoding":"gzip, deflate, sdch",
            "Accept-Language":"zh-CN,zh;q=0.8",
            "Connection":"keep-alive",
            "Host":"www.bjgjj.gov.cn",
            "Referer":"http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-login.jsp",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        }
    },

    checkCodeOptions : {
        url: 'http://www.bjgjj.gov.cn/wsyw/servlet/PicCheckCode1?v=',
        method: 'GET',
        headers: {
            "Accept":"image/webp,image/*,*/*;q=0.8",
            "Accept-Encoding":"gzip, deflate, sdch",
            "Accept-Language":"zh-CN,zh;q=0.8",
            "Connection":"keep-alive",
            "Cookie":'',
            "Host":"www.bjgjj.gov.cn",
            "Referer":"http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-login.jsp",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        },
        encoding: null,
    },

    lkOptions : {
        url: 'http://www.bjgjj.gov.cn/wsyw/wscx/asdwqnasmdnams.jsp',
        method: 'GET',
        headers: {
            "Accept":"*/*",
            "Accept-Encoding":"gzip, deflate",
            "Accept-Language":"zh-CN,zh;q=0.8",
            "Connection":"keep-alive",
            "Content-Length":0,
            "Content-Type":"text/html;",
            "Cookie":'',
            "Host":"www.bjgjj.gov.cn",
            "Origin":"http://www.bjgjj.gov.cn",
            "Referer":"http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-login.jsp",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        }
    },

    loginOptions : {
        url: 'http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-choice.jsp',
        method: 'POST',
        encoding:null,
        headers: {
            "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Encoding":"gzip, deflate",
            "Accept-Language":"zh-CN,zh;q=0.8",
            "Cache-Control":"max-age=0",
            "Connection":"keep-alive",
            //Content-Length:494
            "Content-Type":"application/x-www-form-urlencoded",
            "Cookie":'',
            "Host":"www.bjgjj.gov.cn",
            "Origin":"http://www.bjgjj.gov.cn",
            "Referer":"http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-login.jsp",
            "Upgrade-Insecure-Requests":"1",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        },
        json: true,
        form: {
            lk:0,//请求之前获取
            lb:5,//固定值
            bh:bhE,
            mm:mmE,
            gjjcxjjmyhpppp:'',
            bh5:bh,
            mm5:mm,
            gjjcxjjmyhpppp5:'',
            bh2:'',
            mm2:'',
            gjjcxjjmyhpppp2:'',
            bh1:'',
            mm1:'',
            gjjcxjjmyhpppp1:'',
            bh3:'',
            mm3:'',
            gjjcxjjmyhpppp3:'',
            bh4:'',
            mm4:'',
            gjjcxjjmyhpppp4:''
        }
    },

    infoOptions : {
        url: 'http://www.bjgjj.gov.cn/wsyw/wscx/gjj_cx.jsp?nicam=MzZyenJ6enk4Y3oyMnk1cjg4cnI4MTgA&hskwe=R0pKd2NhMmFjMnc1ODQ0&vnv=JiMzMjU5OTsmIzIxMzIxOwAA&lx=1',
        method: 'GET',
        encoding:null,
        headers: {
            "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Encoding":"gzip, deflate, sdch",
            "Accept-Language":"zh-CN,zh;q=0.8",
            "Connection":"keep-alive",
            "Cookie":'',
            "Host":"www.bjgjj.gov.cn",
            "Referer":"http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-choice.jsp",
            "Upgrade-Insecure-Requests":"1",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        }
    },

    setCookie: function( cookie ) {
        this.cookie = cookie;
        this.checkCodeOptions.headers.Cookie = cookie;
        this.lkOptions.headers.Cookie = cookie;
        this.loginOptions.headers.Cookie = cookie;
        this.infoOptions.headers.Cookie = cookie;

    },

    setCheckCode: function( imagecheck ) {
        this.loginOptions.form.gjjcxjjmyhpppp = imagecheck;
        this.loginOptions.form.gjjcxjjmyhpppp5 = imagecheck;
    },

    setLk: function( lk ) {
        this.loginOptions.form.lk = lk;

    },







};