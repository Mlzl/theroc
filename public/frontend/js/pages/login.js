
var login=new Vue({
    el:'#login_main',
    delimiters:['~{','}'],
    data:{
        email:'',
        password:'',
        //忘记密码弹出框
        forgetPass_show:false,  //忘记密码弹出框 显示隐藏
        myEmail:'',
        captcha:'',
        newPassword:'',
    },
    created:function(){

    },
    methods:{
        //异步方法
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
                    sessionStorage.active=0;
                    window.location.href='/';
                }
                else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        sendCaptcha:function(){  //发送验证码
            var _this=this;
            var _data={
                email:this.myEmail,
            }
            var url='/api/user/sendForgetPwdEmail';
            this.$http.post(url,_data,{emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    _this.$message("send success,please find in your mailbook");
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        updatePwdByEmail:function(){  //通过邮箱更新密码
            var _this=this;
            var newPassword=hex_md5(this.newPassword);
            var _data={
                email:this.myEmail,
                captcha:this.captcha,
                password:newPassword
            }
            var url='/api/user/updatePwdByEmail';

            this.$http.post(url,_data,{emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    _this.forgetPass_show=false;
                    _this.$message('update password success');
                }
                else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });

        },
        //普通方法
        loginBtn:function(e){  //登录 按钮
            var email=this.email;
            var password=this.password;
            var EMAILREG = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

            if(email==''||email.trim()==''){
                this.$message('email can not be empty');
            }else if(password==''||password.trim()==''){
                this.$message('password can not be empty');
            }else if(!EMAILREG.test(email.trim())){
                this.$message('please input valid email');
            }else{
                this.login();
            }
        },
        showForgetPass:function(forgetPass_show,e){  //忘记密码弹出框 显示隐藏
            this.forgetPass_show=forgetPass_show;
        },
        sendCaptchaBtn:function(e){  //发送验证码按钮
            var myEmail=this.myEmail;
            var EMAILREG = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

            if(myEmail==''||myEmail.trim()==''){
                this.$message('email can not be empty');
            }else if(!EMAILREG.test(myEmail.trim())){
                this.$message('please input valid email');
            }else{
                this.sendCaptcha();
            }
        },
        updatePwdByEmailBtn:function(e){  //通过邮箱更新密码 按钮
            var myEmail=this.myEmail;
            var captcha=this.captcha;
            var newPassword=this.newPassword;
            var EMAILREG = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

            if(myEmail==''||myEmail.trim()==''){
                this.$message('email can not be empty');
            }else if(captcha==''||captcha.trim()==''){
                this.$message('captcha can not be empty');
            }else if(newPassword==''||newPassword.trim()==''){
                this.$message('newPassword can not be empty');
            }else if(!EMAILREG.test(myEmail.trim())){
                this.$message('please input valid email');
            }else{
                this.updatePwdByEmail();
            }
        },
        toRegisterPage:function(e){  //to注册页面
            window.location.href='register';
        },
    }
})