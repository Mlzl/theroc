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
    <link rel="stylesheet" href="/frontend/css/pages/company.css" >
    {% include "common/analysis.volt" %}
</head>
<body>
    <div id="company">
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        <div id="company_main" v-cloak>
            <div class="contactUsImg">
                <img src="/images/companyImg.jpg" />
            </div>
            <div class="info">
                Shenzhen Limskey Technology Co.,Ltd. is one professional new-energy base manufacturing high power rechargeable batteries and cores which are use for RC filed. We provide one stop service for battery cell production, R&D, Assemble & Produce, and market sales. Our company owns professional R&D technology and management team. We can provide customized battery cores and optimal battery cells as sembling plan according to customer’s need. With the products’ strength of high security, reliability, high discharge plateau, long cycle life etc., we win recognition and praise of customers from both home and abroad.
                Products are widely applied for UAV, RC airplane, RC models, RC boat model, RC gun model, Robot, Medical facility, Fashing machine, Monocycle, Electric power tool, etc. we can meet customers from various files, in different degree, and different circumstances. Our products win customers’ s praise because of products feature of small size, light weight, stable performance, long discharge time, high power discharge performance, etc.
                Our company receive OEM, ODM order. Full range of battery cells, sufficient stock, deliver in time! We have professional self-test team, strict test working procedure. We will provide you with our Best Buys products and Excellent After-sales service wholeheartedly.
            </div>
        </div>
        <!--底部-->
        {% include "smart/footer.volt" %}
    </div>

    {% include "common/commonjs.volt" %}
    <script type="text/javascript" src="/frontend/js/pages/company.js"></script>
</body>
</html>