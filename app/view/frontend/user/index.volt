<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-default/index.css">-->
    <!--<link rel="stylesheet" href="http://cdn.bootcss.com/element-ui/1.3.7/theme-default/index.css">-->
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/frontend/css/user/index.css" >
</head>
<body>
    <div id="user" v-cloak>
        <!--头部导航栏-->
        {% include "topBar.volt" %}
        user
        <!--底部-->
        {% include "footer.volt" %}
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <!--<script src="https://unpkg.com/element-ui/lib/index.js"></script>-->
    <!--<script src="http://cdn.bootcss.com/element-ui/1.3.7/index.js"></script>-->
    <script src="/plugin/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/frontend/js/user/index.js"></script>
</body>
</html>