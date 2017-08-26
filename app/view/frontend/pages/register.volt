{% include "common/seo.volt" %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="{{keywords}}">
    <meta name="description" content="{{description}}">
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0">
    <title>{{title}}</title>
    <!-- element ui -->
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <!-- private -->
    <link rel="stylesheet" href="/frontend/css/pages/register.css">
</head>
<body>
<div id="register">
    <!--头部导航栏-->
    {% include "smart/topBar.volt" %}
    <div id="register_main" v-cloak>
        <div class="register_box">
            <h3 class="register-header">Create Account</h3>
            <ul>
                <li>
                    <img class="user-icon" src="/images/user.png" alt="user picture">
                    <span class="vline"></span>
                    <input type="email" v-model="email" placeholder="Email Address">
                </li>
                <li>
                    <img class="password-icon" src="/images/password.png" alt="password picture">
                    <span class="vline"></span>
                    <input type="password" v-model="password" placeholder="Password">
                </li>
                <li>
                    <img class="again-icon" src="/images/again.png" alt="again picture">
                    <span class="vline"></span>
                    <input type="password" v-model="rePassword" placeholder="Password Confirm">
                </li>
            </ul>
            <button class="registerBtn" @click="register">REGISTER</button>
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
<!-- md5-->
<script type="text/javascript" src="/plugin/md5.js"></script>
<!-- private -->
<script type="text/javascript" src="/frontend/js/common/common.js"></script>
<script type="text/javascript" src="/frontend/js/pages/register.js"></script>

</body>
</html>