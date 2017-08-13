
<ul id="sideBar" v-cloak>
    <li @click="switchPages(0)">
        <i class="areaGraph_icon"></i>
        <span>轮播图</span>
    </li>
    <li class="active" @click="switchPages(1)">
        <i class="cog_icon"></i>
        <span>产品管理</span>
    </li>
    <li @click="switchPages(2)">
        <i class="tables_icon"></i>
        <span>模块管理</span>
    </li>
    <li @click="switchPages(3)">
        <i class="email_icon"></i>
        <span>Email存储</span>
    </li>
    <li @click="switchPages(4)">
        <i class="pencil_icon"></i>
        <span>评价管理</span>
    </li>
    <li @click="switchPages(5)">
        <i class="location_icon"></i>
        <span>用户管理</span>
    </li>
    <li @click="switchPages(6)">
        <i class="monitor_icon"></i>
        <span>博客管理</span>
    </li>
</ul>