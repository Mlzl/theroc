{% include "common/seo.volt" %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="{{keywords}}">
    <meta name="description" content="{{description}}">
    <!--<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=no">-->
    <title>{{title}}</title>
    <!-- element ui -->
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <!-- private -->
    <link rel="stylesheet" href="/frontend/css/pages/home.css" >
</head>
<body>
    <div id="home">
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        <div id="home_main" v-cloak>
            <!--轮播图-->
            <div class="carouselArea">
                <el-carousel height="342px">
                    <el-carousel-item v-for="item in bannerList" :key="item">
                        <img :src="item.value.picture_url" @click="locateHref(item.value.target_url)"/>
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
        </div>
        <!--底部-->
        {% include "smart/footer.volt" %}
    </div>
    <!-- vue -->
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <!--<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.3.4"></script>-->
    <script type="text/javascript" src="/plugin/vue-resource/dist/vue-resource.js"></script>
    <!-- element ui -->
    <script type="text/javascript" src="/plugin/element-ui/lib/index.js"></script>
    <!-- private -->
    <script type="text/javascript" src="/frontend/js/common/common.js"></script>
    <script type="text/javascript" src="/frontend/js/pages/home.js"></script>
</body>
</html>