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
    <link rel="stylesheet" href="/frontend/css/pages/product_detail.css" >
</head>
<body>
    <div id="product_detail">
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        <div id="product_detail_main" v-cloak>
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
    <script type="text/javascript" src="/frontend/js/pages/product_detail.js"></script>
</body>
</html>