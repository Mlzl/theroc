<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" />
    <!--<link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">-->
    <link rel="stylesheet" href="https://unpkg.com/element-ui@next/lib/theme-chalk/index.css">
    <link rel="stylesheet" href="/cms/css/pages/login.css">
</head>
<body>
    <div id="login">
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        <div id="login_main" v-cloak>
            <div class="login_box">
                <h3 class="welcome">Welcome</h3>
                <ul>
                    <li class="clearfix li1">
                        <span class="form-td">
                            <img class="username-icon" src="/images/user.png">
                        </span>
                        <span class="line form-td"></span>
                        <input type="email" class="form-td username" v-model="email" placeholder="Email Address">
                    </li>
                    <li class="clearfix li2">
                        <span class="form-td">
                             <img class="password-icon" src="/images/password.png">
                        </span>
                        <span class="line form-td"></span>
                        <input type="password" class="form-td" v-model="password" placeholder="Password">
                    </li>
                </ul>
                <div class="btns">
                    <button class="loginBtn form-td" @click="loginBtn">LOG IN</button>
                </div>
            </div>
        </div>
    </div>

    {% include "common/commonjs.volt" %}
    <script type="text/javascript" src="/plugin/md5.js"></script>
    <script type="text/javascript" src="/cms/js/pages/login.js"></script>
</body>
</html>