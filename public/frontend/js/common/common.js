
var topBar=new Vue({
    el:'#topBar',
    delimiters:['~{','}'],
    data:{
        test:'test'
    },
    created:function(){

    },
    methods:{
        switchPages:function(type){  //切换页面，0首页、1产品页、2博客、3联系我们、4登陆
            var page=type==0?'home':
                        type==1?'product':
                            type==2?'community':
                                type==3?'contact':
                                    type==4?'login':'';
            window.location.href='/'+page;
        }
    }
})

var footer=new Vue({
    el:'#footer',
    delimiters:['~{','}'],
    data:{
        linkIcon:['facebook_icon','twitter_icon','google_icon','youtobe_icon','instagram_icon','periscope_icon']
    },
    created:function(){

    },
    methods:{
        switchPages:function(type){  //切换页面，0联系我们、1 2支持中心
            var page= type==0?'contact':
                        type==1?'support?tab=0':
                            type==2?'support?tab=1':'';
            window.location.href='/'+page;
        },
        toOtherLink:function(link,e){  //跳转至其他外链
            switch(link)
            {
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
})