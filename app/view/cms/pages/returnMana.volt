<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" />
    <!--<link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">-->
    <link rel="stylesheet" href="https://unpkg.com/element-ui@next/lib/theme-chalk/index.css">
    <link rel="stylesheet" href="/cms/css/pages/returnMana.css" >
</head>
<body>
    <div id="returnMana">
        <!--头部栏-->
        {% include "smart/topBar.volt" %}
        <!--侧边栏-->
        {% include "smart/sideBar.volt" %}
        <div id="returnMana_main" v-cloak>
            <div class="return_table">
                <div class="return_thead">
                    <p>
                        <span>序号</span>
                        <span>email</span>
                        <span>姓名</span>
                        <span>订单详情</span>
                        <span>产品描述</span>
                        <span>图片</span>
                    </p>
                </div>
                <div class="return_tbody">
                    <p v-for="(item,index) in curReturnList">
                        <span>~{index+1}</span>
                        <span :title="item.email">~{item.email}</span>
                        <span :title="item.username">~{item.username}</span>
                        <span :title="item.order_detail">~{item.order_detail}</span>
                        <span :title="item.product_detail">~{item.product_detail}</span>
                        <span>
                            <img v-for="(item1,index1) in item._images" :src="item1" @click="preview(item1)"/>
                        </span>
                    </p>
                </div>
                <el-pagination style="text-align:center"
                               small layout="prev, pager, next"
                               :page-size="curReturnList_size"
                               :current-page="curReturnList_page"
                               :total="curReturnList_total"
                               @current-change="curProductChange">
                </el-pagination>
            </div>
            <!--重发邮件对话框-->
            <el-dialog title="" v-model="preview_show" custom-class="preview_dialog"
                       :show-close=true :close-on-click-modal=false>
                <div class="preview_dialog_main">
                    <img :src="previewImg">
                </div>
            </el-dialog>
        </div>
    </div>

    {% include "common/commonjs.volt" %}
    <script type="text/javascript" src="/cms/js/pages/returnMana.js"></script>
</body>
</html>