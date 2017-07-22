

var product_detail=new Vue({
    el:'#product_detail_main',
    delimiters:['~{','}'],
    data:{
        active:1,  //图文详情或评论，1图文详情、2评论
    },
    created:function(){

    },
    methods:{
        activeChange:function(active){
            this.active=active;
        }
    }
})