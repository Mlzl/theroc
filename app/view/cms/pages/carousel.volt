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
            <div class="head">
                <ul class="tab_ul">
                    <li :class="{active:tab===0}"  @click="switchTab(0)">首页</li>
                    <li :class="{active:tab===1}" @click="switchTab(1)">产品</li>
                </ul>
                <el-button @click="showAddCarousel(true)">添加</el-button>
            </div>
            <div class="carousel_table">
                <div class="carousel_thead">
                    <p>
                        <span>序号</span>
                        <span>链接</span>
                        <span>预览(1366*342)</span>
                        <span>操作</span>
                    </p>
                </div>
                <div class="carousel_tbody">
                    <p v-for="(item,index) in carouselList">
                        <span>~{index+1}</span>
                        <template v-if="item.state===0">
                            <span>~{item.value.target_url}</span>
                            <span >
                                <img :src="item.value.picture_url">
                            </span>
                            <span>
                                <el-button @click="edit(item)">编辑</el-button>
                                <el-button @click="del_btn(item,index)">删除</el-button>
                            </span>
                        </template>
                        <template v-else-if="item.state===1">
                            <span>
                                <input type="text" v-model="item.value.target_url">
                            </span>
                            <span >
                                <img class="upload" :src="item.value.picture_url" @click="imageUpload('edit')">
                            </span>
                            <span>
                                <el-button @click="save(item)">保存</el-button>
                                <el-button @click="cancel(index)">取消</el-button>
                            </span>
                        </template>
                    </p>
                </div>
            </div>
            <!--添加弹出框-->
            <el-dialog title="添加" v-model="addCarouselShow" custom-class="addCarousel_dialog"
                       :show-close=false :close-on-click-modal=false>
                <div class="addCarousel_dialog_main">
                    <input type="text" v-model="target_url">
                    <!--<img :src="picture_url" @click="imageUpload('add')">-->
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showAddCarousel(false)">取 消</el-button>
                    <el-button type="primary" @click="addCarousel">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
    <!-- vue -->
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script type="text/javascript" src="/plugin/vue-resource/dist/vue-resource.js"></script>
    <!-- element ui -->
    <script src="/plugin/element-ui/lib/index.js"></script>
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