
var carousel_main=new Vue({
    el:'#carousel_main',
    delimiters:['~{','}'],
    data:{
        tab:0,  //选项卡，0首页、1产品
        homeCarouselList:[],  //首页轮播图列表
        productCarouselList:[],  //产品轮播图列表
        curClickItem:{},  //当前点击项
        oldItem:{}, //编辑时保存旧项，用于还原
        //添加轮播图 弹出框
        addCarouselShow:false,
        target_url:'',
        // picture_url:'',
    },
    computed:{
        carouselList:function(){
            var tab=this.tab;
            var homeCarouselList=this.homeCarouselList;
            var productCarouselList=this.productCarouselList;
            var carouselList=tab==0?homeCarouselList:
                                tab==1?productCarouselList:[];

            return carouselList;
        }
    },
    created:function(){
        this.getHomeCarouselList()
        this.getProductCarouselList();
    },
    mounted:function() {
        this.getQiNiuToken();
    },
    methods:{
        //异步方法
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
        getHomeCarouselList:function(){  //获得首页轮播图列表
            var _this=this;
            var banner_type='home_banner';
            var url='/api/product/getBanner?banner_type='+banner_type;
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var homeCarouselList=_res.data;
                    for(var i=0,len=homeCarouselList.length;i<len;i++){
                        homeCarouselList[i].state=0;
                    }

                    _this.homeCarouselList=homeCarouselList;
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        getProductCarouselList:function(){  //获得产品轮播图列表
            var _this=this;
            var banner_type='pro_banner';
            var url='/api/product/getBanner?banner_type='+banner_type;
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var productCarouselList=_res.data;
                    for(var i=0,len=productCarouselList.length;i<len;i++){
                        productCarouselList[i].state=0;
                    }

                    _this.productCarouselList=productCarouselList;
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        del:function(item,index){  //删除轮播图
            var _this=this;
            var banner_id=item.id;
            var url='/cms/setting/api_delete_banner?banner_id='+banner_id
            this.$http.get(url).then(function(res){
                var _res=res.body;
                if(_res.code===0){
                    var tab=_this.tab;
                    if(tab==0){
                        _this.homeCarouselList.splice(index,1);
                    }else if(tab==1){
                        _this.productCarouselList.splice(index,1);
                    }
                }
            }, function(err){
                console.log(err);
            });
        },
        save:function(item){
            var _this=this;
            var data={
                banner_id:item.id,
                target_url:item.value.target_url,
                picture_url:item.value.picture_url
            };
            var url='/cms/setting/api_update_banner';
            this.$http.post(url,data, {emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code==0){
                    var tab=_this.tab;
                    if(tab==0){
                        _this.getHomeCarouselList();
                    }else if(tab==1){
                        _this.getProductCarouselList();
                    }
                    _this.$message('修改成功');
                }
                else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        addCarousel:function(e){  //添加轮播图
            var _this=this;
            var tab=this.tab;
            var url='/cms/setting/api_add_banner';
            var banner_type=tab==0?'home_banner':
                                tab==1?'pro_banner':'';
            var data={
                banner_type:banner_type,
                target_url:this.target_url,
                picture_url:'123',
            };
            this.$http.post(url,data,{emulateJSON:true}).then(function(res){
                var _res=res.body;
                if(_res.code===0){
                    if(tab==0){
                        _this.getHomeCarouselList();
                    }else if(tab==1){
                        _this.getHomeCarouselList();
                    }
                    _this.addCarouselShow=false;
                    _this.$message('添加成功');
                }else{
                    _this.$message(_res.msg);
                }
            }, function(err){
                console.log(err);
            });
        },
        //普通方法
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
                        });
                    },
                    'BeforeUpload': function(up, file) {
                        // 每个文件上传前,处理相关的事情
                        // console.log('BeforeUpload')
                    },
                    'UploadProgress': function(up, file) {
                        // 每个文件上传时,处理相关的事情
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
                        // var res = JSON.parse(info);
                        // var sourceLink = domain + res.key; //获取上传成功后的文件的Url
                        var res=JSON.parse(info);
                        var imgUrl='http://otw5eymk3.bkt.gdipper.com/'+res.key;

                        _this.curClickItem.value.picture_url=imgUrl;
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
        switchTab:function(tabId){
            this.tab=tabId;
        },
        showAddCarousel:function(addCarouselShow,e){  //添加弹出框 显示隐藏
            this.addCarouselShow=addCarouselShow;
        },
        edit:function(item){  //编辑
            this.curClickItem=item;
            this.oldItem=JSON.parse(JSON.stringify(item));
            var tab=this.tab;
            var list=[];
            if(tab==0){  //首页
                list=this.homeCarouselList;
            }else if(tab==1){  //产品
                list=this.productCarouselList;
            }
            for(var i=0,len=list.length;i<len;i++){
                list[i].state=0;
                if(list[i].id==item.id){
                    list[i].state=1;
                }
            }
        },
        cancel:function(index){
            var tab=this.tab;
            if(tab==0){  //首页
                Vue.set(this.homeCarouselList,index,this.oldItem);
            }else if(tab==1){  //产品
                Vue.set(this.productCarouselList,index,this.oldItem);
            }
        },
        del_btn:function(item,index,e){  //删除轮播图 按钮
            var _this=this;
            this.$confirm('确定删除该轮播图吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.del(item,index);
            }).catch(() => {

            });
        },
    }
})