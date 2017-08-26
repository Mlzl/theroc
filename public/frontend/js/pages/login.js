
var login=new Vue({
    el:'#login_main',
    delimiters:['~{','}'],
    data:{
        email:null,
        password:null,
    },
    methods:{
        login:function(){
            this.password = b64_md5(this.password);
            var data={
              email:this.email,
              password:this.password,
            };
            this.$http.post('/api/user/login',data, {emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    that.$message('成功！');
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