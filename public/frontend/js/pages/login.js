
var login=new Vue({
    el:'#login_main',
    delimiters:['~{','}'],
    data:{
        email:'',
        password:'',
        dialogFormVisible:false,
        newPassword:null,
        captcha:null,
        dialogEmail:null
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
        },
        forgetPassword:function(){
            this.newPassword=null;
            this.captcha=null;
            this.dialogEmail=null;
            this.dialogFormVisible=true;
        },
        sendEmail:function(){
            var _this=this;
            var param={
                email:this.dialogEmail
            };
            this.$http.get('/api/user/sendForgetPwdEmail',{params:param}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    _this.$message("send success,please find in your mailbook");
                }
                else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        updatePwdByEmail:function(){
            //输入验证
            var _password=hex_md5(this.password);
            var param={
                email:this.dialogEmail,
                captcha:this.captcha,
                password:_password
            };
            this.$http.get('/api/user/updatePwdByEmail',{
                params:params
            }).then(function(res){
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