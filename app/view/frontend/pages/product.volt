{% include "common/seo.volt" %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="{{keywords}}">
    <meta name="description" content="{{description}}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <title>{{title}}</title>
    <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" />
    <!--<link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">-->
    <link rel="stylesheet" href="https://unpkg.com/element-ui@next/lib/theme-chalk/index.css">
    <link rel="stylesheet" href="/frontend/css/pages/product.css" >
    {% include "common/analysis.volt" %}
</head>
<body>
    <div id="product">
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        <div id="product_main" v-cloak>
            <!--轮播图-->
            <div class="carouselArea">
                <el-carousel arrow="never">
                    <el-carousel-item v-for="item in bannerList" :key="item">
                        <img :src="item.value.picture_url" @click="locateHref(item.value.target_url)"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!--产品列表-->
            <div class="product_list">
                <div class="category">
                    <ul class="primary">
                        <li class="primary_li" v-for="(item1,index1) in allClass" @click.stop="switchClass(item1)">
                            ~{item1.name}
                            <ul class="secondary">
                                <li v-for="(item2,index2) in item1.child" @click.stop="switchClass(item2)">
                                    ~{item2.name}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="theProduct">
                    <div class="oneProduct" v-for="(item,index) in curProductList" @click="toDetailPage(item.product_id)">
                        <p class="oneProduct_img">
                            <img :src="item._picture_url[0]?item._picture_url[0]:'/images/default_img.png'" />
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

    {% include "common/commonjs.volt" %}
    <script type="text/javascript" src="/frontend/js/pages/product.js"></script>
</body>
</html>