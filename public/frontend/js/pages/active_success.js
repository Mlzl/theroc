
var active_success=new Vue({
    el:'#active_success',
    delimiters:['~{','}'],
    data:{

    },
    created:function(){

    },
    methods:{
        toLoginPage:function(){
            var url='/login';

            window.location.href=url;
        }
    }
})