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
                        <img :src="curCoverImg?curCoverImg:'/images/default_img.png'" />
                    </p>
                    <ul class="picShowUl">
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
                    <ul class="classifyAttr">
                        <li :class="{active:curClassifyAttr_index==index}"
                            v-for="(item,index) in productDetail.attr"
                            @click="switchClassifyAttr(item,index)">
                            ~{item.name}
                        </li>
                    </ul>
                    <ul class="picShowUl">
                        <li v-for="(item,index) in productDetail._picture_url" @click="">
                            <img :src="item" />
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
                    <ul class="comment_list">
                        <li class="oneComment" v-for="(item,index) in commentList">
                            <p><img src="/images/star_icon.png" v-for="n in item._star_num" /></p>
                            <p>
                                <span>~{item.user_name}</span>
                                <span>~{item._create_time}</span>
                            </p>
                            <p>~{item.content}</p>
                        </li>
                    </ul>
                    <el-pagination style="text-align:center"
                                   small layout="prev, pager, next"
                                   :page-size="commentList_size"
                                   :current-page="commentList_page"
                                   :total="commentList_total"
                                   @current-change="commentChange">
                    </el-pagination>
                    <el-button class="comment_btn" @click="showAddComment(true)">I WANT COMMENT</el-button>
                </div>
            </div>
            <!--添加评价 弹出框-->
            <el-dialog title="I WANT COMMENT" v-model="addComment_show" custom-class="addComment_dialog"
                       :show-close=false :close-on-click-modal=false>
                <div class="addComment_dialog_main">
                    <p>
                        <img :src="item" v-for="(item,index) in star_arr" @click="selectStar(index)"/>
                    </p>
                    <textarea v-model="comment_content" placeholder="please input comment content"></textarea>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showAddComment(false)">取 消</el-button>
                    <el-button type="primary" @click="commentDeterBtn">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!--底部-->
        {% include "smart/footer.volt" %}
    </div>
    {% include "common/commonjs.volt" %}
    <script type="text/javascript" src="/frontend/js/pages/product_detail.js"></script>
</body>
</html>