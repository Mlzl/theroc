<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
    <!--<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-default/index.css">-->
    <!--<link rel="stylesheet" href="http://cdn.bootcss.com/element-ui/1.3.7/theme-default/index.css">-->
>>>>>>> Stashed changes
=======
    <!--<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-default/index.css">-->
    <!--<link rel="stylesheet" href="http://cdn.bootcss.com/element-ui/1.3.7/theme-default/index.css">-->
>>>>>>> Stashed changes
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/frontend/css/pages/product_search.css" >
</head>
<body>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <div id="product_search">
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        <div id="product_search_main" v-cloak>
            <!--产品列表-->
            <div class="product_list">
                <div class="oneProduct" v-for="n in 12">
                    <p class="oneProduct_img">
                        <img src="/images/ali.jpg" />
                    </p>
                    <p class="oneProduct_desc">
                        产品标题
                    </p>
                </div>
            </div>
        </div>
=======
=======
>>>>>>> Stashed changes
    <div id="products_search" v-cloak>
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        search
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        <!--底部-->
        {% include "smart/footer.volt" %}
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <script src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/frontend/js/common/common.js"></script>
=======
    <!--<script src="https://unpkg.com/element-ui/lib/index.js"></script>-->
    <!--<script src="http://cdn.bootcss.com/element-ui/1.3.7/index.js"></script>-->
    <script src="/plugin/element-ui/lib/index.js"></script>
>>>>>>> Stashed changes
=======
    <!--<script src="https://unpkg.com/element-ui/lib/index.js"></script>-->
    <!--<script src="http://cdn.bootcss.com/element-ui/1.3.7/index.js"></script>-->
    <script src="/plugin/element-ui/lib/index.js"></script>
>>>>>>> Stashed changes
    <script type="text/javascript" src="/frontend/js/pages/product_search.js"></script>
</body>
</html>