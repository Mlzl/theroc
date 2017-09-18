
var login=new Vue({
    el:'#login_main',
    delimiters:['~{','}'],
    data:{
        email:'',
        password:'',
        dialogFormVisible:false,
        newPassword:null,
        code:null,
        dialogEmail:null
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
        toRegisterPage:function(e){  //to注册页面
            window.location.href='register';
        },
        forgetPassword:function(){
            this.newPassword=null;
            this.code=null;
            this.dialogEmail=null;
            this.dialogFormVisible=true;
        }
    }
})