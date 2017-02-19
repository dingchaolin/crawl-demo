module.exports = {
    cookie: "",

    initOptions: {
        url: 'https://grcx.dgsi.gov.cn/',
        method: 'GET',
        headers: {},
        strictSSL: false
    },

    checkCodeOptions: {
        url: 'https://grcx.dgsi.gov.cn/pages/checkimage.JSP',
        method: 'GET',
        headers: {
            "Accept": "image/png, image/svg+xml, image/jxr, image/*; q=0.8, */*; q=0.5",
            "ccept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN",
            "Connection": "Keep-Alive",
            "Cookie": "",
            "Host": "grcx.dgsi.gov.cn",
            "Referer": "https://grcx.dgsi.gov.cn/pages/login.jsp",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240"
        },
        encoding: null,
        strictSSL: false
    },

    loginOptions: {
        url: 'https://grcx.dgsi.gov.cn/action/LoginAction',
        method: 'POST',
        headers: {
            "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Connection":"keep-alive",
            "Content-Length":0,
            "Content-Type":"application/x-www-form-urlencoded",
            "Cookie":"",
            Host:"grcx.dgsi.gov.cn",
            Origin:"https://grcx.dgsi.gov.cn",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"

        },
        strictSSL: false,
        encoding: null,
        json: true,
        form: {
            "ywType": "login",
            "SFZHM": "511322198101117817",
            "PASSWORD": "51132219",
            "imagecheck": ""
        }
    },

    userOptions: {
        url: 'https://grcx.dgsi.gov.cn/action/MainAction?menuid=106201&ActionType=q_grjbzlcx',//个人基本信息查询界面
        method: 'GET',
        headers: {
            "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Connection":"keep-alive",
            //"Content-Length":0,
            "Content-Type":"application/x-www-form-urlencoded",
            "Cookie":"",
            Host:"grcx.dgsi.gov.cn",
            Origin:"https://grcx.dgsi.gov.cn",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        },
        strictSSL: false,
        encoding: null

    },

    detailsOptions: {
        url: '',
        method: 'GET',
        headers: {
            "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Connection":"keep-alive",
            //"Content-Length":0,
            "Content-Type":"application/x-www-form-urlencoded",
            "Cookie":"",
            Host:"grcx.dgsi.gov.cn",
            Origin:"https://grcx.dgsi.gov.cn",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        },
        strictSSL: false,
        encoding: null

    },

    setCookie: function( cookie ){
        this.checkCodeOptions.headers.Cookie = cookie;
        this.loginOptions.headers.Cookie = cookie;
        this.userOptions.headers.Cookie = cookie;
        this.detailsOptions.headers.Cookie = cookie;
    },

    setCheckCode: function( imagecheck ){
        this.loginOptions.form.imagecheck = imagecheck;
    }

};
