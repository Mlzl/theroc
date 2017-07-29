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
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        <div id="user_main" v-cloak>
            <div class="user-overview clearfix">
                <div class="overview-item1">
                    <img src="/frontend/image/Koala.jpg" alt="" class="photo">
                    <div class="uploadimg-btn">
                        <img src="/frontend/image/download.png" alt="" class="uploadimg">
                    </div>
                </div>
                <ul class="overview-item2">
                    <li class="overview-email">1446418561@qq.com</li>
                    <li class="photo-btn"><a href="javascript:void(0)">Change Photo</a></li>
                    <li class="password-btn"><a href="javascript:void(0)">Change Password</a></li>
                </ul>
            </div>
            <div class="user-form">
                <div class="row" >
                    <input type="text" class="user-name" placeholder="Use name">
                </div>
                <div class="row long-row">
                    <div class="form-email-tip">Email address</div>
                    <div class="form-email">1446418561@qq.com</div>
                </div>
                <div class="row clearfix" >
                    <input type="text" class="inp-normal" placeholder="Date of birth">
                    <span class="fill1"></span>
                    <input type="text" class="inp-normal" placeholder="Gender">
                    <span class="fill1"></span>
                    <input type="text" class="inp-big" placeholder="Phone number">
                </div>
                <div class="row clearfix">
                    <input type="text" class="inp-normal" placeholder="Country">
                    <span class="fill1"></span>
                    <input type="text" class="inp-normal" placeholder="State">
                    <span class="fill1"></span>
                    <input type="text" class="inp-small-left"  placeholder="City">
                    <span class="fill2"></span>
                    <input type="text" class="inp-small-right"  placeholder="Zip code">
                </div>
                <div class="row form-footer" >
                    <span class="submit">SUBMIT</span>
                </div>
            </div>

        </div>
        <!--底部-->
        {% include "smart/footer.volt" %}
    </div>
    <!-- vue -->
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script type="text/javascript" src="/plugin/vue-resource/dist/vue-resource.js"></script>
    <!-- element ui -->
    <script type="text/javascript" src="/plugin/element-ui/lib/index.js"></script>
    <!-- private -->
    <script type="text/javascript" src="/frontend/js/common/common.js"></script>
    <script type="text/javascript" src="/frontend/js/pages/user.js"></script>
</body>
</html>