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
        switchPages:function(type){  //切换页面，0轮播图、1产品管理、2模块管理、3博客管理、4Email存储、5评价管理、6用户管理、7数据分析
            var page=type==0?'carousel':
                type==1?'productMana':
                    type==2?'moduleMana':
                        type==3?'blogMana':
                            type==4?'emailStorage':
                                type==5?'commentMana':
                                    type==6?'userMana':
                                        type==7?'dataAnalysis':'';
            window.location.href='/cms/'+page;
        }
    }
})