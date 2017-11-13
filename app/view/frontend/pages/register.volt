{% include "common/seo.volt" %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="{{keywords}}">
    <meta name="description" content="{{description}}">
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0">
    <title>{{title}}</title>
    <!--<link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">-->
    <link rel="stylesheet" href="https://unpkg.com/element-ui@next/lib/theme-chalk/index.css">
    <link rel="stylesheet" href="/frontend/css/pages/register.css">
    {% include "common/analysis.volt" %}
</head>
<body>
<div id="register">
    <!--头部导航栏-->
    {% include "smart/topBar.volt" %}
    <div id="register_main" v-cloak>
        <div class="register_box">
            <h3 class="register_header">Create Account</h3>
            <div class="register_info">
                <p><input type="email" v-model="email" placeholder="Email Address"></p>
                <p><input type="password" v-model="password" placeholder="Password"></p>
                <p><input type="password" v-model="rePassword" placeholder="Password Confirm"></p>
            </div>
            <button class="registerBtn" @click="registerBtn">REGISTER</button>
        </div>
    </div>
    <!--底部-->
    {% include "smart/footer.volt" %}
</div>

{% include "common/commonjs.volt" %}
<script type="text/javascript" src="/plugin/md5.js"></script>
<script type="text/javascript" src="/frontend/js/pages/register.js"></script>

</body>
</html>