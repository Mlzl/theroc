<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!--<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=no">-->
    <title>Title</title>
    <!--<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-default/index.css">-->
    <!--<link rel="stylesheet" href="http://cdn.bootcss.com/element-ui/1.3.7/theme-default/index.css">-->
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/frontend/css/pages/home.css" >
</head>
<body>
    <div id="home" v-cloak>
        <!--头部导航栏-->
        <div class="topBar">
    <img src="/images/logo.png" class="logo"/>
    <ul class="topBar_menu">
        <li>HOME</li>
        <li>PRODUCTS</li>
        <li>COMMUNITY</li>
        <li>CONTANT US</li>
    </ul>
    <div class="topBar_right">
        <p class="search">
            <input type="text" />
        </p>
        <i class="user_icon"></i>
    </div>
</div>
        <!--轮播图-->
        <div class="carouselArea">
            <el-carousel height="342px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <img src="/images/ali.jpg" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <!--产品导航模块-->
        <div class="product_nav">
            <div class="oneProduct_nav" v-for="n in 4">
                <p class="oneProduct_nav_img">
                    <img src="/images/ali.jpg" />
                </p>
                <div class="oneProduct_nav_desc">
                    <h4>产品标题</h4>
                    <p>产品详情</p>
                </div>
            </div>
        </div>
        <!--热销产品模块-->
        <div class="product_sell">
            <h3>热销产品</h3>
            <div class="oneProduct" v-for="n in 4">
                <p class="oneProduct_img">
                    <img src="/images/ali.jpg" />
                </p>
                <p class="oneProduct_desc">
                    产品标题
                </p>
            </div>
        </div>
        <!--推荐产品模块-->
        <div class="product_recom">
            <h3>推荐产品</h3>
            <div class="oneProduct" v-for="n in 4">
                <p class="oneProduct_img">
                    <img src="/images/ali.jpg" />
                </p>
                <p class="oneProduct_desc">
                    产品标题
                </p>
            </div>
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
    <!--<script src="https://unpkg.com/element-ui/lib/index.js"></script>-->
    <!--<script src="http://cdn.bootcss.com/element-ui/1.3.7/index.js"></script>-->
    <script src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/frontend/js/pages/home.js"></script>
</body>
</html>