<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/frontend/css/pages/contact.css" >
</head>
<body>
    <div id="contact">
        <!--头部导航栏-->
        <div id="topBar" v-cloak>
    <img src="/images/logo.png" class="logo"/>
    <ul class="topBar_menu">
        <li @click="switchPages(0)">HOME</li>
        <li @click="switchPages(1)">PRODUCTS</li>
        <li @click="switchPages(2)">COMMUNITY</li>
        <li @click="switchPages(3)">CONTACT US</li>
    </ul>
    <div class="topBar_right">
        <p class="search">
            <input type="text" />
        </p>
        <i class="user_icon"></i>
    </div>
</div>
        <div id="contact_main" v-cloak>
            contact
        </div>
        <!--底部-->
        <div class="footer">
    <div class="subscribe">
        <h4>Subscribe</h4>
        <div class="email_submit">
            <p>Be the first to know bout our lastest products</p>
            <input type="text" placeholder="Enter your email address"/><br/>
            <el-button>SUBMIT</el-button>
        </div>
        <div class="link">

        </div>
    </div>
    <div class="about">
        <h4>About</h4>
        <ul>
            <li><span>Contant us</span></li>
        </ul>
    </div>
    <div class="support">
        <h4>Support</h4>
        <ul>
            <li><span>Refund & Exchange</span></li>
            <li><span>Warranty</span></li>
        </ul>
    </div>
    <div class="contact">
        <div class="call">
            <h4>Call us</h4>
            <p>13560455672</p>
        </div>
        <div class="email">
            <h4>Email</h4>
            <p>245452530@qq.com</p>
        </div>
    </div>
</div>
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/frontend/js/common/common.js"></script>
    <script type="text/javascript" src="/frontend/js/pages/contact.js"></script>
</body>
</html>