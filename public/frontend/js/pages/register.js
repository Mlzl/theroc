
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
                this.$message('Email can not be empty');
            }else if(password==''||password.trim()==''){
                this.$message('Password can not be empty');
            }else if(rePassword==''||rePassword.trim()==''){
                this.$message('Repassword can not be empty');
            } else if(!EMAILREG.test(email.trim())){
                this.$message('Please enter a valid email address');
            }else if(password.length<6 || password.length>20){
                this.$message('Password must be 8 - 20 digits, letters or characters');
            }else if(password.trim() != rePassword.trim()){
                this.$message('Password and Repassword must be equal');
            }else{
                this.register();
            }
        }
    }
});
