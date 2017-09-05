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
    <link rel="stylesheet" href="/frontend/css/pages/product_search.css" >
</head>
<body>
    <div id="product_search">
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        <div id="product_search_main" v-cloak>
            <!--产品列表-->
            <div class="product_list">
                <div class="oneProduct" v-for="(item,index) in searchProductList">
                    <p class="oneProduct_img">
                        <img :src="item._picture_url[0]?item._picture_url[0]:'/images/default_img.jpeg'" />
                    </p>
                    <p class="oneProduct_desc">
                        ~{item.name}
                    </p>
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
    <script type="text/javascript" src="/frontend/js/pages/product_search.js"></script>
</body>
</html>