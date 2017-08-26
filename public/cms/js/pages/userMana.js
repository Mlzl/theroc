
var userMana_main=new Vue({
    el:'#userMana_main',
    delimiters:['~{','}'],
    data:{
        userList:[],  //评论列表
        userList_size:10,  //评论列表每页显示条数
        userList_page:1,  //评论列表当前页
        userList_total:0,  //评论列表总条数
    },
    created:function(){
        this.getUserList()
    },
    methods:{
        getUserList:function(){  //获取评论列表
            var _this=this;
            var userList_size=this.userList_size;
            var userList_page=this.userList_page;
            var url='/cms/user/list?page='+userList_page+'&size='+userList_size;
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var userList=_res.data.list;
                    var userList_total=_res.data.total;
                    // for(var i=0,len=commentList.length;i<len;i++){
                    //     var _create_time=pubMethod.formatTime(new Date(commentList[i].create_time*1000));
                    //     commentList[i]._create_time=_create_time;
                    // }

                    _this.userList=userList;
                    _this.userList_total=userList_total;
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        userChange:function(val){  //评论列表翻页时
            this.userList_page=val;
            this.getUserList();
        },
    }
})