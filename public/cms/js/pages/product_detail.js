
var product_detail_main=new Vue({
    el:'#product_detail_main',
    delimiters:['~{','}'],
    data:{
        tab:0,  //选项卡，0基本资料、1图文详情
        loading:false,  //是否加载中
        isEdit:false,  //是否处于编辑状态
        productDetail:{},  //产品详情
        productDetail_edit:{},  //产品详情 编辑
    },
    computed: {
        product_id: function () {
            return pubMethod.getQueryParam().product_id;
        }
    },
    created:function(){
        this.getProductDetail();
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

                    _this.productDetail=productDetail;
                    _this.productDetail_edit=JSON.parse(JSON.stringify(productDetail));
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
            var quill = new Quill('#editor', {
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

                        _this.productDetail_edit._picture_url.push('http://otw5eymk3.bkt.gdipper.com/'+res.key)
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
        save_btn:function(e){
            var tab=this.tab;
            if(tab==0){
                this.editData_save();
            }else if(tab==1){

            }else if(tab==2){

            }
        }
    }
})