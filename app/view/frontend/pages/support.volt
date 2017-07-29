<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/frontend/css/pages/support.css">
</head>
<body>
<div id="support">
    <!--头部导航栏-->
    {% include "smart/topBar.volt" %}
    <div id="support_main" v-cloak>
        <div class="banner-container">
            <img class="img" src="/frontend/image/supportBg.jpg">
            <div class="search">
                <div class="title">DOWNLOAD</div>
                <div class="search-tip">Search By Product Name</div>
                <form action="" method="get" class="productForm clearfix">
                    <input type="text" class="searchText">
                    <button class="submit"></button>
                </form>

            </div>
        </div>
        <ul class="service-nav clearfix">
            <li :class="{active:activeTab==='refunds-tab'}" @click="clickTab('refunds-tab')">
                <i class="refunds-icon"></i>
                <p>Refunds&Exchanges</p>
            </li>
            <li :class="{active:activeTab==='warranty-tab'}" @click="clickTab('warranty-tab')">
                <i class="warranty-icon"></i>
                <p>Warranty</p>
            </li>
        </ul>
        <div class="module-container">
            <div class="refunds" v-show="activeTab==='refunds-tab'">
                <div class="refunds-header">
                    <span class="logo">
                        <img src="/images/logo.png" alt="">
                    </span>
                    <span class="header-text">XXXX</span>
                </div>
                <form class="refunds-form">
                    <div class="container">
                        <div class="item-title">Contant Infomation</div>
                        <div><input type="text" class="inp-normal" placeholder="Email Address"><i class="required">*</i>
                        </div>
                        <div><input class="inp-normal" type="text" placeholder="Name"><i class="required">*</i></div>
                    </div>
                    <div class="order">
                        <div class="item-title">Order Details</div>
                        <div><span><input class="inp-normal" type="text" placeholder="Please select"><i
                                class="required">*</i></span></div>
                    </div>
                    <div class="issue">
                        <div class="item-title">Issue Details</div>
                        <div><textarea name="detail" id="" class="detail"></textarea></div>
                    </div>
                    <div class="images item-title">
                        <div>Images</div>
                        <div class="imageContainer"></div>
                    </div>
                    <div class="form-footer clearfix">
                        <div class="footer-btns">
                            <input type="text" id="vertify_code" class="input-code" placeholder="Copy The CAPTCHA">
                            <span class="code"></span>
                            <button class="btn submit">SUBMIT</button>
                            <button class="btn reset">RESET</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="warranty" v-show="activeTab==='warranty-tab'">
                <h2>Warranty</h2>
                <div class="warranty-content">
                    <dl>
                        <dt>30-Day Money-Back Guarantee for Any Reason</dt>
                        <dd>
                            <p>You may return your undamaged product and packaging within 30 days of purchase to receive
                                a FULL REFUND for any reason. If the reason for return isn’t quality-related, the
                                customer must pay the return shipping costs.</p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>18-Month Warranty for Quality-Related Issues</dt>
                        <dd>
                            <div>
                                <h4>● Requests within country of purchase</h4>
                                <p>We will take care of all quality-related issues with a REPLACEMENT or FULL REFUND
                                    including any return shipping costs. Please note: Any provided shipping labels must
                                    be used within 20 days of purchase.</p>
                            </div>
                            <div>
                                <h4>● Requests from outside country of purchase</h4>
                                <p>We will take care of all quality-related issues with a FULL REFUND or REPLACEMENT.
                                    International shipping costs must be covered by the customer.</p>
                            </div>
                            <div>
                                <h4>● Requests for orders shipped internationally</h4>
                                <p>We will take care of all quality-related issues with a FULL REFUND including any
                                    return shipping costs. This includes purchases shipped overseas from the USA via
                                    Amazon or eBay.</p>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>For purchases made through other retailers:</dt>
                        <dd>
                            <p>Other retailers’ after-sales support policies will vary. Please contact the retailer
                                directly for specific guidance on their warranty process.</p>
                            <p>Unauthorized reselling of Anker products is strictly prohibited.</p>
                        </dd>
                    </dl>
                </div>
                <h2>FAQs:</h2>
                <div class="faqs-content">
                    <dl>
                        <dt>1. What isn’t covered by the warranty?</dt>
                        <dd>
                            <ul>
                                <li>● Purchases from Lazada</li>
                                <li>● Purchases from unauthorized resellers</li>
                                <li>● Improperly operated devices</li>
                                <li>● Lost or stolen products</li>
                                <li>● Purchases made over 18 months ago (unless otherwise stated)</li>
                                <li>● Non quality-related issues (after 30 days of purchase)</li>
                                <li>● Free products</li>
                            </ul>
                        </dd>
                    </dl>
                    <dl>
                        <dt>2. When does the warranty begin?</dt>
                        <dd>
                            <p>
                                It begins the day you place your order.
                            </p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>3. How do I claim the warranty?</dt>
                        <dd>
                            <p>Before submitting a warranty claim, please refer to the specific FAQs for your product
                                and attempt all troubleshooting suggestions.</p>
                            <p>If you believe the item is defective and under warranty, please submit a Return or
                                Exchange request on the product’s support page, or contact us at support@xxxx.com</p>
                        </dd>
                    </dl>

                    <dl>
                        <dt>4. What is a validhave any proof of purchase?</dt>
                        <dd>
                            <p>
                                ● An Amazon order number or eBay username for a purchase made through AnkerDirect
                            </p>
                            <p>
                                ● A dated sales receipt from an authorized Anker Reseller that shows a description of
                                the product along with its price
                            </p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>5. What if I don’t have any proof of purchase?</dt>
                        <dd>
                            <p>● If you made your purchase through AnkerDirect, we may be able to locate your order
                                using your email address, name or shipping address.</p>
                            <p>● If you made your purchase through an authorized Anker Reseller, you may contact the
                                Reseller to see if they can provide a copy of your receipt.</p>
                            <p>● If the product was a gift, you may ask the giver to provide you with a copy of the
                                receipt or claim the warranty on your behalf.</p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>6. Will the warranty be renewed if my product is replaced?</dt>
                        <dd>
                            <p>The warranty continues from the date of your original purchase. It won’t be renewed after
                                a replacement has been provided.</p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>7. Who are authorized Anker Retailers and Resellers?</dt>
                        <dd>
                            <p>Our major authorized Retailers and Resellers are Newegg, Staples, RadioShack and
                                Amazon.com LLC. For more information, please contact us at support@xxxx.com</p>
                        </dd>
                    </dl>
                </div>

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
<script type="text/javascript" src="/frontend/js/pages/support.js"></script>
</body>
</html>