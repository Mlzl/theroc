
var support=new Vue({
    el:'#support_main',
    delimiters:['~{','}'],
    data:{
        activeTab:'refunds-tab',
        orderValue:'',  //订单详情内容
        issueValue:'',  //产品描述内容
        imageList:[],  //图片列表
    },
    created:function(){

    },
    mounted:function(){
        this.getQiNiuToken()
    },
    methods:{
        //异步请求方法
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
        commitReturn:function(){  //提交退款
            var _this=this;
            var _data={
                order_detail:this.orderValue,
                product_detail:this.issueValue,
                images:this.imageList.join(',')
            }
            var url='/api/service/addRefund'
            // console.log(_data)
            this.$http.post(url,_data,{emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    _this.reset();
                    _this.$message('提交退款成功');
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        //普通方法
        clickTab:function(tabId){  //点击tab
            this.activeTab=tabId;
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
                        _this.imageList.push(prefix_url+res.key);

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
        deleteImage:function(index){  //删除某张图片
            var imageList=this.imageList;
            imageList.splice(index,1);
        },
        reset:function(){  //重置
            this.orderValue='';
            this.issueValue='';
            this.imageList=[];
        },
        commitReturnBtn:function(e){  ////提交退款 按钮
            var orderValue=this.orderValue;
            var issueValue=this.issueValue;
            var imageList=this.imageList;

            if(orderValue==''||orderValue.trim()==''){
                this.$message('order details can not be empty');
            }else if(issueValue==''||issueValue.trim()==''){
                this.$message('issue details can not be empty');
            }else{
                this.commitReturn();
            }
        }
    }
})
