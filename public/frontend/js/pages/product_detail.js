

var product_detail=new Vue({
    el:'#product_detail_main',
    delimiters:['~{','}'],
    data:{
        tab:0,  //0图文详情、1评论
        addComment_show:false,  //添加产品弹出框 显示隐藏
    },
    created:function(){

    },
    methods:{
        tabChange:function(tab){  //切换tab
            this.tab=tab;
        },
        showAddComment:function(addComment_show){  //显示隐藏 添加产品弹出框
            this.addComment_show=addComment_show;
        },
    }
})