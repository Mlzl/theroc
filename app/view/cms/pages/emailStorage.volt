<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--<link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">-->
    <link rel="stylesheet" href="https://unpkg.com/element-ui@next/lib/theme-chalk/index.css">
    <link rel="stylesheet" href="/cms/css/pages/emailStorage.css" >
</head>
<body>
    <div id="emailStorage">
        <!--头部栏-->
        {% include "smart/topBar.volt" %}
        <!--侧边栏-->
        {% include "smart/sideBar.volt" %}
        <div id="emailStorage_main" v-cloak>
           <div class="email_table">
                <div class="email_thead">
                    <p>
                        <span>序号</span>
                        <span>Email</span>
                    </p>
                </div>
               <div class="email_tbody">
                   <p v-for="(item,index) in emailStorage">
                       <span class="field">~{index+1}</span>
                       <span class="field">~{item.email}</span>
                   </p>
               </div>
               <el-pagination style="text-align:center"
                              small layout="prev, pager, next"
                              :page-size="pageSize"
                              :current-page="currentPage"
                              :total="total"
                              @current-change="handleCurrentChange()">
               </el-pagination>
           </div>

        </div>
    </div>

    {% include "common/commonjs.volt" %}
    <script type="text/javascript" src="/cms/js/pages/emailStorage.js"></script>
</body>
</html>