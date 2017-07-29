<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0">
    <title>register</title>
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
                                <img class="user-icon" src="/images/user.png" alt="user picture">
                                <span class="vline"></span>
                                <input type="text" placeholder="Email Address">
                            </li>
                            <li>
                                <img class="password-icon"src="/images/password.png" alt="password picture">
                                <span class="vline"></span>
                                <input type="text" placeholder="Password">
                            </li>
                            <li>
                                <img class="again-icon" src="/images/again.png" alt="again picture">
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
    <script type="text/javascript" src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/plugin/vue-resource/dist/vue-resource.js"></script>
    <script type="text/javascript" src="/frontend/js/pages/register.js"></script>
</body>
</html>