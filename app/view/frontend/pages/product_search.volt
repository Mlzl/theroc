{% include "common/seo.volt" %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="{{keywords}}">
    <meta name="description" content="{{description}}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <title>{{title}}</title>
    <!--<link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">-->
    <link rel="stylesheet" href="https://unpkg.com/element-ui@next/lib/theme-chalk/index.css">
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
                        <img :src="item._picture_url[0]?item._picture_url[0]:'/images/default_img.png'" />
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

    {% include "common/commonjs.volt" %}
    <script type="text/javascript" src="/frontend/js/pages/product_search.js"></script>
</body>
</html>