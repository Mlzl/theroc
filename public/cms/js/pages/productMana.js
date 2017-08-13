
var productMana_main=new Vue({
    el:'#productMana_main',
    delimiters:['~{','}'],
    data:{
        // curNodeUserListLoading:true,  //当前树节点用户列表loading 显示隐藏
        //左侧树数据（分类）
        tree_data:[{  //分类,左侧树数据
            id:'0',
            name:'全部',
            child:[]
        }],
        defaultexpandedKeys:['0'],
        curNodeKey:'0',  //当前选中节点
        defaultProps: {
            children: 'child',
            label: 'name'
        },
        curNode:{  //当前点击节点
            id:'0',
            name:'全部',
            child: []
        },
        //产品列表
        curProductList:[],  //当前分类产品列表
        curProductList_size:10,  //当前分类产品列表每页显示条数
        curProductList_page:1,  //当前分类产品列表当前页
        curProductList_total:0,  //当前分类产品列表总条数
        curClickProduct:{},  //当前点击产品
        //添加、修改分类 弹出框
        addOrModify:0,  //添加或修改，0添加，1修改
        addClass_show:false,  //添加分类弹出框 显示隐藏
        class_name:'',  //分类名称
        //添加产品 弹出框
        addProduct_show:false,  //添加产品弹出框 显示隐藏
        product_name:'',  //产品标题
        custom_attr:'',  //自定义属性
        target_url:'',  //跳链url
        //添加价格 弹出框
        addPrice_show:false,  //添加价格弹出框 显示隐藏
        price_attr:'',  //价格属性
        price:'',  //价格
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
                    var curProductList=_res.data.list;
                    var curProductList_total=_res.data.total;
                    for(var i=0,len=curProductList.length;i<len;i++){
                        var attr=curProductList[i].attr;
                        pubMethod.bubbleSort(attr,'price');
                        if(attr.length==0){
                            curProductList[i].price='-';
                        }else if(attr.length==1){
                            curProductList[i].price='$'+attr[0].price;
                        }else{
                            curProductList[i].price='$'+attr[0].price+'~$'+attr[attr.length-1].price;
                        }
                    }

                    _this.curProductList=curProductList;
                    _this.curProductList_total=curProductList_total;
                    console.log(curProductList)
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
                    _this.getCurProductList();
                    _this.addProduct_show=false;
                    _this.$message('添加成功');
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        addPrice:function(){  //添加价格
            var _this=this;
            var _data={
                product_id:this.curClickProduct.product_id,
                name:this.price_attr,
                price:this.price
            }
            var url='/cms/productattribute/api_add';
            this.$http.post(url,_data, {emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    _this.getCurProductList();
                    _this.addPrice_show=false;
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
        showAddPrice:function(addPrice_show,curClickProduct){  //显示隐藏 添加价格弹出框
            this.addPrice_show=addPrice_show;
            this.curClickProduct=curClickProduct;
        },
        curProductChange(val){  //产品列表翻页时
            this.curProductList_page=val;
            this.getCurProductList();
        },
        toDetailPage:function(product_id,e){  //to产品详情页
            window.location.href='/cms/productMana/detail?product_id='+product_id;
        },
    }
})