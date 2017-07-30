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
        <!--头部栏-->
        {% include "smart/topBar.volt" %}
        <!--侧边栏-->
        {% include "smart/sideBar.volt" %}
        <!--主要区域-->
        <div id="carousel_main"  v-cloak>
            <div class="menu">
              <div class="tab clearfix">
                    <div  class="tab_item " :class="activeTab==='carousel_home'?'active_item':''" id="carousel_home" @click="openTab('carousel_home')">首页</div>
                    <div class="tab_item" :class="activeTab==='carousel_product'?'active_item':''" id="carousel_product" @click="openTab('carousel_product')">产品</div>
              </div>
                <div class="btn_group">
                    <button class="btn" @click="addCarousel=true">添加</button>
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
                    <p v-for="(item,index) in homeGoodsList">
                        <span class="field">~{index+1}</span>
                        <span class="field">
                            <span v-show="item.state==='read'">~{item.url}</span>
                            <input v-show="item.state==='edit'" type="text" :value="item.url">
                        </span>
                        <span class="field">
                            <span class="img_wrapper">
                                <img :src="item.imgSrc" alt="product">
                                <span class="mask" v-show="item.state==='edit'" @click="showDialog()">
                                    <img src="/images/upload.png" alt="上传">
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
                    <p v-for="(item,index) in productGoodsList">
                        <span class="field">~{index+1}</span>
                        <span class="field">
                            <span v-show="item.state==='read'">~{item.url}</span>
                            <input v-show="item.state==='edit'" type="text" :value="item.url">
                        </span>
                        <span class="field">
                            <span class="img_wrapper">
                                <img :src="item.imgSrc" alt="product">
                                <span class="mask" v-show="item.state==='edit'" @click="showDialog()">
                                    <img src="/images/upload.png" alt="上传">
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
            <el-dialog clas title="添加轮播图" :visible.sync="addCarousel">
                <div>
                    <input type="text">
                    <p class="img">
                        <img src="/images/ali.jpg" alt="轮播图">
                    </p>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/cms/js/common/common.js"></script>
    <script type="text/javascript" src="/cms/js/pages/carousel.js"></script>
</body>
</html>