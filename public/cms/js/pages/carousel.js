
var carousel_main=new Vue({
    el:'#carousel_main',
    delimiters:['~{','}'],
    data:{
        activeTab:'carousel_home',
        addCarousel:false,
        homeGoodsList:null,
        productGoodsList:null
    },
    created:function(){

        this.homeGoodsList=[{
            id:'id',
            url:'www.baidu.com',
            imgSrc:'/images/user.png',
            state:'read'
        },{
            id:'id2',
            url:'www.google.com',
            imgSrc:'/images/user.png',
            state:'read'
        }];
    },
    methods:{
        openTab:function(tabId){
            this.activeTab=tabId;
            this.makeProductList(tabId);
        },
        makeProductList:function(tabId){
          if(tabId==='carousel_home'){
              this.homeGoodsList=[{
                  id:'id',
                  url:'www.baidu.com',
                  imgSrc:'/images/user.png',
                  state:'read'
              },{
                  id:'id2',
                  url:'www.google.com',
                  imgSrc:'/images/user.png',
                  state:'read'
              }];
          }
          else{
              this.productGoodsList=[{
                  id:'id',
                  url:'www.test1.com',
                  imgSrc:'/images/user.png',
                  state:'read'
              },{
                  id:'id2',
                  url:'www.test2.com',
                  imgSrc:'/images/user.png',
                  state:'read'
              },{
                  id:'id3',
                  url:'www.test3.com',
                  imgSrc:'/images/user.png',
                  state:'read'
              }];
          }
        },
        //编辑
        edit:function(index){
            if(this.activeTab==='carousel_home')
                {
                    this.homeGoodsList[index].state = 'edit';
                }
            else{
                this.productGoodsList[index].state = 'edit';
            }
        },
        del:function(index){

        },
        cancel:function(index){
            if(this.activeTab==='carousel_home')
            {
                this.homeGoodsList[index].state = 'read';
            }
            else{
                this.productGoodsList[index].state = 'read';
            }
        },
        save:function(index){

        }
    }
})