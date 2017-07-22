<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/cms/css/pages/carousel.css" >
</head>
<body>
    <div id="carousel">
        <!--头部导航栏-->
        {% include "smart/topBar.volt" %}
        <div id="carousel_main">
            carousel_main
        </div>
    </div>
    <script type="text/javascript" src="/plugin/vue.js"></script>
    <script src="/plugin/element-ui/lib/index.js"></script>
    <!--<script type="text/javascript" src="/frontend/js/common/common.js"></script>-->
    <script type="text/javascript" src="/cms/js/pages/carousel.js"></script>
</body>
</html>