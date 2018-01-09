
var home=new Vue({
    el:'#home_main',
    delimiters:['~{','}'],
    data:{
        // img_param:'?imageMogr2/thumbnail/800x800/gravity/Center/crop/500x500/strip/format/jpg',
        bannerList:[],
        productNavList:[],  //导航产品列表
        productHotList:[],  //热销产品列表
        productRecommendList:[],  //推荐产品列表
    },
    created:function(){
        this.getCarousel();
        this.getSpecialProductList('product_nav')
        this.getSpecialProductList('product_hot')
        this.getSpecialProductList('product_recommend')
    },
    methods:{
        //异步方法
        getCarousel:function() {  //获得轮播图
            var that = this;
            this.$http.get('/api/product/getBanner', {params: {banner_type: 'home_banner'}}).then(function (res) {
                var _res = res.body;
                that.bannerList=_res.data;
            }, function (err) {
                console.log(err);
            });
        },
        getSpecialProductList:function(label){  //获得特殊产品列表
            var _this=this;
            var url='/api/product/getSpecialProduct?special_label='+label;
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var _data=_res.data;
                    var data=[];
                    if(label!='product_nav'){
                        for(var i=0,len=_data.length;i<len;i++){
                            if(_data[i].name.indexOf('[none]')==-1){
                                data.push(_data[i])
                            }
                        }
                    }else{
                        data=_data;
                    }

                    for(var i=0,len=data.length;i<len;i++){
                        data[i]._picture_url=data[i].picture_url.split(',');
                    }
                    if(label=='product_nav'){
                        _this.productNavList=data;
                    }else if(label=='product_hot'){
                        _this.productHotList=data;
                    }else if(label='product_recommend'){
                        _this.productRecommendList=data;
                    }
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        //普通方法
        locateHref:function(href){  //跳至链接
            window.open(href);
        },
        toDetailPage:function(product_id){
            // location.href='/product/detail?product_id='+product_id;
            window.open('/product/detail?product_id='+product_id)
        },
    }
})