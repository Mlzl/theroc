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
            <div class="head">
                <ul class="tab_ul">
                    <li :class="{active:tab==0}" @click="switchTab(0)">导航产品</li>
                    <li :class="{active:tab==1}" @click="switchTab(1)">热销产品</li>
                    <li :class="{active:tab==2}" @click="switchTab(2)">推荐产品</li>
                </ul>
                <el-button @click="showAdd(true)">添加</el-button>
            </div>
            <!--导航产品、热销产品、推荐产品-->
            <div class="product_table">
                <div class="product_thead">
                    <p>
                        <span>序号</span>
                        <span>标题</span>
                        <span>跳转url</span>
                        <span>预览</span>
                        <span>操作</span>
                    </p>
                </div>
                <div class="product_tbody">
                    <p>
                        <span>1</span>
                        <span>123</span>
                        <span>
                            <a href="###" target="_blank">123</a>
                        </span>
                        <span>123</span>
                        <span>
                            <el-button class="delete_btn" @click="">删除</el-button>
                        </span>
                    </p>
                </div>
            </div>
            <!--添加 弹出框-->
            <el-dialog title="添加" v-model="add_show" custom-class="add_dialog"
                       :show-close=false :close-on-click-modal=false>
                <div class="add_dialog_main">
                    <el-input v-model="product_name" placeholder="请输入产品标题"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showAdd(false)">取 消</el-button>
                    <el-button type="primary" @click="add_btn">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script type="text/javascript" src="/plugin/vue-resource/dist/vue-resource.js"></script>
    <script src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/cms/js/common/common.js"></script>
    <script type="text/javascript" src="/cms/js/pages/moduleMana.js"></script>
</body>
</html>