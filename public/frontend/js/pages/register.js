
var register=new Vue({
    el:'#register_main',
    delimiters:['~{','}'],
    data:{
        email:'',
        password:'',
        rePassword:'',
    },
    methods:{
        //异步方法
        register:function(){    //注册
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
        },
        //普通方法
        registerBtn:function(e){  // 注册按钮
            var email=this.email;
            var password=this.password;
            var rePassword=this.rePassword;
            var EMAILREG = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

            if(email==''||email.trim()==''){
                this.$message('email can not be empty');
            }else if(password==''||password.trim()==''){
                this.$message('password can not be empty');
            }else if(rePassword==''||rePassword.trim()==''){
                this.$message('rePassword can not be empty');
            } else if(!EMAILREG.test(email.trim())){
                this.$message('please input valid email');
            }else if(password.trim() != rePassword.trim()){
                this.$message('password and rePassword must be equal');
            } else{
                this.register();
            }
        }
    }
});
