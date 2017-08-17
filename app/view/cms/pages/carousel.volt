<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/cms/css/pages/carousel.css" >
</head>
<body>
    <div id="carousel">
        <!--隐藏部分-->
        <div id="imageUploadDiv" style="display:none;">
            <p id="imageUploadBtn">上传图片</p>
        </div>
        <!--头部栏-->
        {% include "smart/topBar.volt" %}
        <!--侧边栏-->
        {% include "smart/sideBar.volt" %}
        <!--主要区域-->
        <div id="carousel_main"  v-cloak>
            <div class="product_menu">
              <div class="tab clearfix">
                    <div  class="tab_item " :class="activeTab==='carousel_home'?'active_item':''" id="carousel_home" @click="openTab('carousel_home')">首页</div>
                    <div class="tab_item" :class="activeTab==='carousel_product'?'active_item':''" id="carousel_product" @click="openTab('carousel_product')">产品</div>
              </div>
                <div class="btn_group">
                    <button class="btn" @click="showDialog()">添加</button>
                </div>

            </div>
            <div class="home_content product_table" v-show="activeTab==='carousel_home'">
                <div class="thead">
                    <span>序号</span>
                    <span>链接</span>
                    <span>预览</span>
                    <span>操作</span>
                </div>
                <div class="tbody">
                    <p v-for="(item,index) in homeProductList">
                        <span class="field">~{index+1}</span>
                        <span class="field">
                            <span v-show="item.state==='read'">~{item.target_url}</span>
                            <input v-show="item.state==='edit'" type="text" :value="item.target_url">
                        </span>
                        <span class="field">
                            <span class="img_wrapper">
                                <img :src="item.picture_url" alt="product">
                                <span class="mask" v-show="item.state==='edit'">
                                    <img src="/images/upload.png" alt="上传" @click="clickMyUpload(edit)">
                                </span>
                            </span>
                        </span>
                        <span class="field">
                            <span v-show="item.state==='read'" class="btn edit" @click="edit(index)">编辑</span>
                            <span v-show="item.state==='read'" class="btn del" @click="del(index)">删除</span>
                            <span v-show="item.state==='edit'" class="btn del" @click="cancel(index)">取消</span>
                            <span v-show="item.state==='edit'" class="btn del" @click="save(index)">保存</span>
                        </span>
                    </p>
                </div>
            </div>
            <div class="product_content product_table" v-show="activeTab==='carousel_product'">
                <div class="thead">
                    <span>序号</span>
                    <span>链接</span>
                    <span>预览</span>
                    <span>操作</span>
                </div>
                <div class="tbody">
                    <p v-for="(item,index) in productProductList">
                        <span class="field">~{index+1}</span>
                        <span class="field">
                            <span v-show="item.state==='read'">~{item.target_url}</span>
                            <input v-show="item.state==='edit'" type="text" :value="item.target_url">
                        </span>
                        <span class="field">
                            <span class="img_wrapper">
                                <img :src="item.picture_url" alt="product">
                                <span class="mask" v-show="item.state==='edit'">
                                    <img src="/images/upload.png" alt="上传" @click="clickMyUpload('edit')">
                                </span>
                            </span>
                        </span>
                        <span class="field">
                            <span v-show="item.state==='read'" class="btn edit" @click="edit(index)">编辑</span>
                            <span v-show="item.state==='read'" class="btn del" @click="del(index)">删除</span>
                            <span v-show="item.state==='edit'" class="btn del" @click="cancel(index)">取消</span>
                            <span v-show="item.state==='edit'" class="btn del" @click="save(index)">保存</span>
                        </span>
                    </p>
                </div>
            </div>
            <!--对话框-->
            <el-dialog :title="dialogTitle" :visible.sync="addCarousel">
                <div>
                    <input type="text" v-model="addItem.target_url">
                    <p @click="clickMyUpload('add')">
                        <img :src="addItem.picture_url" alt="轮播图" @click="clickMyUpload('add')" v-show="addItem.picture_url!=null">
                    </p>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="addCarouselMethod()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
    <!-- vue -->
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script type="text/javascript" src="/plugin/vue-resource/dist/vue-resource.js"></script>
    <!-- element ui -->
    <script src="/plugin/element-ui/lib/index.js"></script>
    <!-- qiniu -->
    <!-- plupload -->
    <script src="/plugin/plupload-2.1.x/moxie.js"></script>
    <script src="/plugin/plupload-2.1.x/plupload.dev.js"></script>
    <!-- qiniu -->
    <script src="/plugin/qiniu-1.0.19/qiniu.js"></script>
    <!-- private -->
    <script type="text/javascript" src="/cms/js/common/common.js"></script>
    <script type="text/javascript" src="/cms/js/pages/carousel.js"></script>
</body>
</html>