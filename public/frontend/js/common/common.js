var topBar = new Vue({
    el: '#topBar',
    delimiters: ['~{', '}'],
    data: {
        keyword:'',
        toNav_show:false,
    },
    created: function () {

    },
    computed:{
        active:function(){
            return sessionStorage.active;
        }
    },
    methods: {
        //异步方法

        //普通方法
        switchPages: function (type) {  //切换页面，0首页、1产品页、2博客、3联系我们、4登陆、5用户中心
            sessionStorage.active=type;
            var page = type == 0 ? '' :
                            type == 1 ? 'product' :
                                type == 2 ? 'community' :
                                    type == 3 ? 'contact' :
                                        type == 4 ? 'login' :
                                            type == 5 ? 'user':
                                                type==6 ? 'product/search?keyword='+this.keyword:
                                                    type==7?'support?tab=0':
                                                        type==8?'support?tab=1':'';
            if(type!=6){
                window.location.href = '/' + page;
            }else{
                var keyword=this.keyword;
                if(keyword==''||keyword.trim()==''){
                    this.$message('product name can not be empty');
                }else{
                    window.open('/' + page);
                }
            }
        },
        showToNav:function(toNav_show){
            this.toNav_show=toNav_show;
        },
        logout:function(e){  //登出
            // this.delCookie('roc_u');
            // this.delCookie('roc_key');
            // window.location.reload();
            // $.cookie("roc_u",null,{path:"/"});
            // $.cookie("roc_key",null,{path:"/"});
            $.cookie('roc_u',null,{domain:'www.theroc.com'});
            $.cookie('roc_key',null,{domain:'www.theroc.com'});
            window.location.reload();
        },
    }
});

var footer = new Vue({
    el: '#footer',
    delimiters: ['~{', '}'],
    data: {
        linkIcon: ['facebook_icon', 'twitter_icon', 'google_icon', 'youtobe_icon', 'instagram_icon', 'periscope_icon'],
        otherEmail:'',
    },
    created: function () {

    },
    methods: {
        //异步方法
        submitEmail:function(){  //提交邮箱
            var that=this;
            var data={
                email:this.otherEmail
            };
            this.$http.post('/api/user/collectionEmail',data, {emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    that.$message('submit success');
                }
                else{
                    that.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        //普通方法
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
        },
        submitEmailBtn:function(e){  //提交邮箱 按钮
            var email=this.otherEmail;
            var EMAILREG = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

            if(email==''||email.trim()==''){
                this.$message('email can not be empty');
            }else if(!EMAILREG.test(email.trim())){
                this.$message('please input valid email');
            }else{
                this.submitEmail();
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