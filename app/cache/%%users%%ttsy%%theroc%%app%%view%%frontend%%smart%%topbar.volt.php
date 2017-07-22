
<div id="topBar" v-cloak>
    <img src="/images/logo.png" class="logo"/>
    <ul class="topBar_menu">
        <li @click="switchPages(0)">HOME</li>
        <li @click="switchPages(1)">PRODUCTS</li>
        <li @click="switchPages(2)">COMMUNITY</li>
        <li @click="switchPages(3)">CONTACT US</li>
    </ul>
    <div class="topBar_right">
        <p class="search">
            <input type="text" />
        </p>
        <i class="user_icon"></i>
    </div>
</div>