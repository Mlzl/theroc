{% include "common/seo.volt" %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="{{keywords}}">
    <meta name="description" content="{{description}}">
    <title>{{title}}</title>
    <!-- element ui -->
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <!-- private -->
    <link rel="stylesheet" href="/frontend/css/pages/product.css" >
</head>
<body>
    <div id="product">
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        <div id="product_main" v-cloak>
            <!--轮播图-->
            <div class="carouselArea">
                <el-carousel height="342px">
                    <el-carousel-item v-for="item in bannerList" :key="item">
                        <img :src="item.value.picture_url"  @click="locateHref(item.value.target_url)"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!--产品列表-->
            <div class="product_list">
                <div class="category">
                    <ul class="primary">
                        <li v-for="(item1,index1) in allClass">
                            ~{item1.name}
                            <ul class="secondary">
                                <li v-for="(item2,index2) in item1.child">
                                    ~{item2.name}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="theProduct">
                    <div class="oneProduct" v-for="(item,index) in curProductList" @click="toDetailPage(item.product_id)">
                        <p class="oneProduct_img">
                            <img :src="item._picture_url[0]" />
                        </p>
                        <p class="oneProduct_desc">
                            ~{item.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!--底部-->
        {% include "smart/footer.volt" %}
    </div>
    <!-- vue -->
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script type="text/javascript" src="/plugin/vue-resource/dist/vue-resource.js"></script>
    <!-- element ui -->
    <script type="text/javascript" src="/plugin/element-ui/lib/index.js"></script>
    <!-- private -->
    <script type="text/javascript" src="/frontend/js/common/common.js"></script>
    <script type="text/javascript" src="/frontend/js/pages/product.js"></script>
</body>
</html>