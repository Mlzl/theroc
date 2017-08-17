<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/cms/css/pages/moduleMana.css" >
</head>
<body>
    <div id="moduleMana">
        <!--头部栏-->
        {% include "smart/topBar.volt" %}
        <!--侧边栏-->
        {% include "smart/sideBar.volt" %}
        <div id="moduleMana_main" v-cloak>
            <div class="product_menu">
                <div class="tab clearfix">
                    <div  class="tab_item " :class="activeTab==='moduleMana_nav'?'active_item':''" id="moduleMana_nav" @click="openTab('moduleMana_nav')">导航产品</div>
                    <div class="tab_item" :class="activeTab==='moduleMana_hot'?'active_item':''" id="moduleMana_hot" @click="openTab('moduleMana_hot')">热销产品</div>
                    <div class="tab_item" :class="activeTab==='moduleMana_recommend'?'active_item':''" id="moduleMana_recommend" @click="openTab('moduleMana_recommend')">推荐产品</div>
                </div>
                <div class="btn_group">
                    <button class="btn" @click="showDialog()">添加</button>
                </div>
            </div>
            <div class="nav_product product_table" v-show="activeTab==='moduleMana_nav'">
                <div class="thead">
                    <span>序号</span>
                    <span>链接</span>
                    <span>预览</span>
                    <span>操作</span>
                </div>
                <div class="tbody">
                    <p v-for="(item,index) in navProductList">
                        <span class="field">~{index+1}</span>
                        <span class="field">
                                <span v-show="item.state==='read'">~{item.url}</span>
                                <input v-show="item.state==='edit'" type="text" :value="item.url">
                        </span>
                        <span class="field">
                                <span class="img_wrapper">
                                    <img :src="item.imgSrc" alt="product">
                                    <span class="mask" v-show="item.state==='edit'">
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
            <div class="hot_product product_table" v-show="activeTab==='moduleMana_hot'" >
                <div class="thead">
                    <span>序号</span>
                    <span>链接</span>
                    <span>预览</span>
                    <span>操作</span>
                </div>
                <div class="tbody">
                    <p v-for="(item,index) in hotProductList">
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
            <div class="recommend_product product_table" v-show="activeTab==='moduleMana_recommend'">
                <div class="thead">
                    <span>序号</span>
                    <span>链接</span>
                    <span>预览</span>
                    <span>操作</span>
                </div>
                <div class="tbody">
                    <p v-for="(item,index) in recommendProductList">
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
            <el-dialog  :title="dialogTitle" :visible.sync="addModuleManaDialog">
                <div class="form">
                    <p><input type="text" placeholder="产品链接"></p>
                    <p><textarea name="" id=""></textarea></p>
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
    <script type="text/javascript" src="/cms/js/pages/moduleMana.js"></script>
</body>
</html>