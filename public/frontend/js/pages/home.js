
var home=new Vue({
    el:'#home_main',
    delimiters:['~{','}'],
    data:{
        test:'test'
    },
    created:function(){
        this.getCarousel()
    },
    methods:{
        getCarousel:function(){  //获得轮播图
            this.$http.get('/api/product/getBanner').then(function(res){

            }, function(err){

            });
        },
    }
})