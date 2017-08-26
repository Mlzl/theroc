var topBar = new Vue({
    el: '#topBar',
    delimiters: ['~{', '}'],
    data: {
        test: 'test'
    },
    created: function () {

    },
    methods: {
        switchPages: function (type) {  //切换页面，0首页、1产品页、2博客、3联系我们、4登陆
            var page = type == 0 ? 'home' :
                type == 1 ? 'product' :
                    type == 2 ? 'community' :
                        type == 3 ? 'contact' :
                            type == 4 ? 'login' : '';
            window.location.href = '/' + page;
        }
    }
});

var footer = new Vue({
    el: '#footer',
    delimiters: ['~{', '}'],
    data: {
        linkIcon: ['facebook_icon', 'twitter_icon', 'google_icon', 'youtobe_icon', 'instagram_icon', 'periscope_icon']
    },
    created: function () {

    },
    methods: {
        switchPages: function (type) {  //切换页面，0联系我们、1 2支持中心
            var page = type == 0 ? 'contact' :
                type == 1 ? 'support?tab=0' :
                    type == 2 ? 'support?tab=1' : '';
            window.location.href = '/' + page;
        },
        toOtherLink: function (link, e) {  //跳转至其他外链
            switch (link) {
                case 'facebook_icon':
                    window.open("https://www.facebook.com");
                    break;
                case 'twitter_icon':
                    window.open("https://twitter.com");
                    break;
                case 'google_icon':
                    window.open("https://www.google.com.hk");
                    break;
                case 'youtobe_icon':
                    window.open("https://www.youtube.com");
                    break;
                case 'instagram_icon':
                    window.open("https://www.instagram.com");
                    break;
                case 'periscope_icon':
                    window.open("https://www.periscope.com/");
                    break;
            }
        }
    }
});

//公共方法
var pubMethod = {
    getQueryParam: function () {  //获得地址栏参数
        var name, value;
        var url = location.href; //取得整个地址栏
        var num = url.indexOf("?")
        var str = url.substr(num + 1); //取得所有参数

        var arr = str.split("&"); //各个参数放到数组里
        var obj = {};
        for (var i = 0, len = arr.length; i < len; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                obj[name] = value;
            }
        }
        return obj;
    },
    bubbleSort: function (arr, attr) {  //冒泡排序
        var i = arr.length, j;
        var tempExchangVal;
        while (i > 0) {
            for (j = 0; j < i - 1; j++) {
                if (parseFloat(arr[j][attr]) > parseFloat(arr[j + 1][attr])) {
                    tempExchangVal = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tempExchangVal;
                }
            }
            i--;
        }
        // return arr;
    },
    formatTime: function (date) {  //YY-MM-dd hh:mm:ss
        var year = date.getFullYear();
        var month = date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
        var day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
        var hour = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
        var min = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
        var sec = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();

        return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;

    },
    //判断字符串是否为空，通用工具函数
    isBlank: function (str) {
        if (str == null || str == '') return true;
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
    }

}