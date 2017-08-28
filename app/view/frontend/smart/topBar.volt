
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
            <i class="search_icon"></i>
        </p>
        {% if user_info is defined %}
        <p class="user_info">
            <img src="{{user_info['avatar']}}" />
            <span @click="switchPages(5)">
                {% if user_info['user_name'] == '' %}
                {{user_info['email']}}
                {% else %}
                {{user_info['user_name']}}
                {% endif  %}
            </span>
            <span>退出</span>
        </p>
        {% else %}
        <i class="user_icon" @click="switchPages(4,$event)"></i>
        <span>登陆</span>
        {% endif %}
    </div>
</div>