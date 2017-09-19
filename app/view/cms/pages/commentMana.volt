<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/cms/css/pages/commentMana.css" >
</head>
<body>
    <div id="commentMana">
        <!--头部栏-->
        {% include "smart/topBar.volt" %}
        <!--侧边栏-->
        {% include "smart/sideBar.volt" %}
        <div id="commentMana_main" v-cloak>
            <div class="comment_table" >
                <div class="thead clearfix">
                    <span>序号</span>
                    <span>标题</span>
                    <span>评价人</span>
                    <span>星级</span>
                    <span>评价内容</span>
                    <span>状态</span>
                </div>
                <div class="tbody">
                    <p v-for="(item,index) in commentList" class="clearfix">
                        <span>~{index+1}</span>
                        <span>~{item.title}</span>
                        <span>~{item.appraiser}</span>
                        <span>~{item.starNum}</span>
                        <span>
                            <img v-for="dd in item.starNum" src="/images/star.png" alt="星星" />
                        </span>
                        <span>~{item.content}</span>
                        <span class="state"><i :class="{ on: item.state==='on',off: item.state==='off'}"  @click="changeState(index)"></i></span>
                    </p>
                </div>
            </div>
        </div>
    </div>

    {% include "common/commonjs.volt" %}
    <script type="text/javascript" src="/cms/js/pages/commentMana.js"></script>
</body>
</html>