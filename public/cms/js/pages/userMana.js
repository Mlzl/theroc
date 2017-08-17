
var userMana_main=new Vue({
    el:'#userMana_main',
    delimiters:['~{','}'],
    data:{
        userInfoList:null
    },
    created:function(){
        this.userInfoList=[{
            nickName:'淘淘生悦',
            sex:'男',
            birthDate:'2017-08-08',
            photo:'/images/penguin.jpg',
            address:'广东省汕头龙湖区',
            code:'510000'
        }];
    },
    methods:{

    }
})