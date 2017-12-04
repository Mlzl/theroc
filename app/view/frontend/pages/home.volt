{% include "common/seo.volt" %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="{{keywords}}">
    <meta name="description" content="{{description}}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <title>{{title}}</title>
    <link rel="icon" href="png_favicon.png" type="image/png" >
    <!--<link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">-->
    <link rel="stylesheet" href="https://unpkg.com/element-ui@next/lib/theme-chalk/index.css">
    <link rel="stylesheet" href="/frontend/css/pages/home.css" >
    {% include "common/analysis.volt" %}
</head>
<body>
    <div id="home">
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        <div id="home_main" v-cloak>
            <!--轮播图-->
            <div class="carouselArea">
                <el-carousel arrow="never">
                    <el-carousel-item v-for="item in bannerList" :key="item">
                        <img :src="item.value.picture_url" @click="locateHref(item.value.target_url)"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!--产品导航模块-->
            <div class="product_nav">
                <div class="oneProduct_nav" v-for="(item,index) in productNavList">
                    <p class="oneProduct_nav_img">
                        <img :src="item._picture_url[0]?item._picture_url[0]:'/images/default_img.png'" @click="locateHref(item.target_url)"/>
                    </p>
                    <div class="oneProduct_nav_desc">
                        <h4>~{item.name}</h4>
                    </div>
                </div>
            </div>
            <!--热销产品模块-->
            <div class="product_sell">
                <h3>Hot-sale product</h3>
                <div class="oneProduct" v-for="(item,index) in productHotList">
                    <p class="oneProduct_img">
                        <img :src="item._picture_url[0]?item._picture_url[0]:'/images/default_img.png'" @click="locateHref(item.target_url)"/>
                    </p>
                    <p class="oneProduct_desc">~{item.name}</p>
                </div>
            </div>
            <!--推荐产品模块-->
            <div class="product_recom">
                <h3>Recommended products</h3>
                <div class="oneProduct" v-for="(item,index) in productRecommendList">
                    <p class="oneProduct_img">
                        <img :src="item._picture_url[0]?item._picture_url[0]:'/images/default_img.png'" @click="locateHref(item.target_url)"/>
                    </p>
                    <p class="oneProduct_desc">~{item.name}</p>
                </div>
            </div>
        </div>
        <!--底部-->
        {% include "smart/footer.volt" %}
    </div>

    {% include "common/commonjs.volt" %}
    <script type="text/javascript" src="/frontend/js/pages/home.js"></script>
</body>
</html>