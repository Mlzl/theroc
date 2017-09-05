
var product_search=new Vue({
    el:'#product_search_main',
    delimiters:['~{','}'],
    data:{
        searchProductList:[],
    },
    computed:{
        keyword:function(){
            return pubMethod.getQueryParam().keyword
        }
    },
    created:function(){
        this.getSearchProductList();
    },
    methods:{
        getSearchProductList:function(e){  //获得搜索产品列表
            var _this=this;
            var keyword=this.keyword;
            var url='/api/service/searchProduct?keyword='+keyword;
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var searchProductList=_res.data.list;
                    if(searchProductList && searchProductList.length>0){
                        for(var i=0,len=searchProductList.length;i<len;i++){
                            var _picture_url=searchProductList[i].picture_url.split(',');
                            searchProductList[i]._picture_url=_picture_url;
                        }
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
    }
})