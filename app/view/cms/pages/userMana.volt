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
            <div class="table user_table">
                <div class="thead">
                    <span>序号</span>
                    <span>昵称</span>
                    <span>性别</span>
                    <span>头像</span>
                    <span>出生日期</span>
                    <span>地址</span>
                    <span>邮编</span>
                </div>
                <div class="tbody">
                    <p v-for="(userInfo,index) in userInfoList">
                        <span >~{index+1}</span>
                        <span >~{userInfo.nickName}</span>
                        <span>~{userInfo.sex}</span>
                        <span >~{userInfo.birthDate}</span>
                        <span><img :src="userInfo.photo" alt=""></span>
                        <span>~{userInfo.address}</span>
                        <span>~{userInfo.code}</span>
                    </p>
                </div>
                <el-pagination class="pagination"
                        layout="prev, pager, next"
                        :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/cms/js/common/common.js"></script>
    <script type="text/javascript" src="/cms/js/pages/userMana.js"></script>
</body>
</html>