
var home=new Vue({
    el:'#home_main',
    delimiters:['~{','}'],
    data:{
        bannerList:[]
    },
    created:function(){
        this.getCarousel()
    },
    methods:{
        getCarousel:function() {  //获得轮播图
            var that = this;
            this.$http.get('/api/product/getBanner', {params: {banner_type: 'home_banner'}}).then(function (res) {
                var _res = res.body;
                that.bannerList=_res.data;
            }, function (err) {
                console.log(err);
            });
        },
        //跳至链接
        locateHref:function(href){
            window.location.href=href;
        },
    }
})