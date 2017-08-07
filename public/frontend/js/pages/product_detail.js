

var product_detail=new Vue({
    el:'#product_detail_main',
    delimiters:['~{','}'],
    data:{
        tab:0,  //0图文详情、1评论
    },
    created:function(){

    },
    methods:{
        tabChange:function(tab){  //切换tab
            this.tab=tab;
        }
    }
})