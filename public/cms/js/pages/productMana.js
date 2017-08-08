
// var data=[{
//     id: 1,
//     name: '一级 1',
//     children: [{
//         id: 4,
//         name: '二级 1-1',
//         children: [{
//             id: 9,
//             name: '三级 1-1-1'
//         }, {
//             id: 10,
//             name: '三级 1-1-2'
//         }]
//     }]
// }, {
//     id: 2,
//     name: '一级 2',
//     children: [{
//         id: 5,
//         name: '二级 2-1'
//     }, {
//         id: 6,
//         name: '二级 2-2'
//     }]
// }, {
//     id: 3,
//     name: '一级 3',
//     children: [{
//         id: 7,
//         name: '二级 3-1'
//     }, {
//         id: 8,
//         name: '二级 3-2'
//     }]
// }];

var productMana_main=new Vue({
    el:'#productMana_main',
    delimiters:['~{','}'],
    data:{
        allClass:[],  //分类,左侧树数据
        defaultProps: {
            children: 'children',
            label: 'name'
        },
        defaultexpandedKeys:['0'],
        curNode:{  //当前点击节点
            id:'1',
            name:'一级 1',
            children: []
        },
        curNodeKey:'0',  //当前选中节点
        curNodeUserList:[],  //当前树节点用户列表
        userPageSize:15,  //当前树节点用户列表每页显示条数
        // userCurPage:1,  //当前树节点用户列表当前页
        userTotalPage:0,  //当前树节点用户列表总页数
        curNodeUserListLoading:true,  //当前树节点用户列表loading 显示隐藏
        curClickUser:{},  //当前点击用户
        departNewName:'',  //修改的部门新名称
        addDepartName:'',  //添加的新部门名称
        treePullMenuShow:false,  //树节点下拉菜单 显示隐藏
        memberOperMenuShow:false,  //每个成员操作菜单 显示隐藏
        addDepartShow:false,  //添加部门弹出框 显示隐藏

        addProduct_show:false,  //添加产品弹出框 显示隐藏
    },
    created:function(){
        this.getAllClass();
    },
    methods:{
        getAllClass:function(){  //获取分类
            var _this=this;
            this.$http.get('/api/product/getAllClass').then(function(res){
                if(res.code==0){
                    var allClass=res.data;

                    _this.allClass=allClass;
                }else{

                }
            }, function(err){
                console.log(err);
            });
        },
        handleNodeClick:function(data) {
            // console.log(data);

        },
        showAddProduct:function(addProduct_show){  //显示隐藏 添加产品弹出框
            this.addProduct_show=addProduct_show;
        },
        toDetailPage:function(e){  //to产品详情页
            window.location.href='/cms/productMana/detail';
        },
        // async getStructure(){  //获取组织的树
        //     let _this=this,response,_response;
        //
        //     try {
        //         response = await fetch('api1/structure/list', {
        //             method: 'GET',
        //             headers: getHeaders_noLog(),
        //             credentials: 'same-origin',
        //             // body:JSON.stringify({
        //             //
        //             // })
        //         });
        //         _response = await response.json();
        //         _this.dataLoading=false;
        //         if(_response.code ===0 ){
        //             let structureData=[{
        //                 id:'0',
        //                 name:'全部',
        //                 children:[]
        //             }];
        //             structureData[0].children=_response.data;
        //             _this.data=structureData;
        //             _this.memberMove_Data=JSON.parse(JSON.stringify(_response.data))
        //
        //             //默认显示全部成员
        //             let idArray=[],ids='';
        //             getNodesIdArray(structureData,idArray);
        //             ids=idArray.join(',');
        //             _this.getCurNodeUserList(ids)
        //
        //         }else if(_response.code===200){
        //             _this.curNodeUserListLoading=false;
        //         }else{
        //             _this.$message.error(_response.msg);
        //         }
        //     } catch(err) {}
        // },
        // async getCurNodeUserList(ids){  //获取当前树节点用户列表
        //     let _this=this,response,_response;
        //     let page_limit=this.userPageSize,
        //         page=_this.userCurPage;
        //
        //     try {
        //         response = await fetch('api1/structure/user/list?page_limit='+page_limit+'&page='+page, {
        //             method: 'POST',
        //             headers: getHeaders_noLog(),
        //             credentials: 'same-origin',
        //             body:JSON.stringify({
        //                 ids:ids,
        //                 page_limit:page_limit,
        //                 page:page
        //             })
        //         });
        //         _response = await response.json();
        //         _this.curNodeUserListLoading=false;
        //         console.log(_this.curNodeUserListLoading)
        //         console.log(_this.dataLoading)
        //         if(_response.code ===0 ){
        //             let curNodeUserList=_response.data.data;
        //             _this.curNodeUserList=curNodeUserList;
        //             _this.userTotalPage=_response.data.total;
        //         }else{
        //             _this.$message.error(_response.msg);
        //         }
        //     } catch(err) {}
        // },
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