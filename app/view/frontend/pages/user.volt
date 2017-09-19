{% include "common/seo.volt" %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="{{keywords}}">
    <meta name="description" content="{{description}}">
    <title>{{title}}</title>
    <!-- element ui -->
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <!-- private -->
    <link rel="stylesheet" href="/frontend/css/pages/user.css" >
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
                    <img :src="person.avatar" alt="photo" class="photo">
                    <div class="uploadimg-btn">
                        <img src="/images/upload_icon.png"  class="uploadimg">
                    </div>
                </div>
                <ul class="overview-item2">
                    <li class="overview-email">~{person.email}</li>
                    <li class="photo-btn"><a href="javascript:void(0)" @click="changePhoto()">Change Photo</a></li>
                 <!--   <li class="password-btn"><a href="javascript:void(0)">Change Password</a></li>-->
                </ul>
            </div>
            <div class="user-form">
                <div class="row" >
                    <input type="text" class="user-name" placeholder="Use name" v-model="person.user_name">
                </div>
                <div class="row long-row">
                    <div class="form-email-tip">Email address</div>
                    <div class="form-email">1446418561@qq.com</div>
                </div>
                <div class="row clearfix" >
               <!--     <input type="text" class="inp-normal" placeholder="Date of birth">
                    <span class="fill1"></span>
                    <input type="text" class="inp-normal" placeholder="Gender">
                    <span class="fill1"></span>-->
                    <input type="text" class="inp-big" placeholder="Phone number" v-model="person.cellphone">
                </div>
                <div class="row clearfix">
                    <input type="text" class="inp-normal" placeholder="Country" v-model="person.country">
                    <span class="fill1"></span>
                    <input type="text" class="inp-normal" placeholder="State" v-model="person.state">
                    <span class="fill1"></span>
                    <input type="text" class="inp-small-left"  placeholder="City" v-model="person.city">
                    <span class="fill2"></span>
                    <input type="text" class="inp-small-right"  placeholder="Zip code" v-model="person.zip_code">
                </div>
                <div class="row form-footer" >
                    <span class="submit" @click="updateUserInfo()">SUBMIT</span>
                </div>
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