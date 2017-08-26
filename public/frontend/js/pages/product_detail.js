
var product_detail=new Vue({
    el:'#product_detail_main',
    delimiters:['~{','}'],
    data:{
        tab:0,  //0图文详情、1评论
        productDetail:{},  //产品详情
        curCoverImg:'',  //当前点击的封面图片
        coverImg_index:0,  //当前点击的封片图片序号
        curPrice:'',  //当前显示价格
        curClassifyAttr_index:0,  //当前分类属性序号
        //评论列表
        commentList:[],  //评论列表
        commentList_size:10,  //评论列表每页显示条数
        commentList_page:1,  //评论列表当前页
        commentList_total:0,  //评论列表总条数
        //添加评论 弹出框
        addComment_show:false,  //添加评论弹出框 显示隐藏
        star_num:0,  //评价星星数量
        comment_content:''  //评论内容
    },
    computed: {
        product_id: function () {
            return pubMethod.getQueryParam().product_id;
        }
    },
    created:function(){
        this.getProductDetail();
        this.getCommentList();
    },
    methods:{
        //异步方法
        getProductDetail:function(){  //获取产品详情
            var _this=this;
            var url='/api/product/getProductDetail?product_id='+this.product_id;
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var productDetail=_res.data;
                    var picture_url=productDetail.picture_url;
                    productDetail._picture_url=picture_url?picture_url.split(','):[];
                    // console.log(productDetail)
                    _this.curPrice=productDetail.attr[0].price;
                    _this.curCoverImg=productDetail._picture_url[0];
                    _this.productDetail=productDetail;
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        getCommentList:function(){  //获取评论列表
            var _this=this;
            var product_id=this.product_id;
            var commentList_size=this.commentList_size;
            var commentList_page=this.commentList_page;
            var url='/api/product/getComments?product_id='+product_id+'&page='+commentList_page+'&size='+commentList_size;
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var commentList=_res.data.list;
                    var commentList_total=_res.data.total;
                    for(var i=0,len=commentList.length;i<len;i++){
                        var _create_time=pubMethod.formatTime(new Date(commentList[i].create_time*1000));
                        commentList[i]._create_time=_create_time;
                    }

                    _this.commentList=commentList;
                    _this.commentList_total=commentList_total;
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        commentDeter:function(){  //添加评论 确定按钮
            var _this=this;
            var _data={
                product_id:this.product_id,
                stat_num:this.star_num,
                content:this.comment_content,
            }
            var url='/api/product/addComment'
            // console.log(_data)
            this.$http.post(url,_data,{emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    _this.getCommentList();
                    _this.addComment_show=false;
                    _this.$message('评价成功');
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        //普通方法
        tabChange:function(tab){  //切换tab
            this.tab=tab;
        },
        showAddComment:function(addComment_show){  //显示隐藏 添加产品弹出框
            this.addComment_show=addComment_show;
        },
        toTargetUrl:function(target_url){  //到目标地址
            window.open(target_url)
        },
        switchCoverImg:function(curCoverImg,coverImg_index){  //切换封面图
            this.curCoverImg=curCoverImg;
            this.coverImg_index=coverImg_index;
        },
        switchClassifyAttr:function(curClassifyAttr,curClassifyAttr_index){  //切换分类属性
            this.curPrice=curClassifyAttr.price;
            this.curClassifyAttr_index=curClassifyAttr_index;
        },
        commentChange:function(val){  //评论列表翻页时
            this.commentList_page=val;
            this.getCommentList();
        },
    }
})