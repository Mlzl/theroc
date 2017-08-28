
var moduleMana_main=new Vue({
    el:'#moduleMana_main',
    delimiters:['~{','}'],
    data:{
        tab:0,  //选项卡，0导航产品、1热销产品、2推荐产品
        //添加 弹出框
        add_show:false,  //添加弹出框 显示隐藏
        product_name:'',  //产品名称
    },
    created:function(){

    },
    methods:{
        //异步方法
        add_btn:function(){

        },
        //普通方法
        switchTab:function(tab){  //切换选项卡
            this.tab=tab;
        },
        showAdd:function(add_show){  //添加弹出框 显示隐藏
            this.add_show=add_show;
        }
    }
})