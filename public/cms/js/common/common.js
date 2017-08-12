var topBar=new Vue({
    el:'#topBar',
    delimiters:['~{','}'],
    data:{
        test:'test'
    },
    created:function(){

    },
    methods:{

    }
})

var sideBar=new Vue({
    el:'#sideBar',
    delimiters:['~{','}'],
    data:{
        test:'test'
    },
    created:function(){

    },
    methods:{
        switchPages:function(type){  //切换页面，0轮播图、1产品管理、2模块管理、3Email存储、4评价管理、5用户管理、6博客管理
            var page=type==0?'carousel':
                type==1?'productMana':
                    type==2?'moduleMana':
                            type==3?'emailStorage':
                                type==4?'commentMana':
                                    type==5?'userMana':
                                        type==6?'blogMana':'';
            window.location.href='/cms/'+page;
        }
    }
})