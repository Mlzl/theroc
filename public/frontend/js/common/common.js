
var topBar=new Vue({
    el:'#topBar',
    delimiters:['~{','}'],
    data:{
        test:'test'
    },
    created:function(){

    },
    methods:{
        switchPages:function(type){  //切换页面，0首页、1产品页、2博客、3联系我们
            var page=type==0?'home':
                        type==1?'product':
                            type==2?'community':
                                type==3?'contact':'';
            window.location.href='/'+page;
        }
    }
})