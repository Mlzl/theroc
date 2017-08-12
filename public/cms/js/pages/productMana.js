
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
            console.log(_data)
            this.$http.post('/cms/product/api_add_class',_data,
                {
                    headers:{'Accept': 'application/json', 'Content-type': "application/json"},
                }).then(function(res){
                var _res=res.body;
                if(_res.code==0){

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
            console.log(_data)
            this.$http.post('/cms/product/api_update_class',_data).then(function(res){
                var _res=res.body;
                if(_res.code==0){

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
                name:this.product_name,
                class_id:this.curNode.id
            }
            console.log(_data)
            this.$http.post('/cms/product/api_add_product',_data).then(function(res){
                var _res=res.body;
                if(_res.code==0){

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
        addOrModifyClass:function(e){  //添加or修改分类
            var addOrModify=this.addOrModify;
            if(addOrModify==0){  //添加
                this.addClass();
            }else{  //修改
                this.modifyClass();
            }
        },
        showAddClass:function(addClass_show,addOrModify){  //显示隐藏 添加分类弹出框
            this.addClass_show=addClass_show;
            if(addOrModify){  //0添加1修改
                this.addOrModify=addOrModify;
            }
        },
        showAddProduct:function(addProduct_show){  //显示隐藏 添加产品弹出框
            this.addProduct_show=addProduct_show;
        },
        toDetailPage:function(e){  //to产品详情页
            window.location.href='/cms/productMana/detail';
        },


        // async modifyDepartName(log){  //修改部门名称
        //     let _this=this,response,_response;
        //     let curNode=this.curNode;
        //     let departNewName=this.departNewName;
        //
        //     try {
        //         response = await fetch('api1/structure/'+curNode.id+'/update', {
        //             method: 'POST',
        //             headers: getHeaders(log),
        //             credentials: 'same-origin',
        //             body:JSON.stringify({
        //                 name:departNewName
        //             })
        //         });
        //         _response = await response.json();
        //         if(_response.code ===0 ){
        //             _this.getStructure()
        //             _this.$message.success('修改成功');
        //         }else{
        //             _this.$message.error(_response.msg);
        //         }
        //     } catch(err) {}
        // },
        // async addDepartSave(log){  //添加新部门 保存
        //     let _this=this,response,_response;
        //     let addDepartName=this.addDepartName;
        //     let curNode=this.curNode;
        //
        //     try {
        //         response = await fetch('api1/structure/create', {
        //             method: 'POST',
        //             headers: getHeaders(log),
        //             credentials: 'same-origin',
        //             body:JSON.stringify({
        //                 name:addDepartName,
        //                 parent_id:curNode.id
        //             })
        //         });
        //         _response = await response.json();
        //         if(_response.code ===0 ){
        //             _this.addDepartShow=false;
        //             let newNode=_response.data;
        //             let data=_this.data;
        //             addTreeChild(data,curNode.id,newNode)
        //             // _this.getStructure()
        //             _this.$message.success('添加成功');
        //         }else{
        //             _this.$message.error(_response.msg);
        //         }
        //     } catch(err) {}
        // },
        // async deleteDepartSave(log){  //删除部门
        //     let _this=this,response,_response;
        //     let curNode=this.curNode;
        //
        //     try {
        //         response = await fetch('api1/structure/'+curNode.id+'/delete', {
        //             method: 'POST',
        //             headers: getHeaders(log),
        //             credentials: 'same-origin',
        //             body:JSON.stringify({
        //
        //             })
        //         });
        //         _response = await response.json();
        //         if(_response.code ===0 ){
        //             _this.getStructure()
        //             // let data=_this.data;
        //             this.treePullMenuShow=false;
        //             _this.$message.success('删除成功');
        //         } else{
        //             _this.$message.error(_response.msg);
        //         }
        //     } catch(err) {}
        // },
        // async memberMoveSave(log,userId,departId){  //成员移动到弹出框 保存
        //     let _this=this,response,_response;
        //
        //     try {
        //         response = await fetch('api1/structure/user/'+userId+'/update', {
        //             method: 'POST',
        //             headers: getHeaders(log),
        //             credentials: 'same-origin',
        //             body:JSON.stringify({
        //                 structure_id:departId
        //             })
        //         });
        //         _response = await response.json();
        //         if(_response.code ===0 ){
        //             _this.$store.commit('showMemberMove',false)
        //             _this.$message.success('移动成功');
        //             _this.memberOperMenuShow=false;
        //             let idArray=[],ids;
        //             let treeNodes=[];
        //             let curNode=this.curNode;
        //             treeNodes.push(curNode);
        //             getNodesIdArray(treeNodes,idArray);
        //             ids=idArray.join(',');
        //             this.getCurNodeUserList(ids)
        //         }else{
        //             _this.$message.error(_response.msg);
        //         }
        //     } catch(err) {}
        // },
        // async forbidOrAllow(log,status){  //禁用或启用企业成员
        //     let _this=this,response,_response;
        //     let userId=this.curClickUser.id;
        //
        //     try {
        //         response = await fetch('api1/structure/user/'+userId+'/update', {
        //             method: 'POST',
        //             headers: getHeaders(log),
        //             credentials: 'same-origin',
        //             body:JSON.stringify({
        //                 status:status
        //             })
        //         });
        //         _response = await response.json();
        //         if(_response.code ===0 ){
        //             if(status==1){
        //                 _this.$message.success('启用成功');
        //             }else if(status==2){
        //                 _this.$message.success('禁用成功');
        //             }
        //             _this.memberOperMenuShow=false;
        //             _this.curClickUser.status=status;
        //         }else{
        //             _this.$message.error(_response.msg);
        //         }
        //     } catch(err) {}
        // },
        // async searchMember(){  //搜索成员
        //     let _this=this,response,_response;
        //     this.curNodeUserListLoading=true;
        //     let page_limit=this.userPageSize,
        //         page=_this.userCurPage;
        //
        //     try {
        //         response = await fetch('api1/structure/user/search?page_limit='+page_limit+'&page='+page, {
        //             method: 'POST',
        //             headers: getHeaders_noLog(),
        //             credentials: 'same-origin',
        //             body:JSON.stringify({
        //                 content:_this.searchVal
        //             })
        //         });
        //         _response = await response.json();
        //         _this.curNodeUserListLoading=false;
        //         if(_response.code ===0 ){
        //             let curNodeUserList=_response.data.data;
        //             _this.curNodeUserList=curNodeUserList;
        //             _this.userTotalPage=_response.data.total;
        //         }else{
        //             _this.$message.error(_response.msg);
        //         }
        //     } catch(err) {}
        // },
        // modifyDepartNameBtn(e){  ////修改部门名称 回车
        //     let departNewName=this.departNewName;
        //     let log='更改某部门名称为【'+departNewName+'】';
        //     this.modifyDepartName(log);
        // },
        // addDepartSaveBtn(e){  //添加新部门 保存按钮
        //     let addDepartName=this.addDepartName;
        //     let log='添加新部门【'+addDepartName+'】';
        //     this.addDepartSave(log)
        // },
        // deleteDepartSaveBtn(e){  //删除部门 点击
        //     let curNode=this.curNode;
        //     let log='删除部门【'+curNode.name+'】';
        //     this.deleteDepartSave(log)
        // },
        // memberMoveSaveBtn(e){
        //     let curClickUser=this.curClickUser;
        //     let memberMove_curNode=this.memberMove_curNode;
        //     if(memberMove_curNode==null){
        //         this.$message.warning('请选择部门')
        //     }else{
        //         let log='将【'+curClickUser.name+'】移动到【'+memberMove_curNode.name+'】';
        //         // console.log(log)
        //         this.memberMoveSave(log,curClickUser.id,memberMove_curNode.id)
        //     }
        // },
        // comMemberContentClick(e){  //点击成员内容的一些操作
        //     this.treePullMenuShow=false;
        //     this.memberOperMenuShow=false;
        // },

        // showTreePullMenu(e){  //树节点下拉菜单 显示
        //     e.stopPropagation()
        //     let treePullMenu=document.getElementById('treePullMenu');
        //     let clientX=e.clientX;
        //     let clientY=e.clientY;
        //     let scrollX=document.body.scrollLeft;
        //     let scrollY=document.body.scrollTop;
        //     treePullMenu.style.left=(clientX+scrollX)+'px';
        //     treePullMenu.style.top=(clientY+scrollY)+'px';
        //     this.treePullMenuShow=true;
        // },
        // showMemberOperMenu(curClickUser,e){  //每个成员操作 显示隐藏
        //     this.curClickUser=curClickUser;
        //     let memberOperMenu=document.getElementById('memberOperMenu');
        //     let clientX=e.clientX;
        //     let clientY=e.clientY;
        //     let scrollX=document.body.scrollLeft;
        //     let scrollY=document.body.scrollTop;
        //     memberOperMenu.style.left=clientX+scrollX+'px';
        //     memberOperMenu.style.top=clientY+scrollY+'px';
        //     this.memberOperMenuShow=true;
        // },
        // showAddDepartDialog(addDepartShow,e){  //添加部门弹出框 显示隐藏
        //     this.addDepartShow=addDepartShow;
        //     this.treePullMenuShow=false;
        // },
        // showMemberMoveDialog(memberMoveShow,e){  //成员移动到弹出框 显示隐藏
        //     this.$store.commit('showMemberMove',memberMoveShow)
        // },
        // showMemberData(curClickUser,memberDataShow,e){  //成员资料页面 显示隐藏
        //     this.curClickUser=curClickUser;
        //     this.$store.commit('showMemberData',memberDataShow)
        // },
        // showSaleApply(saleApplyShow,e){  //销售申请页面 显示隐藏
        //     this.$store.commit('showSaleApply',saleApplyShow)
        // },
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