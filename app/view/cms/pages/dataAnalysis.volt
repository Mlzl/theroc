<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" />
    <!--<link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">-->
    <link rel="stylesheet" href="https://unpkg.com/element-ui@next/lib/theme-chalk/index.css">
    <link rel="stylesheet" href="/cms/css/pages/dataAnalysis.css" >
</head>
<body>
    <div id="dataAnalysis">
        <!--头部栏-->
        {% include "smart/topBar.volt" %}
        <!--侧边栏-->
        {% include "smart/sideBar.volt" %}
        <div id="dataAnalysis_main">
            dataAnalysis_main
        </div>
    </div>

    {% include "common/commonjs.volt" %}
    <script type="text/javascript" src="/cms/js/pages/dataAnalysis.js"></script>
</body>
</html>