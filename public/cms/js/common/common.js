var topBar=new Vue({
    el:'#topBar',
    delimiters:['~{','}'],
    data:{

    },
    created:function(){

    },
    methods:{

    }
})

var sideBar=new Vue({
    el:'#sideBar',
    delimiters:['~{','}'],
    data:{
        test:'test'
    },
    created:function(){

    },
    methods:{
        switchPages:function(type){  //切换页面，0轮播图、1产品管理、2模块管理、3Email存储、4评价管理、5用户管理、6博客管理
            var page=type==0?'carousel':
                type==1?'productMana':
                    type==2?'moduleMana':
                            type==3?'emailStorage':
                                type==4?'commentMana':
                                    type==5?'userMana':
                                        type==6?'blogMana':'';
            window.location.href='/cms/'+page;
        }
    }
})

//公共方法
var pubMethod={
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