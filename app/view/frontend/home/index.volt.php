<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-default/index.css">-->
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/frontend/css/home/index.css" >
</head>
<body>
    <div id="home"v-cloak>
        <!--头部导航栏-->
        <div class="topBar">
            <img src="" class="logo"/>
            <ul class="topBar_menu">
                <li>HOME</li>
                <li>PRODUCTS</li>
                <li>COMMUNITY</li>
                <li>CONTANT US</li>
            </ul>
            <div class="topBar_right">
                <input type="text" />

            </div>
        </div>
        <!--轮播图-->
        <div class="carouselArea">
            <el-carousel height="342px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3>~{ item }</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!--产品导航模块-->
        <div class="product_nav">
            <div class="oneProduct" v-for="n in 4">
                <p class="oneProduct_img">

                </p>
                <p class="oneProduct_desc">
                    产品详情产品详情产品详情产品详情
                    产品详情产品详情产品详情
                </p>
            </div>
        </div>
        <!--热销产品模块-->
        <div class="product_sellWell">
            <h3>热销产品</h3>
            <div class="oneProduct" v-for="n in 4">
                <p class="oneProduct_img">

                </p>
                <p class="oneProduct_desc">
                    产品详情产品详情产品详情产品详情
                    产品详情产品详情产品详情
                </p>
            </div>
        </div>
        <!--推荐产品模块-->
        <div class="product_recommend">
            <h3>推荐产品</h3>
            <div class="oneProduct" v-for="n in 4">
                <p class="oneProduct_img">

                </p>
                <p class="oneProduct_desc">
                    产品详情产品详情产品详情产品详情
                    产品详情产品详情产品详情
                </p>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <!--<script src="https://unpkg.com/element-ui/lib/index.js"></script>-->
    <script src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/frontend/js/home/index.js"></script>
</body>
</html>