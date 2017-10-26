var topBar=new Vue({
    el:'#topBar',
    delimiters:['~{','}'],
    data:{

    },
    created:function(){

    },
    methods:{
        logout:function(e){  //登出
            // this.delCookie('roc_u');
            // this.delCookie('roc_key');
            // window.location.reload();
            // $.cookie("roc_u",null,{path:"/"});
            // $.cookie("roc_key",null,{path:"/"});
            $.cookie('roc_u',null,{path:'/'});
            $.cookie('roc_key',null,{path:'/'});
            window.location.reload();
        },
    }
})

var sideBar=new Vue({
    el:'#sideBar',
    delimiters:['~{','}'],
    data:{
        tab:sessionStorage.sideBar_tab || 0,
    },
    created:function(){

    },
    methods:{
        switchPages:function(type){  //切换页面，0轮播图、1产品管理、2模块管理、3Email存储、4退款管理、5用户管理、6博客管理
            var page=type==0?'carousel':
                        type==1?'productMana':
                            type==2?'moduleMana':
                                    type==3?'emailStorage':
                                        type==4?'returnMana':
                                            type==5?'userMana':
                                                type==6?'blogMana':'';
            sessionStorage.sideBar_tab=type;
            window.location.href='/cms/'+page;
        }
    }
})

//公共方法
var pubMethod={
    getQueryParam:function(){  //获得地址栏参数
        var name,value;
        var url=location.href; //取得整个地址栏
        var num=url.indexOf("?")
        var str=url.substr(num+1); //取得所有参数

        var arr=str.split("&"); //各个参数放到数组里
        var obj={};
        for(var i=0,len=arr.length;i < len;i++){
            num=arr[i].indexOf("=");
            if(num>0){
                name=arr[i].substring(0,num);
                value=arr[i].substr(num+1);
                obj[name]=value;
            }
        }
        return obj;
    },
    bubbleSort:function(arr,attr){  //冒泡排序
        var i = arr.length, j;
        var tempExchangVal;
        while (i > 0) {
            for (j = 0; j < i - 1; j++) {
                if (parseFloat(arr[j][attr]) > parseFloat(arr[j + 1][attr])) {
                    tempExchangVal = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tempExchangVal;
                }
            }
            i--;
        }
        // return arr;
    }
}