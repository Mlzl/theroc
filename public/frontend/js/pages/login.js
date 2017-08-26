
var login=new Vue({
    el:'#login_main',
    delimiters:['~{','}'],
    data:{
        email:'',
        password:'',
    },
    created:function(){

    },
    methods:{
        login:function(){    //登录
            var _password=hex_md5(this.password);
            var _this=this;
            var data={
                email:this.email,
                password:_password,
            };
            this.$http.post('/api/user/login',data, {emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    window.location.href='/';
                }
                else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        }
    }
})