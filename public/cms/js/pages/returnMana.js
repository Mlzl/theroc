
var returnMana_main=new Vue({
    el:'#returnMana_main',
    delimiters:['~{','}'],
    data:{
        curReturnList:[],  //当前退款列表
        curReturnList_size:11,  //当前退款列表每页显示条数
        curReturnList_page:1,  //当前退款列表当前页
        curReturnList_total:0,  //当前退款列表总条数
        preview_show:false,
        previewImg:''
    },
    created:function(){
        this.getReturnList()
    },
    methods:{
        //异步方法
        getReturnList:function(){  //获取退款列表
            var _this=this;
            var curReturnList_size=this.curReturnList_size;
            var curReturnList_page=this.curReturnList_page;
            var url='/cms/service/getRefundList?size='+curReturnList_size+'&page='+curReturnList_page;
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var curReturnList=_res.data.list;
                    var curReturnList_total=_res.data.total;
                    for(var i=0,len=curReturnList.length;i<len;i++){
                        curReturnList[i]._images=curReturnList[i].images.split(',');
                    }

                    _this.curReturnList=curReturnList;
                    _this.curReturnList_total=curReturnList_total;
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        //普通方法
        curProductChange:function(val){  //产品列表翻页时
            this.curReturnList_page=val;
            this.getReturnList();
        },
        preview:function(src){
            this.preview_show=true;
            this.previewImg=src;
        }
    }
})