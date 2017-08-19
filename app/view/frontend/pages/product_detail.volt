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
                        <img :src="curCoverImg" />
                    </p>
                    <ul>
                        <li :class="{active:coverImg_index==index}"
                            v-for="(item,index) in productDetail._picture_url"
                            @click="switchCoverImg(item,index)">
                            <img :src="item" />
                        </li>
                    </ul>
                </div>
                <div class="attrShow">
                    <h3>~{productDetail.name}</h3>
                    <p>~{productDetail.label}</p>
                    <p>$~{curPrice}</p>
                    <ul>
                        <li :class="{active:curClassifyAttr_index==index}"
                            v-for="(item,index) in productDetail.attr"
                            @click="switchClassifyAttr(item,index)">
                            ~{item.name}
                        </li>
                    </ul>
                    <el-button @click="toTargetUrl(productDetail.target_url)">BUY NOW</el-button>
                </div>
            </div>
            <!--图文详情和买家评价-->
            <div class="productDesc">
                <ul class="productDesc_header">
                    <li :class="{active:tab==0}" @click="tabChange(0)">Highlights</li>
                    <li :class="{active:tab==1}" @click="tabChange(1)">comments</li>
                </ul>
                <!--图文详情-->
                <div v-show="tab==0" class="imageText" v-html="productDetail.img_txt_detail"></div>
                <!--买家评价-->
                <div v-show="tab==1" class="comment">
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
                    <el-pagination style="text-align:center"
                                   small layout="prev, pager, next" :total="50" >
                    </el-pagination>
                    <el-button class="comment_btn" @click="showAddComment(true)">I WANT COMMENT</el-button>
                </div>
            </div>
            <!--添加评价 弹出框-->
            <el-dialog title="我要评价" v-model="addComment_show" custom-class="addComment_dialog"
                       :show-close=false :close-on-click-modal=false>
                <div class="addComment_dialog_main">
                    <el-input placeholder="请输入产品标题"></el-input>
                    <el-input placeholder="请输入自定义属性"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showAddComment(false)">取 消</el-button>
                    <el-button type="primary" @click="">确 定</el-button>
                </span>
            </el-dialog>
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