
var carousel_main=new Vue({
    el:'#carousel_main',
    delimiters:['~{','}'],
    data:{
        activeTab:'carousel_home',
        addCarousel:false,
        homeProductList:null,
        productProductList:null,
        targetProductList:null,
        dialogTitle:'添加首页轮播图',
        oldItem:{}, //编辑时保存旧项，用于还原
        targetIndex:null,   //编辑时的索引
        addItem:{}, //新增对象,
        actionType:null
    },
    created:function(){
        this.getBanner();

    },
    mounted:function() {
        this.getQiNiuToken();
    },
    methods:{
        getQiNiuToken:function(){
            var that=this;
            this.$http.get('/api/auth/getQiNiuToken').then(function(res){
                var _res=res.body;
                if(_res.code===0){
                    that.initImageUpload(_res.data.upload_token);
                }
            }, function(err){
                console.log(err);
            });
        },
        initImageUpload:function(uptoken){  //图片上传
            var _this=this;
            //引入Plupload 、qiniu.js后
            var uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4',    //上传模式,依次退化
                browse_button: 'imageUploadBtn',       //上传选择的点选按钮，**必需**
                // uptoken_url: '/api/auth/getQiNiuToken',            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                // uptoken : '', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                uptoken:uptoken,
                unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
                // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
             //   domain: 'http://qiniu-plupload.qiniudn.com/',   //bucket 域名，下载资源时用到，**必需**
               domain:'http://upload-na0.qiniu.com',
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
                            // let uploadFiles=files;
                            // for(let i=0,len=uploadFiles.length;i<len;i++){
                            //     uploadFiles[i].percent=0;
                            // }
                            // _this.$store.commit('showUploadProgress',true);
                            // _this.$store.commit('setUploadFiles',uploadFiles);
                        });
                    },
                    'BeforeUpload': function(up, file) {
                        // 每个文件上传前,处理相关的事情
                        // console.log('BeforeUpload')
                    },
                    'UploadProgress': function(up, file) {
                        // 每个文件上传时,处理相关的事情
                        // console.log(up)
                        // console.log(file)
                        //console.log(file.percent)
                        // let uploadFiles=_this.$store.state.uploadFiles;
                        // for(let i=0,len=uploadFiles.length;i<len;i++){
                        //     if(uploadFiles[i].id==file.id){
                        //         uploadFiles[i].percent=file.percent;
                        //         break;
                        //     }
                        // }
                        // _this.$store.commit('setUploadFiles',uploadFiles);
                    },
                    'FileUploaded': function(up, file, info) {
                        // 每个文件上传成功后,处理相关的事情
                        // 其中 info 是文件上传成功后，服务端返回的json，形式如
                        // {
                        //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                        //    "key": "gogopher.jpg"
                        //  }
                        // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

                        // var domain = up.getOption('domain');
                     ///   var res = JSON.parse(info);
                        // var sourceLink = domain + res.key; //获取上传成功后的文件的Url
                        //console.log('http://onbcey73z.bkt.clouddn.com/'+res.key)
                        // let uploadFiles=_this.$store.state.uploadFiles;
                        // if(up.total.uploaded==uploadFiles.length-1){  //全部文件上传成功
                        //     _this.$store.commit('setFilesUploadSuccess');
                        // }
                        var res=JSON.parse(info);
                        var imgUrl='http://otw5eymk3.bkt.gdipper.com/'+res.key;
                        if(_this.actionType==='add'){
                            _this.addItem.picture_url=imgUrl;
                        }
                        else{
                            _this.targetProductList[_this.targetIndex].picture_url = imgUrl;
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
        getBanner:function(){
            var banner_type;
            if(this.activeTab==='carousel_home'){
                banner_type='home_banner';
            }
            else{
                banner_type='pro_banner';
            }
            var that=this;
            this.$http.get('/api/product/getBanner',{params:{banner_type:banner_type}}).then(function(res){
                var _res=res.body;
                that.converseData(_res.data);
                that.setTargetList();
            }, function(err){
                console.log(err);
            });
        },
        clickMyUpload:function(actionType){
            this.actionType=actionType;
            var imageUploadBtn=document.getElementById('imageUploadBtn');
            imageUploadBtn.click();
        },
        openTab:function(tabId){
            this.activeTab=tabId;
            this.getBanner();
            this.reset();
        },
        /**
         * 重置一些变量
         */
        reset:function(){
            this.oldItem={};
            this.targetIndex=null;
            this.addItem={};
            this.actionType=null;
        },
        /**
         *   转化成前台格式
         */
        converseData:function(list){
            if(this.activeTab==='carousel_home') {
                this.homeProductList=[];
                for (var i = 0; i < list.length; i++) {
                    this.homeProductList.push({
                        state:'read',
                        banner_id:list[i].id,
                        target_url:list[i].value.target_url,
                        picture_url:list[i].value.picture_url
                    });
                }
            }
            else{
                this.productProductList=[];
                for (var i = 0; i < list.length; i++) {
                    this.productProductList.push({
                        state:'read',
                        banner_id:list[i].id,
                        target_url:list[i].value.target_url,
                        picture_url:list[i].value.picture_url
                    });
                }
            }
        },
        setTargetList:function(){
          if(this.activeTab==='carousel_home'){
              this.targetProductList=this.homeProductList;
          }
          else{
              this.targetProductList=this.productProductList;
          }
        },
        //弹窗
        showDialog:function(){
            this.addItem={
                target_url:'',
                picture_url:undefined
            };
            if(this.activeTab==='carousel_home')
            {
               dialogTitle='添加首页轮播图';
               this.addItem.banner_type='home_banner';
            }
            else{
                dialogTitle='添加产品轮播图';
                this.addItem.banner_type='pro_banner';
            }
            this.addCarousel=true;
        },
        closeDialog:function(){
           this.addCarousel=false;
        },
        //编辑
        edit:function(index){
            if(this.targetIndex!=null) {
                //还原上条编辑状态记录
                Vue.set(this.targetProductList,this.targetIndex,JSON.parse(JSON.stringify(this.oldItem)));
            }
            this.oldItem=JSON.parse(JSON.stringify(this.targetProductList[index]));
            this.targetProductList[index].state = 'edit';
            this.targetIndex=index;
        },
        del:function(index){
            var data={
                banner_id:this.targetProductList[index].banner_id
            };
            var that=this;
            this.$http.get('/cms/setting/api_delete_banner',{params:data}).then(function(res){
                var _res=res.body;
                if(_res.code===0){
                    that.targetProductList.splice(index,1);
                }
            }, function(err){
                console.log(err);
            });
        },
        cancel:function(index){
            Vue.set(this.targetProductList,index,this.oldItem);
            this.targetIndex=null;
            this.oldItem=null;
        },
        save:function(index){
            var that=this;
            // POST /someUrl
            var data=this.targetProductList[index];
            this.$http.post('/cms/setting/api_update_banner',data, {emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    that.getBanner();
                }
                else{
                    that.$message(_res.msg);

                }
            }, function(err){
                console.log(err);
            });
        },
        /**
         * 增加
         */
        addCarouselMethod:function(){
            var data=this.addItem;
            var that=this;
            this.$http.post('/cms/setting/api_add_banner',data,{emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code===0){
                    that.getBanner();
                    that.addCarousel=false;
                }
            }, function(err){
                console.log(err);
            });
        }

    }
})