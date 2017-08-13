<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="https://cdn.quilljs.com/1.3.1/quill.snow.css" rel="stylesheet">
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/cms/css/pages/product_detail.css" >
</head>
<body>
    <div id="product_detail">
        <!--隐藏部分-->
        <div id="imageUploadDiv" style="display:none;">
            <p id="imageUploadBtn">上传图片</p>
        </div>
        <!--头部栏-->
        {% include "smart/topBar.volt" %}
        <!--侧边栏-->
        {% include "smart/sideBar.volt" %}
        <div id="product_detail_main">
            <div class="head">
                <ul class="tab_ul">
                    <li :class="{active:tab==0}" @click="switchTab(0)">基本资料</li>
                    <li :class="{active:tab==1}" @click="switchTab(1)">图文详情</li>
                </ul>
                <div class="operation_btn">
                    <template v-if="!isEdit">
                        <el-button type="text" @click="switchEdit(true)">编辑</el-button>
                    </template>
                    <template v-else>
                        <el-button @click="switchEdit(false)">取消</el-button>
                        <el-button type="primary">保存</el-button>
                    </template>
                </div>
            </div>
            <!--基本资料-->
            <div v-show="tab==0" class="baseData">
                <!--预览状态-->
                <div v-show="!isEdit" class="baseData_see">
                    <p>
                        <span>标题:</span>
                        <span>~{productDetail.name}</span>
                    </p>
                    <p>
                        <span>分类属性:</span>
                        <span class="classify_attr">
                            <template v-for="(item,index) in productDetail.attr" >
                                <span>~{item.name}</span><span>~{item.price}$</span><br/>
                            </template>
                        </span>
                    </p>
                    <p>
                        <span>自定义属性:</span>
                        <span>~{productDetail.label}</span>
                    </p>
                    <p class="cover_img">
                        <span>封面图:</span>
                        <span v-for="n in 4">
                            <img src=""/>
                        </span>
                    </p>
                </div>
                <!--编辑状态-->
                <div v-show="isEdit" class="baseData_edit" >
                    <p>
                        <span>标题</span>
                        <el-input v-model="productDetail_edit.name"></el-input>
                    </p>
                    <!--<p>-->
                        <!--<span>分类属性</span>-->
                        <!--<span class="classify_attr">-->
                            <!--<input type="text" /><input type="text" /><br/>-->
                            <!--<input type="text" /><input type="text" /><br/>-->
                            <!--<input type="text" /><input type="text" /><br/>-->
                        <!--</span>-->
                    <!--</p>-->
                    <p>
                        <span>自定义属性</span>
                        <el-input v-model="productDetail_edit.label"></el-input>
                    </p>
                    <p class="cover_img">
                        <span>封面图:</span>
                        <span v-for="(item,index) in productDetail_edit._picture_url">
                          <i class="close_icon"></i>
                          <img :src="item" />
                        </span>
                        <span style="cursor:pointer;" @click="imageUpload">
                            <img src="/images/ali.jpg" />
                        </span>
                    </p>
                </div>
            </div>
            <!--图文详情-->
            <div v-show="tab==1" class="imageText">
                <div v-show="!isEdit" class="imageText_see">
                    imageText_see
                </div>
                <div v-show="isEdit" class="imageText_edit">
                    <div id="editor">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script type="text/javascript" src="/plugin/vue-resource/dist/vue-resource.js"></script>
    <script src="/plugin/element-ui/lib/index.js"></script>
    <script src="https://cdn.quilljs.com/1.3.1/quill.js"></script>
    <!-- qiniu -->
    <!--<script src="https://cdn.staticfile.org/plupload/2.1.9/moxie.js"></script>-->
    <!--<script src="https://cdn.staticfile.org/plupload/2.1.9/plupload.dev.js"></script>-->
    <!--<script src="https://cdn.staticfile.org/qiniu-js-sdk/1.0.14-beta/qiniu.js"></script>-->
    <script src="/plugin/plupload-2.3.1/moxie.js"></script>
    <script src="/plugin/plupload-2.3.1/plupload.dev.js"></script>
    <script src="/plugin/qiniu-1.0.21/qiniu.js"></script>
    <script type="text/javascript" src="/cms/js/common/common.js"></script>
    <script type="text/javascript" src="/cms/js/pages/product_detail.js"></script>
</body>
</html>