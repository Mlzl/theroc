
var emailStorage_main=new Vue({
    el:'#emailStorage_main',
    delimiters:['~{','}'],
    data:{
        emailStorage:null,
        currentPage:1,
        pageSize:10,
        total:0
    },
    created:function(){
       this.getList();
    },
    methods:{
        handleCurrentChange:function(currentPage){
            this.currentPage=currentPage;
            this.getList();
        },
        getList:function(){
            var that=this;
            var data={
                size:this.pageSize,
                page:this.currentPage
            };
            this.$http.get('/cms/emailStorage/api_get_email_list',{params:data}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var data=_res.data;
                    that.emailStorage=data.list;
                    that.total=data.total;
                }
                else{
                    that.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        }
    }
})