<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0">
    <title>register</title>
    <!--<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-default/index.css">-->
    <!--<link rel="stylesheet" href="http://cdn.bootcss.com/element-ui/1.3.7/theme-default/index.css">-->
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/frontend/css/pages/register.css" >
</head>
<body>
    <div id="register" v-cloak>
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        <div class="container">
            <div class="main">
                <form class="register-form">
                        <div class="register-header">
                            <span class="title">Create Account</span>
                        </div>
                        <ul>
                            <li>
                                <img class="user-icon" src="" alt="">
                                <span class="vline"></span>
                                <input type="text" placeholder="Email Address">
                            </li>
                            <li>
                                <img class="password-icon" src="" alt="">
                                <span class="vline"></span>
                                <input type="text" placeholder="Password">
                            </li>
                            <li>
                                <img class="again-icon" src="" alt="">
                                <span class="vline"></span>
                                <input type="text" placeholder="Password">
                            </li>
                        </ul>
                        <div class="register-footer">
                            <button class="registerBtn">REGISTER</button>
                        </div>
                    </ul>
                </form>
            </div>
        </div>
        <!--底部-->
        {% include "smart/footer.volt" %}
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <!--<script src="https://unpkg.com/element-ui/lib/index.js"></script>-->
    <!--<script src="http://cdn.bootcss.com/element-ui/1.3.7/index.js"></script>-->
    <script src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/frontend/js/pages/register.js"></script>
</body>
</html>