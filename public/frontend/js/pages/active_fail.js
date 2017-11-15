
var active_fail=new Vue({
    el:'#active_fail',
    delimiters:['~{','}'],
    data:{

    },
    created:function(){

    },
    methods:{
        toRegisterPage:function(){
            var url='/register';

            window.location.href=url;
        }
    }
})