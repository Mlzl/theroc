
var quill;
var product_detail_main=new Vue({
    el:'#product_detail_main',
    delimiters:['~{','}'],
    data:{
        tab:0,  //选项卡，0基本资料、1图文详情、2评价列表
        loading:false,  //是否加载中
        isEdit:false,  //是否处于编辑状态
        productDetail:{},  //产品详情
        productDetail_edit:{},  //产品详情 编辑
        //评论列表
        commentList:[],  //评论列表
        commentList_size:10,  //评论列表每页显示条数
        commentList_page:1,  //评论列表当前页
        commentList_total:0,  //评论列表总条数
        //修改价格 弹出框
        modifyPrice_show:false,  //添加价格弹出框 显示隐藏
        price_attr:'',  //价格属性
        price:'',  //价格
        curClickAttr:{},
    },
    computed: {
        product_id: function () {
            return pubMethod.getQueryParam().product_id;
        }
    },
    created:function(){
        this.getProductDetail();
        this.getCommentList();
    },
    mounted:function(){
        this.getQiNiuToken();
        this.initQuill();
    },
    methods:{
        //异步请求方法
        getProductDetail:function(){  //获取产品详情
            var _this=this;
            var url='/api/product/getProductDetail?product_id='+this.product_id;
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var productDetail=_res.data;
                    var picture_url=productDetail.picture_url;
                    productDetail._picture_url=picture_url?picture_url.split(','):[];
                    // console.log(productDetail)
                    quill.root.innerHTML=productDetail.img_txt_detail
                    _this.productDetail=productDetail;
                    _this.productDetail_edit=JSON.parse(JSON.stringify(productDetail));
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        getCommentList:function(){  //获取评论列表
            var _this=this;
            var product_id=this.product_id;
            var commentList_size=this.commentList_size;
            var commentList_page=this.commentList_page;
            var url='/api/product/getComments?product_id='+product_id+'&page='+commentList_page+'&size='+commentList_size;
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var commentList=_res.data.list;
                    var commentList_total=_res.data.total;

                    _this.commentList=commentList;
                    _this.commentList_total=commentList_total;
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        getQiNiuToken:function(){  //获取qiniu token
            var _this=this;
            var url='/api/auth/getQiNiuToken';
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var upload_token=_res.data.upload_token;

                    _this.initImageUpload(upload_token)
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        editData_save:function(){  //编辑基本资料 保存
            var _this=this;
            var productDetail_edit=this.productDetail_edit;
            var _data={
                product_id:productDetail_edit.product_id,
                class_id:productDetail_edit.class_id,
                name:productDetail_edit.name,
                product_label:productDetail_edit.label,
                target_url:productDetail_edit.target_url,
                picture_url:productDetail_edit._picture_url.join(',')
            }
            var url='/cms/product/api_update_product';
            // console.log(_data)
            this.$http.post(url,_data, {emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    _this.getProductDetail();
                    _this.isEdit=false;
                    _this.$message('保存成功');
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        imageText_save:function(){  //编辑图文详情 保存
            var _this=this;
            var productDetail_edit=this.productDetail_edit;
            var quill_html = quill.root.innerHTML;
            // console.log(quill_inner)
            var _data={
                product_id:productDetail_edit.product_id,
                class_id:productDetail_edit.class_id,
                img_txt_detail:quill_html
            }
            var url='/cms/product/api_update_product';
            // console.log(_data)
            this.$http.post(url,_data, {emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    _this.getProductDetail();
                    _this.isEdit=false;
                    _this.$message('保存成功');
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        delComment:function(item,index){  //
            var _this=this;
            var comment_id=item.id;
            var url='/cms/product/api_delete_comments?comment_id='+comment_id
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code===0){
                    _this.commentList.splice(index,1);
                }
            }, function(err){
                console.log(err);
            });
        },
        modifyPrice:function(){  //
            var _this=this;
            var _data={
                product_id:this.product_id,
                attribute_id:this.curClickAttr.id,
                name:this.price_attr,
                price:this.price
            }
            var url='/cms/productattribute/api_update';
            this.$http.post(url,_data, {emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var attr=_this.productDetail_edit.attr;
                    for(var i=0,len=attr.length;i<len;i++){
                        if(attr[i].id==_this.curClickAttr.id){
                            attr[i].name=_this.price_attr;
                            attr[i].price=_this.price;
                        }
                    }
                    _this.productDetail_edit.attr=attr;
                    _this.productDetail.attr=attr;
                    _this.modifyPrice_show=false;
                    _this.$message('修改成功');
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        delAttr:function(attribute_id,index){  //
            var _this=this;
            var url='/cms/productattribute/api_delete?attribute_id='+attribute_id
            this.$http.get(url).then(function(res){
                var _res=res.body;
                // if(_res.code===0){
                //
                // }
                _this.productDetail_edit.attr.splice(index,1);
                _this.productDetail.attr.splice(index,1);
            }, function(err){
                console.log(err);
            });
        },
        //普通方法
        switchTab:function(tab){  //切换选项卡
            this.tab=tab;
        },
        switchEdit:function(isEdit){  //更改编辑状态
            this.isEdit=isEdit;
            var tab=this.tab;
            if(tab==0){  //基本资料
                this.productDetail_edit=JSON.parse(JSON.stringify(this.productDetail))
            }else if(tab==1){  //图文详情

            }else if(tab==2){  //评价管理

            }
        },
        initQuill:function(){  //初始化quill富文本编辑器
            var _this=this;
            quill = new Quill('#editor', {
                theme: 'snow',
                modules: {
                    toolbar: {
                        container: [
                            ['bold', 'underline', 'strike'],        // toggled buttons
                            ['blockquote', 'code-block'],

                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

                            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                            [{ 'font': [] }],
                            [{ 'align': [] }],

                            ['clean'],                                        // remove formatting button

                            ['link','image']
                        ],
                        handlers: {
                            'image':function(value){
                                if(value){
                                    _this.imageUpload();
                                }else{

                                }
                            }
                        }
                    },
                    imageResize: {
                        displaySize: true
                    }
                }
            });
        },
        initImageUpload:function(upload_token){  //图片上传
            var _this=this;
            //引入Plupload 、qiniu.js后
            var uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4',    //上传模式,依次退化
                browse_button: 'imageUploadBtn',       //上传选择的点选按钮，**必需**
                // uptoken_url: 'api1/common/qiniu/token',            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                uptoken : upload_token, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
                // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
                domain: 'http://qiniu-plupload.qiniudn.com/',   //bucket 域名，下载资源时用到，**必需**
                get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
                container: 'imageUploadDiv',           //上传区域DOM ID，默认是browser_button的父元素，
                max_file_size: '100mb',           //最大文件体积限制
                flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
                max_retries: 3,                   //上传失败最大重试次数
                // dragdrop: true,                   //开启可拖曳上传
                // drop_element: 'pickfiles',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb',                //分块上传时，每片的体积
                auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                filters : {
                    max_file_size : '100mb',
                    prevent_duplicates: true,
                    // Specify what files to browse for
                    mime_types: [
                        {title : "img files", extensions : "png,jpg,jpeg"}, // 限定img后缀上传格式上传
                    ]
                },
                init: {
                    'FilesAdded': function(up, files) {
                        plupload.each(files, function(file) {
                            // 文件添加进队列后,处理相关的事情
                        });
                    },
                    'BeforeUpload': function(up, file) {
                        // 每个文件上传前,处理相关的事情
                        _this.loading=true;
                    },
                    'UploadProgress': function(up, file) {
                        // 每个文件上传时,处理相关的事情
                    },
                    'FileUploaded': function(up, file, info) {
                        // 每个文件上传成功后,处理相关的事情
                        // var domain = up.getOption('domain');
                        // var res = parseJSON(info.response);
                        // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
                        _this.loading=false;
                        var res = JSON.parse(info);
                        var tab=_this.tab;
                        var prefix_url='http://otw5eymk3.bkt.gdipper.com/';

                        if(tab==0){  //基本资料
                            _this.productDetail_edit._picture_url.push(prefix_url+res.key)
                        }else if(tab==1){  //图文详情
                            var range = quill.getSelection(true);
                            var length = range.index;
                            quill.insertEmbed(length, 'image', prefix_url+res.key);
                        }
                        _this.$message.success('上传成功');
                    },
                    'Error': function(up, err, errTip) {
                        //上传出错时,处理相关的事情
                        if(err.code==-602){
                            _this.$message.error('复制文件出错，请刷新页面后再上传');
                        }else if(err.code==-601){
                            _this.$message.error('上传文件格式错误');
                        }else if(err.code==-200){
                            _this.$message.error('文件已存在');
                        }
                        console.log(err)
                    },
                    'UploadComplete': function() {
                        //队列文件处理完毕后,处理相关的事情
                    },
                    // 'Key': function(up, file) {
                    //     // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                    //     // 该配置必须要在 unique_names: false , save_key: false 时才生效
                    //
                    //     var key = "";
                    //     // do something with key here
                    //     return key
                    // }
                }
            });
            // domain 为七牛空间（bucket)对应的域名，选择某个空间后，可通过"空间设置->基本设置->域名设置"查看获取
            // uploader 为一个plupload对象，继承了所有plupload的方法，参考http://plupload.com/docs
        },
        imageUpload:function(e){  //图片上传
            var imageUploadBtn=document.getElementById('imageUploadBtn');
            imageUploadBtn.click();
        },
        deleteCoverImg:function(item,e){  //删除封面图
            var _picture_url=this.productDetail_edit._picture_url;
            for(var i=0,len=_picture_url.length;i<len;i++){
                if(_picture_url[i]==item){
                    _picture_url.splice(i,1);
                    break;
                }
            }
        },
        save_btn:function(e){  //保存 按钮
            var tab=this.tab;
            if(tab==0){  //基本资料
                this.editData_save();
            }else if(tab==1){  //图文详情
                this.imageText_save();
            }else if(tab==2){

            }
        },
        commentChange(val){  //评论列表翻页时
            this.commentList_page=val;
            this.getCommentList();
        },
        del_btn:function(item,index,e){  //删除轮播图 按钮
            var _this=this;
            this.$confirm('确定删除该评论吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.delComment(item,index);
            }).catch(() => {

            });
        },
        showModifyPrice:function(modifyPrice_show,item){  //显示隐藏 修改价格弹出框
            this.modifyPrice_show=modifyPrice_show;
            if(modifyPrice_show){
                this.curClickAttr=item;
                this.price_attr=item.name;
                this.price=item.price;
            }
        },
    }
})