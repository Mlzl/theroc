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
    <link rel="stylesheet" href="/frontend/css/pages/contact.css" >
    {% include "common/analysis.volt" %}
</head>
<body>
    <div id="contact">
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        <div id="contact_main" v-cloak>
            <h1>Contact Us</h1>
            <p>Whatever your question, we’re here to help.</p>
            <div class="contantUs">
                <div class="emailUs">
                    <h4>email us</h4>
                    <p>245452530@qq.com</p>
                </div>
                <div class="callUs">
                    <h4>call us</h4>
                    <p>13560455672</p>
                </div>
            </div>
        </div>
        <!--底部-->
        {% include "smart/footer.volt" %}
    </div>

    {% include "common/commonjs.volt" %}
    <script type="text/javascript" src="/frontend/js/pages/contact.js"></script>
</body>
</html>