<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
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
                    <el-carousel-item v-for="item in 4" :key="item">
                        <img src="/images/ali.jpg" />
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!--产品列表-->
            <div class="product_list">
                <div class="category">
                    <ul class="primary">
                        <li>
                            <img src="" />
                            <p>产品分类1</p>
                            <ul class="secondary">
                                <li>
                                    <img src="" />
                                    <p>二级分类1</p>
                                </li>
                                <li>
                                    <img src="" />
                                    <p>二级分类2</p>
                                </li>
                                <li>
                                    <img src="" />
                                    <p>二级分类3</p>
                                </li>
                                <li>
                                    <img src="" />
                                    <p>二级分类4</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <img src="" />
                            <p>产品分类2</p>
                        </li>
                        <li>
                            <img src="" />
                            <p>产品分类3</p>
                        </li>
                        <li>
                            <img src="" />
                            <p>产品分类4</p>
                        </li>
                    </ul>
                </div>
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
        <!--底部-->
        {% include "smart/footer.volt" %}
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script type="text/javascript" src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/plugin/vue-resource/dist/vue-resource.js"></script>
    <script type="text/javascript" src="/frontend/js/common/common.js"></script>
    <script type="text/javascript" src="/frontend/js/pages/product.js"></script>
</body>
</html>