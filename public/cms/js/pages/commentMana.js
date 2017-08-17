
var commentMana_main=new Vue({
    el:'#commentMana_main',
    delimiters:['~{','}'],
    data:{
        commentList:[{
            'title':'评价标题',
            'appraiser':'淘淘生悦',
            'starNum':3,
            'content':'测试内容',
            'state':'off'
        }]
    },
    created:function(){
        this.commentList=[{
            'title':'评价标题',
            'appraiser':'淘淘生悦',
            'starNum':3,
            'content':'测试内容',
            'state':'off'
        }];
    },
    methods:{
        changeState:function(index){
            this.commentList[index].state=(this.commentList[index].state=='on'?'off':'on');
        }
    }
})