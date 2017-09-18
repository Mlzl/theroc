
<div id="topBar" v-cloak>
    <img src="/images/logo.png" class="logo"/>
    <ul class="topBar_menu">
        <li :class="{active:active==0}" @click="switchPages(0)">HOME</li>
        <li :class="{active:active==1}" @click="switchPages(1)">PRODUCTS</li>
        <li @click="switchPages(2)">COMMUNITY</li>
        <li :class="{active:active==3}" @click="switchPages(3)">CONTACT US</li>
    </ul>
    <div class="topBar_right">
        <p class="search">
            <input type="text" v-model="keyword" @keyup.enter="switchPages(6)"/>
            <i class="search_icon"></i>
        </p>
        {% if user_info is defined %}
        <p class="user_info">
            {% if user_info['avatar'] != '' %}
            <img src="{{user_info['avatar']}}" />
            {% endif  %}
            <span @click="switchPages(5)">
                {% if user_info['user_name'] == '' %}
                {{user_info['email']}}
                {% else %}
                {{user_info['user_name']}}
                {% endif  %}
            </span>
            <i class="quit_icon" @click="logout"></i>
        </p>
        {% else %}
        <i class="user_icon" @click="switchPages(4,$event)"></i>
        {% endif %}
    </div>
</div>