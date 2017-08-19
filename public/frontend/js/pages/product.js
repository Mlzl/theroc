

var product=new Vue({
    el:'#product_main',
    delimiters:['~{','}'],
    data:{
        allClass:[],  //所有分类
        curClickClass:{  //当前点击分类
            id:'0',
            name:'全部',
            child: []
        },
        curProductList:[],  //当前分类产品列表
        bannerList:[]  //轮播图
    },
    created:function(){
        this.getBanner();
        this.getAllClass();
        this.getCurProductList();
    },
    methods:{
        //获取轮播图
        getBanner:function(){
            var that = this;
            this.$http.get('/api/product/getBanner', {params: {banner_type: 'pro_banner'}}).then(function (res) {
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
        //异步方法
        getAllClass:function(){  //获取分类
            var _this=this;
            this.$http.get('/api/product/getAllClass').then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var allClass=_res.data;

                    _this.allClass=allClass;
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        getCurProductList:function(){  //获取当前分类产品列表
            var _this=this;
            var class_id=this.curClickClass.id;
            // var curProductList_size=this.curProductList_size;
            // var curProductList_page=this.curProductList_page;
            var url='/api/product/getProducts?class_id='+class_id;
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var curProductList=_res.data.list;
                    var curProductList_total=_res.data.total;
                    for(var i=0,len=curProductList.length;i<len;i++){
                        // var attr=curProductList[i].attr;
                        // pubMethod.bubbleSort(attr,'price');
                        // if(attr.length==0){
                        //     curProductList[i].price='-';
                        // }else if(attr.length==1){
                        //     curProductList[i].price='$'+attr[0].price;
                        // }else{
                        //     curProductList[i].price='$'+attr[0].price+'~$'+attr[attr.length-1].price;
                        // }
                        var _picture_url=curProductList[i].picture_url.split(',');
                        curProductList[i]._picture_url=_picture_url;
                    }

                    _this.curProductList=curProductList;
                    // _this.curProductList_total=curProductList_total;
                    console.log(curProductList)
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        //普通方法
        toDetailPage:function(product_id){
            // location.href='/product/detail?product_id='+product_id;
            window.open('/product/detail?product_id='+product_id)
        }
    }
})