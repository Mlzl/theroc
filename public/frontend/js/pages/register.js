
var register=new Vue({
    el:'#register_main',
    delimiters:['~{','}'],
    data:{
        email:null,
        password:null,
        captcha:null,
        repassword:null,
        emailTip:'',
        passwordTip:''
    },
    methods:{
        //点击注册
        regist:function(){
            if(this.email==null||pubMethod.isBlank(this.email)){
                this.emailTip='email can\'t not empty!';
                return;
            }
            if(this.password==null||pubMethod.isBlank(this.password)){
                this.passwordTip='password can\'t not empty!';
                return;
            }
            if(this.password.length){
                this.passwordTip='the length of password must be  bigger than 6!';
                return;
            }
            if(this.password!==this.repassword){
                this.passwordTip='two password must be same';
                return;
            }
                this.email = b64_md5(this.email);
                this.password = b64_md5(this.email);
            var that=this;
            var data={
                email:this.email,
                password:this.password,
                captcha:'11',
                username:'1234'

            };
            this.$http.post('/api/user/register',data, {emulateJSON:true}).then(function(res){
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
});
