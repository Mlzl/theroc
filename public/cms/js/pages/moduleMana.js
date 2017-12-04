
var moduleMana_main=new Vue({
    el:'#moduleMana_main',
    delimiters:['~{','}'],
    data:{
        tab:0,  //选项卡，0导航产品、1热销产品、2推荐产品
        productNavList:[],  //导航产品列表
        productHotList:[],  //热销产品列表
        productRecommendList:[],  //推荐产品列表
        //添加 弹出框
        addShow:false,  //添加弹出框 显示隐藏
        productName:'',  //产品名称
        showSearchBox:false,  //搜索产品列表框 显示隐藏
        searchProductList:[],  //搜索产品列表
        selectedProductId:'',  //所选产品id
    },
    computed:{
        productList:function(){
            var tab=this.tab;
            var productList=tab==0?this.productNavList:
                                tab==1?this.productHotList:
                                    tab==2?this.productRecommendList:[];

            return productList;
        }
    },
    created:function(){
        this.getSpecialProductList('product_nav')
        this.getSpecialProductList('product_hot')
        this.getSpecialProductList('product_recommend')
    },
    methods:{
        //异步方法
        getSpecialProductList:function(label){  //获得特殊产品列表
            var _this=this;
            var url='/api/product/getSpecialProduct?special_label='+label;
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var data=_res.data;
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
        searchProduct:function(e){  //搜索产品
            var _this=this;
            var productName=this.productName;
            var url='/api/service/searchProduct?keyword='+productName;
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var searchProductList=_res.data.list;
                    if(searchProductList && searchProductList.length>0){
                        _this.showSearchBox=true;
                        _this.searchProductList=searchProductList;
                    }else{
                        _this.$message('没有搜索到任何产品');
                    }
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        addDeter_btn:function(){  //添加弹出框 确定
            var _this=this;
            var tab=this.tab;
            var product_id=this.selectedProductId;
            if(product_id==''){
                _this.$message('未选择产品');
                return;
            }
            var special_label=tab==0?'product_nav':
                                tab==1?'product_hot':
                                    tab==2?'product_recommend':'';
            var url='/cms/setting/api_add_special_product?product_id='+product_id+'&special_label='+special_label;
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    _this.getSpecialProductList(special_label);
                    _this.addShow=false;
                    _this.$message('添加成功');
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        //普通方法
        switchTab:function(tab){  //切换选项卡
            this.tab=tab;
        },
        showAdd:function(addShow){  //添加弹出框 显示隐藏
            this.addShow=addShow;
        },
        selectProduct:function(productId,productName){  //选择一款产品
            this.selectedProductId=productId;
            this.productName=productName;
            this.showSearchBox=false;
        },
    }
})