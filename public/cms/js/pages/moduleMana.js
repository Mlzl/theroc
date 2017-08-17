
var moduleMana_main=new Vue({
    el:'#moduleMana',
    delimiters:['~{','}'],
    data:{
        activeTab:'moduleMana_nav',
        navProductList:null,
        hotProductList:null,
        recommendProductList:null,
        dialogTitle:'添加导航产品',
        addModuleManaDialog:false
    },
    created:function(){
        this.navProductList=[{
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
            if(tabId==='moduleMana_nav'){
                this.navProductList=[{
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
            else if(tabId==='moduleMana_hot'){
                this.hotProductList=[{
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
            else{
                this.recommendProductList=[{
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
                },{
                    id:'id4',
                    url:'www.test3.com',
                    imgSrc:'/images/user.png',
                    state:'read'
                }];
            }
        },
        showDialog:function(){
            if(this.activeTab==='moduleMana_nav')
            {
                this.dialogTitle='添加导航产品';
            }
            else if(this.activeTab==='moduleMana_hot'){
                this.dialogTitle='添加热销产品';
            }
            else{
                this.dialogTitle='添加推荐产品';
            }
            this.addModuleManaDialog=!this.addModuleManaDialog;
        },
        //编辑
        edit:function(index){
            if(this.activeTab==='moduleMana_nav')
            {
                this.navProductList[index].state = 'edit';
            }
            else if(this.activeTab==='moduleMana_hot'){
                this.hotProductList[index].state = 'edit';
            }
            else{
                this.recommendProductList[index].state = 'edit';
            }
        },
        del:function(index){

        },
        cancel:function(index){
            if(this.activeTab==='moduleMana_nav')
            {
                this.navProductList[index].state = 'read';
            }
            else if(this.activeTab==='moduleMana_hot'){
                this.hotProductList[index].state = 'read';
            }
            else{
                this.recommendProductList[index].state = 'read';
            }
        },
        save:function(index){

        }
    }
})