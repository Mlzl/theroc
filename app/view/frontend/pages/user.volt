{% include "common/seo.volt" %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="{{keywords}}">
    <meta name="description" content="{{description}}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <title>{{title}}</title>
    <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" />
    <!--<link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">-->
    <link rel="stylesheet" href="https://unpkg.com/element-ui@next/lib/theme-chalk/index.css">
    <link rel="stylesheet" href="/frontend/css/pages/user.css" >
    {% include "common/analysis.volt" %}
</head>
<body>
    <div id="user">
        <!--七牛图片上传dom结构隐藏部分-->
        <div id="imageUploadDiv" style="display:none;">
            <p id="imageUploadBtn">上传图片</p>
        </div>
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        <div id="user_main" v-cloak>
            <div class="user-overview clearfix">
                <div class="overview-item1">
                    <img :src="person.avatar">
                </div>
                <ul class="overview-item2">
                    <li class="overview-email">~{person.email}</li>
                    <li class="photo-btn" @click="changePhoto">Change Photo</li>
                </ul>
            </div>
            <div class="user-form">
                <p class="userName">
                    <input type="text" placeholder="Use name" v-model="person.user_name">
                </p>
                <p class="userEmail">
                    <span class="form-email-tip">Email address<span/>
                    <span class="form-email">~{person.email}</span>
                </p>
                <p class="phoneNum" >
                    <input type="text" placeholder="Phone number" v-model="person.cellphone">
                </p>
                <p class="area">
                    <input type="text" placeholder="Country" v-model="person.country">
                    <input type="text" placeholder="State" v-model="person.state">
                    <input type="text" placeholder="City" v-model="person.city">
                    <input type="text" placeholder="Zip code" v-model="person.zip_code">
                </p>
                <p class="form-footer" >
                    <el-button type="primary" @click="updateUserInfo">SUBMIT</el-button>
                </p>
            </div>
        </div>
        <!--底部-->
        {% include "smart/footer.volt" %}
    </div>

    {% include "common/commonjs.volt" %}
    <script src="/plugin/plupload-2.1.x/moxie.js"></script>
    <script src="/plugin/plupload-2.1.x/plupload.dev.js"></script>
    <script src="/plugin/qiniu-1.0.19/qiniu.js"></script>
    <script type="text/javascript" src="/frontend/js/pages/user.js"></script>
</body>
</html>