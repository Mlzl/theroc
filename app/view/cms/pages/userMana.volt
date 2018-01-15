<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" />
    <!--<link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">-->
    <link rel="stylesheet" href="https://unpkg.com/element-ui@next/lib/theme-chalk/index.css">
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
                        <span :title="item.email">~{item.email}</span>
                        <span :title="item.user_name">~{item.user_name}</span>
                        <span>
                            <img :src="item.avatar" />
                        </span>
                        <span :title="item.cellphone">~{item.cellphone}</span>
                        <span :title="item.country+item.state+item.city">~{item.country}~{item.state}~{item.city}</span>
                        <span :title="item.zip_code">~{item.zip_code}</span>
                        <span>~{item.status==1?'已激活':'未激活'}</span>
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

    {% include "common/commonjs.volt" %}
    <script type="text/javascript" src="/cms/js/pages/userMana.js"></script>
</body>
</html>