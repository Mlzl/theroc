{% set page = 1 %}
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
        <div id="productMana_main" v-cloak>
            <div class="main_left">
                <el-tree :data="tree_data" :props="defaultProps" node-key="id"
                         :default-expanded-keys="defaultexpandedKeys"
                         :highlight-current=true :expand-on-click-node=false
                         :current-node-key="curNodeKey"
                         @node-click="handleNodeClick">
                </el-tree>
            </div>
            <div class="main_right">
                <div class="main_right_header">
                    <h3>123</h3>
                    <div class="operation_btn">
                        <el-button class="addClass_btn" @click="showAddClass(true,0)">添加分类</el-button>
                        <template v-if="curNode.id!=0">
                            <el-button class="modifyClass_btn" @click="showAddClass(true,1)">修改分类</el-button>
                            <el-button class="deleteClass_btn" @click="deleteClass_btn">删除分类</el-button>
                            <el-button class="addProduct_btn" @click="showAddProduct(true)">添加产品</el-button>
                        </template>
                    </div>
                </div>
                <div class="product_table">
                    <div class="product_thead">
                        <p>
                            <span>序号</span>
                            <span>标题</span>
                            <span>自定义属性</span>
                            <span>跳转url</span>
                            <span>价格</span>
                            <!--<span>状态</span>-->
                            <span>操作</span>
                        </p>
                    </div>
                    <div class="product_tbody">
                        <p v-for="(item,index) in curProductList">
                            <span>~{index+1}</span>
                            <span>~{item.name}</span>
                            <span>~{item.label}</span>
                            <span>
                                <a :href="item.target_url" target="_blank">~{item.target_url}</a>
                            </span>
                            <span>~{item.price}</span>
                            <!--<span style="cursor:pointer">-->
                                <!--~{item.status==1?'上架':item.status==2?'下架':''}-->
                            <!--</span>-->
                            <span>
                                <el-button class="addPrice_btn" @click="showAddPrice(true,item)">添加价格</el-button>
                                <el-button class="detail_btn" @click="toDetailPage(item.product_id)">详情</el-button>
                                <el-button class="delete_btn" @click="deleteProduct_btn(item)">删除</el-button>
                            </span>
                        </p>
                    </div>
                    <el-pagination style="text-align:center"
                                   small layout="prev, pager, next"
                                   :page-size="curProductList_size"
                                   :current-page="curProductList_page"
                                   :total="curProductList_total"
                                   @current-change="curProductChange">
                    </el-pagination>
                </div>
            </div>
            <!--添加、修改分类 弹出框-->
            <el-dialog :title="addOrModify==0?'添加分类':'修改分类'" v-model="addClass_show" custom-class="addClass_dialog"
                       :show-close=false :close-on-click-modal=false>
                <div class="addClass_dialog_main">
                    <el-input v-model="class_name" placeholder="请输入分类名称"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showAddClass(false)">取 消</el-button>
                    <el-button type="primary" @click="addOrModifyClass_btn">确 定</el-button>
                </span>
            </el-dialog>
            <!--添加产品 弹出框-->
            <el-dialog title="添加产品" v-model="addProduct_show" custom-class="addProduct_dialog"
                       :show-close=false :close-on-click-modal=false>
                <div class="addProduct_dialog_main">
                    <el-input v-model="product_name" placeholder="请输入产品标题(必填)"></el-input>
                    <el-input v-model="custom_attr" placeholder="请输入自定义属性"></el-input>
                    <el-input v-model="target_url" placeholder="请输入跳链url"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showAddProduct(false)">取 消</el-button>
                    <el-button type="primary" @click="addProduct_btn">确 定</el-button>
                </span>
            </el-dialog>
            <!--添加价格 弹出框-->
            <el-dialog title="添加价格" v-model="addPrice_show" custom-class="addPrice_dialog"
                       :show-close=false :close-on-click-modal=false>
                <div class="addPrice_dialog_main">
                    <el-input v-model="price_attr" placeholder="请输入价格属性"></el-input>
                    <el-input type="number" step="1" v-model="price" placeholder="请输入价格"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showAddPrice(false)">取 消</el-button>
                    <el-button type="primary" @click="addPrice_btn">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script type="text/javascript" src="/plugin/vue-resource/dist/vue-resource.js"></script>
    <script src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/cms/js/common/common.js"></script>
    <script type="text/javascript" src="/cms/js/pages/productMana.js"></script>
</body>
</html>