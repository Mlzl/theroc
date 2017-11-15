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
    <link rel="stylesheet" href="/frontend/css/pages/active_success.css" >
</head>
<body>
    <div id="active_success">
        <p>
            <img src="/images/cry_img.png" />
        </p>
        <p>Your account has been activated,<br/>please click <span @click="toLoginPage">this</span> to login page.</p>
    </div>

    {% include "common/commonjs.volt" %}
    <script type="text/javascript" src="/frontend/js/pages/active_success.js"></script>
</body>
</html>