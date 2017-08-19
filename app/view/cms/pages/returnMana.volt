<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
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
                        <span>姓名</span>
                        <span>email</span>
                        <span>订单详情</span>
                        <span>订单描述</span>
                        <span>图片</span>
                    </p>
                </div>
                <div class="return_tbody">
                    <p v-for="n in 4">
                        <span>~{n}</span>
                        <span>111</span>
                        <span>111</span>
                        <span>111</span>
                        <span>111</span>
                        <span>
                            123
                        </span>
                    </p>
                </div>
            </div>
            <!--<el-pagination style="text-align:center"-->
                           <!--small layout="prev, pager, next"-->
                           <!--:page-size="curProductList_size"-->
                           <!--:current-page="curProductList_page"-->
                           <!--:total="curProductList_total"-->
                           <!--@current-change="curProductChange">-->
            <!--</el-pagination>-->
        </div>
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/cms/js/common/common.js"></script>
    <script type="text/javascript" src="/cms/js/pages/returnMana.js"></script>
</body>
</html>