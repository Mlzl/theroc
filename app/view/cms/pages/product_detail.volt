<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" />
    <link rel="stylesheet" href="/plugin/quill-1.3.1/quill.snow.css">
    <!--<link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">-->
    <link rel="stylesheet" href="https://unpkg.com/element-ui@next/lib/theme-chalk/index.css">
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
        <div id="product_detail_main"
             v-loading="loading"
             element-loading-text="拼命加载中"
             v-cloak>
            <div class="head">
                <ul class="tab_ul">
                    <li :class="{active:tab==0}" @click="switchTab(0)">基本资料</li>
                    <li :class="{active:tab==1}" @click="switchTab(1)">图文详情</li>
                    <li :class="{active:tab==2}" @click="switchTab(2)">评价列表</li>
                </ul>
                <div class="operation_btn" v-if="tab!=2">
                    <template v-if="!isEdit">
                        <el-button @click="switchEdit(true)">编辑</el-button>
                    </template>
                    <template v-else>
                        <el-button @click="switchEdit(false)">取消</el-button>
                        <el-button type="primary" @click="save_btn">保存</el-button>
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
                    <p>
                        <span>跳转url:</span>
                        <span>~{productDetail.target_url}</span>
                    </p>
                    <p class="cover_img">
                        <span>封面图:</span>
                        <span v-for="(item,index) in productDetail._picture_url">
                            <img :src="item"/>
                        </span>
                    </p>
                </div>
                <!--编辑状态-->
                <div v-show="isEdit" class="baseData_edit" >
                    <p>
                        <span>标题:</span>
                        <el-input v-model="productDetail_edit.name"></el-input>
                    </p>
                    <p>
                        <span>分类属性:</span>
                        <span class="classify_attr">
                            <template v-for="(item,index) in productDetail.attr" >
                                <span>~{item.name}</span>
                                <span>~{item.price}$</span>
                                <em @click="showModifyPrice(true,item)">修改</em>
                                <em @click="delAttr(item.id,index)">删除</em>
                                <br/>
                            </template>
                        </span>
                    </p>
                    <p>
                        <span>自定义属性:</span>
                        <el-input v-model="productDetail_edit.label"></el-input>
                    </p>
                    <p>
                        <span>跳转url:</span>
                        <el-input v-model="productDetail_edit.target_url"></el-input>
                    </p>
                    <p class="cover_img">
                        <span>封面图(360*360):</span>
                        <span v-for="(item,index) in productDetail_edit._picture_url">
                          <i class="close_icon" @click="deleteCoverImg(item)"></i>
                          <img :src="item" />
                        </span>
                        <span style="cursor:pointer;border:1px solid #ccc" @click="imageUpload">
                            <img src="/images/add_icon.png" style="width:40px;height:40px;margin:20px;"/>
                        </span>
                    </p>
                </div>
            </div>
            <!--图文详情-->
            <div v-show="tab==1" class="imageText">
                <div v-show="!isEdit" class="imageText_see" v-html="productDetail.img_txt_detail"></div>
                <div v-show="isEdit" class="imageText_edit">
                    <div id="editor">
                    </div>
                </div>
            </div>
            <!--评价列表-->
            <div v-show="tab==2" class="commentList">
                <div class="product_table">
                    <div class="product_thead">
                        <p>
                            <span>序号</span>
                            <span>评价人</span>
                            <span>星级</span>
                            <span>评价内容</span>
                            <span>状态</span>
                        </p>
                    </div>
                    <div class="product_tbody">
                        <p v-for="(item,index) in commentList">
                            <span>~{index+1}</span>
                            <span>~{item.user_name}</span>
                            <span>
                                <img v-for="n in item.stat_num" src="/images/star_icon.png" style="width:18px;height:17px"/>
                            </span>
                            <span>~{item.content}</span>
                            <span>
                                <el-button class="delete_btn" @click="del_btn(item,index)">删除</el-button>
                            </span>
                        </p>
                    </div>
                    <el-pagination style="text-align:center"
                                   small layout="prev, pager, next"
                                   :page-size="commentList_size"
                                   :current-page="commentList_page"
                                   :total="commentList_total"
                                   @current-change="commentChange">
                    </el-pagination>
                </div>
            </div>
            <!--修改价格 弹出框-->
            <el-dialog title="修改价格" v-model="modifyPrice_show" custom-class="modifyPrice_dialog"
                       :show-close=false :close-on-click-modal=false>
                <div class="modifyPrice_dialog_main">
                    <el-input v-model="price_attr" placeholder="请输入价格属性"></el-input>
                    <el-input type="number" step="1" v-model="price" placeholder="请输入价格"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showModifyPrice(false)">取 消</el-button>
                    <el-button type="primary" @click="modifyPrice">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>

    {% include "common/commonjs.volt" %}
    <script src="/plugin/quill-1.3.1/quill.js"></script>
    <script src="/plugin/plupload-2.1.x/moxie.js"></script>
    <script src="/plugin/plupload-2.1.x/plupload.dev.js"></script>
    <script src="/plugin/qiniu-1.0.19/qiniu.js"></script>
    <script src="/plugin/image-resize.min.js"></script>
    <script type="text/javascript" src="/cms/js/pages/product_detail.js"></script>
</body>
</html>