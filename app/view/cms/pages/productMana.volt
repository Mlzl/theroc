<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/cms/css/pages/productMana.css" >
</head>
<body>
    <div id="productMana">
        <!--头部栏-->
        {% include "smart/topBar.volt" %}
        <!--侧边栏-->
        {% include "smart/sideBar.volt" %}
        <div id="productMana_main">
            <div class="main_left">
                <el-tree :data="data" :props="defaultProps" node-key="id"
                         :default-expanded-keys="defaultexpandedKeys"
                         :highlight-current=true :expand-on-click-node=false
                         :current-node-key="curNodeKey"
                         @node-click="handleNodeClick">
                </el-tree>
            </div>
            <div class="main_right">
                <div class="main_right_header">
                    <h3>123</h3>
                    <el-button class="add_btn" @click="showAddProduct(true)">添加</el-button>
                </div>
                <div class="product_table">
                    <div class="product_thead">
                        <p>
                            <span>序号</span>
                            <span>标题</span>
                            <span>自定义属性</span>
                            <span>价格</span>
                            <span>操作</span>
                        </p>
                    </div>
                    <div class="product_tbody">
                        <p v-for="n in 4">
                            <span>1</span>
                            <span>我是产品标题</span>
                            <span>我是产品自定义属性</span>
                            <span>￥50~￥55</span>
                            <span>
                                <el-button class="detail_btn" @click="toDetailPage">详情</el-button>
                                <el-button class="delete_btn">删除</el-button>
                            </span>
                        </p>
                    </div>
                </div>
                <!--<el-pagination style="display:flex;justify-content:center;margin:12px 0 0 0;"-->
                               <!--small layout="prev, pager, next"-->
                               <!--:page-size="userPageSize" :current-page="userCurPage" :total="userTotalPage"-->
                               <!--@current-change="userCurChange">-->
                <!--</el-pagination>-->
            </div>
            <!--添加产品 弹出框-->
            <el-dialog title="添加" v-model="addProduct_show" custom-class="addProduct_dialog"
                       :show-close=false :close-on-click-modal=false>
                <div class="addProduct_dialog_main">
                    <el-input placeholder="请输入产品标题"></el-input>
                    <el-input placeholder="请输入自定义属性"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showAddProduct(false)">取 消</el-button>
                    <el-button type="primary" @click="">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/cms/js/common/common.js"></script>
    <script type="text/javascript" src="/cms/js/pages/productMana.js"></script>
</body>
</html>