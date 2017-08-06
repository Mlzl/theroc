
var product_detail_main=new Vue({
    el:'#product_detail_main',
    delimiters:['~{','}'],
    data:{
        tab:0,  //选项卡，0基本资料、1图文详情
        isEdit:false,  //是否处于编辑状态
    },
    created:function(){

    },
    methods:{
        switchTab:function(tab){  //切换选项卡
            this.tab=tab;
        },
        switchEdit:function(isEdit){  //更改编辑状态
            this.isEdit=isEdit;
        }
    }
})