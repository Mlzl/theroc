<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/frontend/css/pages/product_detail.css" >
</head>
<body>
    <div id="product_detail" v-cloak>
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
        <!--产品图片属性展示-->
        <div class="productShow">
            <div class="picShow">
                <p>
                    <img src="/images/ali.jpg" />
                </p>
                <ul>
                    <li v-for="n in 4"><img src="/images/ali.jpg" /></li>
                </ul>
            </div>
            <div class="attrShow">
                <h3>PowerCore Fusion 5000mAh Portable Charger</h3>
                <p>自定义属性</p>
                <p>$25.99</p>
                <div>
                    <span>color</span>
                    <ul>
                        <li>red</li>
                        <li>blue</li>
                        <li>green</li>
                    </ul>
                </div>
                <el-button>i want buy</el-button>
            </div>
        </div>
        <!--图文详情和买家评价-->
        <div class="productDesc">
            <ul class="productDesc_header">
                <li :class="{active:active==1}" @click="activeChange(1)">Highlights</li>
                <li :class="{active:active==2}" @click="activeChange(2)">comments</li>
            </ul>
            <!--图文详情-->
            <div class="imageText">
                这里是图文详情
            </div>
            <!--买家评价-->
            <div class="comment">
                <h3>comments</h3>
                <ul class="comment_list">
                    <li class="oneComment" v-for="n in 5">
                        <h4>NICE</h4>
                        <p><img src="/images/ali.jpg" v-for="n in 5" /></p>
                        <p>
                            <span>Cody</span>
                            <span>06/29/2017</span>
                        </p>
                        <p>I love Anker products and this all-in-one Battery charger/AC - USB adapter fulfills the need to travel with a USB charger and portable battery. I've lost track of how many portable batteries I have but Anker keeps putting out innovative products that keeps me coming back!The construction quality is great and has a good feel to it. This small unit replaces the need to bring a USB/AC charger and a small portable USB charger. All you need is the cable now. On short trips, I would have no need to bring anything else.</p>
                    </li>
                </ul>
                <el-pagination small style="text-align:center"
                               layout="prev, pager, next" :total="50" >
                </el-pagination>
                <el-button>i want comment</el-button>
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
    <script src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/frontend/js/pages/product_detail.js"></script>
</body>
</html>