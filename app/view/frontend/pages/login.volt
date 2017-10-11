{% include "common/seo.volt" %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="{{keywords}}">
    <meta name="description" content="{{description}}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <title>{{title}}</title>
    <!-- element ui -->
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <!-- private -->
    <link rel="stylesheet" href="/frontend/css/pages/login.css">
</head>
<body>
    <div id="login">
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        <div id="login_main" v-cloak>
            <div class="login_box">
                <h3 class="login_header">Welcome</h3>
                <div class="login_info">
                    <p><input type="email" class="username" v-model="email" placeholder="Email Address"></p>
                    <p><input type="password"  v-model="password" placeholder="Password"></p>
                    <p @click="showForgetPass(true)">Forget your password?</p>
                </div>
                <div class="btns">
                    <button class="loginBtn" @click="loginBtn">LOG IN</button>
                    <p class="or_text">OR</p>
                    <button class="registerBtn" @click="toRegisterPage">CREATE ACCOUNT</button>
                </div>
            </div>
            <!--忘记密码对话框-->
            <el-dialog title="FORGET PASSWORD" v-model="forgetPass_show" custom-class="forgetPass_dialog"
                       :show-close=false :close-on-click-modal=false>
                <div class="forgetPass_dialog_main">
                    <p>
                        <input type="text" v-model="myEmail" placeholder="Your email" />
                    </p>
                    <p>
                        <input type="text" style="display:inline-block" v-model="captcha" placeholder="Captcha"/>
                        <el-button type='primary' @click="sendCaptchaBtn">Send code</el-button>
                    </p>
                    <p>
                        <input type="password" v-model="newPassword" placeholder="New password" />
                    </p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showForgetPass(false)">取 消</el-button>
                    <el-button type="primary" @click="updatePwdByEmailBtn">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!--底部-->
        {% include "smart/footer.volt" %}
    </div>
    {% include "common/commonjs.volt" %}
    <script type="text/javascript" src="/plugin/md5.js"></script>
    <script type="text/javascript" src="/frontend/js/pages/login.js"></script>
</body>
</html>