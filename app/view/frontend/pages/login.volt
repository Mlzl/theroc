<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>login</title>
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/frontend/css/pages/login.css" >
</head>
<body>
    <div id="login" v-cloak>
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
         <div class="container">
             <div class="main">
                <p class="welcome">Welcome</p>
                <ul >
                    <li class="clearfix li1">
                        <span class="form-td">
                            <img class="username-icon" src="/images/user.png" alt="">
                        </span>
                        <span class="line form-td"></span>
                        <input class="form-td username" type="text" placeholder="Email Address">
                    </li>
                    <li class="clearfix li2">
                        <span class="form-td">
                             <img class="password-icon"  src="/images/password.png" alt="">
                        </span>
                        <span class="line form-td"></span>
                        <input type="text" class="form-td" placeholder="Password">
                    </li>
                    <li class="clearfix li3" >
                        <span><a class="form-td" href="">Forget your password?</a></span>
                        <span  class="rememberPassword form-td">
                            <input class="checkbox" type="checkbox">
                             <span>Remember Me</span>
                        </span>
                    </li>
                    <li class="clearfix">
                        <button  class="loginBtn form-td">LOG IN</button>
                    </li>
                    <li class="li5">
                        <span class="hline"></span><span class="or">
                        OR</span><span class="hline">

                    </span>
                    </li>
                    <li class="li6">
                        <span class="register">
                            CREATE ACCOUNT
                        </span>
                    </li>
                </ul>
             </div>
         </div>
        <!--底部-->
        {% include "smart/footer.volt" %}
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script type="text/javascript" src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/plugin/vue-resource/dist/vue-resource.js"></script>
    <script type="text/javascript" src="/frontend/js/pages/login.js"></script>
</body>
</html>