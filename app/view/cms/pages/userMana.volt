<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/cms/css/pages/userMana.css" >
</head>
<body>
    <div id="userMana">
        <!--头部栏-->
        {% include "smart/topBar.volt" %}
        <!--侧边栏-->
        {% include "smart/sideBar.volt" %}
        <div id="userMana_main" v-cloak>
            <div class="user_table">
                <div class="user_thead">
                    <p>
                        <span>序号</span>
                        <span>邮箱</span>
                        <span>昵称</span>
                        <span>头像</span>
                        <span>手机号码</span>
                        <span>地址</span>
                        <span>邮编</span>
                        <span>状态</span>
                    </p>
                </div>
                <div class="user_tbody">
                    <p v-for="(item,index) in userList">
                        <span>~{index+1}</span>
                        <span>~{item.email}</span>
                        <span>~{item.user_name}</span>
                        <span>
                            <img :src="item.avatar" />
                        </span>
                        <span>~{item.cellphone}</span>
                        <span>~{item.country}~{item.state}~{item.city}</span>
                        <span>~{item.zip_code}</span>
                        <span>~{item.status}</span>
                    </p>
                </div>
                <el-pagination style="text-align:center"
                                small layout="prev, pager, next"
                                :page-size="userList_size"
                                :current-page="userList_page"
                                :total="userList_total"
                                @current-change="userChange">
                </el-pagination>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script type="text/javascript" src="/plugin/vue-resource/dist/vue-resource.js"></script>
    <script src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/cms/js/common/common.js"></script>
    <script type="text/javascript" src="/cms/js/pages/userMana.js"></script>
</body>
</html>