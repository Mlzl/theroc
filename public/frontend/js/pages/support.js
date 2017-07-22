
var support=new Vue({
    el:'#support',
    delimiters:['~{','}'],
    data:{
         activeTab:'refunds',
    },
    created:function(){

    },
    methods:{
        clickTab:function(tabId){
            this.activeTab=tabId;
        }
    }
})