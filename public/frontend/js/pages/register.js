
var register=new Vue({
    el:'#register_main',
    delimiters:['~{','}'],
    data:{
        email:'',
        password:'',
        rePassword:'',
    },
    methods:{
        register:function(){    //点击注册
            // if(this.email==null||pubMethod.isBlank(this.email)){
            //     this.emailTip='email can\'t not empty!';
            //     return;
            // }
            // if(this.password==null||pubMethod.isBlank(this.password)){
            //     this.passwordTip='password can\'t not empty!';
            //     return;
            // }
            // if(this.password.length<6){
            //     this.passwordTip='the length of password must be  bigger than 6!';
            //     return;
            // }
            // if(this.password!==this.repassword){
            //     this.passwordTip='two password must be same';
            //     return;
            // }
            var _password=hex_md5(this.password);
            var _this=this;
            var data={
                email:this.email,
                password:_password,
            };
            this.$http.post('/api/user/register',data, {emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    _this.email='';
                    _this.password='';
                    _this.rePassword='';
                    _this.$message('注册成功，请注意查收邮件激活账号！');
                }
                else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        }
    }
});
