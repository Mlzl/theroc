
var productMana_main=new Vue({
    el:'#productMana_main',
    delimiters:['~{','}'],
    data:{

        defaultexpandedKeys:['0'],

        curNodeKey:'0',  //当前选中节点


        userTotalPage:0,  //当前树节点用户列表总页数
        curNodeUserListLoading:true,  //当前树节点用户列表loading 显示隐藏
        curClickUser:{},  //当前点击用户
        departNewName:'',  //修改的部门新名称
        addDepartName:'',  //添加的新部门名称
        treePullMenuShow:false,  //树节点下拉菜单 显示隐藏
        memberOperMenuShow:false,  //每个成员操作菜单 显示隐藏
        addDepartShow:false,  //添加部门弹出框 显示隐藏
        //左侧树数据（分类）
        tree_data:[{
            id:'0',
            name:'全部',
            child:[]
        }],  //分类,左侧树数据
        defaultProps: {
            children: 'child',
            label: 'name'
        },
        curNode:{  //当前点击节点
            id:'0',
            name:'全部',
            child: []
        },
        //
        curProductList:[],  //当前分类产品列表
        curProductList_size:15,  //当前分类产品列表每页显示条数
        curProductList_page:1,  //当前分类产品列表当前页
        //添加、修改分类
        addOrModify:0,  //添加或修改，0添加，1修改
        addClass_show:false,  //添加分类弹出框 显示隐藏
        class_name:'',  //分类名称
        //添加产品
        addProduct_show:false,  //添加产品弹出框 显示隐藏
        product_name:'',  //产品标题
        custom_attr:'',  //自定义属性
        target_url:'',  //跳链url
    },
    created:function(){
        this.getAllClass();
        this.getCurProductList()
    },
    methods:{
        //异步请求方法
        getAllClass:function(){  //获取分类
            var _this=this;
            this.$http.get('/api/product/getAllClass').then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var allClass=_res.data;

                    _this.tree_data[0].child=allClass;
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        getCurProductList:function(){  //获取当前分类产品列表
            var _this=this;
            var class_id=this.curNode.id;
            var curProductList_size=this.curProductList_size;
            var curProductList_page=this.curProductList_page;
            var url='/api/product/getProducts?class_id='+class_id+'&size='+curProductList_size+'&page='+curProductList_page;
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){

                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        addClass:function(){  //添加分类
            var _this=this;
            var _data={
                name:this.class_name,
                pid:this.curNode.id
            }
            var url='/cms/product/api_add_class';
            // console.log(_data)
            this.$http.post(url,_data, {emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    _this.getAllClass();
                    _this.addClass_show=false;
                    _this.$message('添加成功');
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        modifyClass:function(){  //修改分类
            var _this=this;
            var _data={
                name:this.class_name,
                class_id:this.curNode.id
            }
            var url='/cms/product/api_update_class'
            // console.log(_data)
            this.$http.post(url,_data,{emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    _this.getAllClass();
                    _this.addClass_show=false;
                    _this.$message('修改成功');
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        deleteClass:function(){  //删除分类
            var _this=this;
            var _data={
                class_id:this.curNode.id
            }
            var url='/cms/product/api_delete_class'
            // console.log(_data)
            this.$http.post(url,_data,{emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    _this.getAllClass();
                    _this.addClass_show=false;
                    _this.$message('删除成功');
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        addProduct:function(){  //添加产品
            var _this=this;
            var _data={
                class_id:this.curNode.id,
                name:this.product_name,
                product_label:this.custom_attr,
                target_url:this.target_url
            }
            var url='/cms/product/api_add_product';
            // console.log(_data)
            this.$http.post(url,_data,{emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    _this.addProduct_show=false;
                    _this.$message('添加成功');
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        //普通方法
        handleNodeClick:function(data) {
            // console.log(data);
            this.curNode=data;
            this.getCurProductList()
        },
        addOrModifyClass_btn:function(e){  //添加or修改分类btn
            var addOrModify=this.addOrModify;
            if(addOrModify==0){  //添加
                this.addClass();
            }else{  //修改
                this.modifyClass();
            }
        },
        deleteClass_btn:function(e){  //删除分类btn
            var _this=this;
            this.$confirm('确定删除该分类吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.deleteClass();
            }).catch(() => {

            });
        },
        showAddClass:function(addClass_show,addOrModify){  //显示隐藏 添加分类弹出框
            this.addClass_show=addClass_show;
            if(addOrModify!=undefined){  //0添加1修改
                this.addOrModify=addOrModify;
            }
            if(addOrModify==1){
                this.class_name=this.curNode.name;
            }else{
                this.class_name='';
            }
        },
        showAddProduct:function(addProduct_show){  //显示隐藏 添加产品弹出框
            this.addProduct_show=addProduct_show;
        },
        toDetailPage:function(e){  //to产品详情页
            window.location.href='/cms/productMana/detail';
        },

        // userCurChange(val){  //商家列表翻页时
        //     this.$store.commit('changeUserCurPage',val)
        //     let curNode=this.curNode;
        //     this.$store.commit('showSaleApply',false)
        //     let idArray=[],ids;
        //     let treeNodes=[];
        //     treeNodes.push(curNode);
        //     getNodesIdArray(treeNodes,idArray);
        //     ids=idArray.join(',');
        //     this.getCurNodeUserList(ids)
        // },
    }
})