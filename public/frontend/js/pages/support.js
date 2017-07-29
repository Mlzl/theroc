
var support=new Vue({
    el:'#support_main',
    delimiters:['~{','}'],
    data:{
         activeTab:'refunds-tab',
    },
    created:function(){

    },
    methods:{
        clickTab:function(tabId){
            this.activeTab=tabId;
        }

    }
})