<div id="footer" v-cloak>
    <div class="subscribe">
        <h4>Subscribe</h4>
        <div class="email_submit">
            <p>Be the first to know bout our lastest products</p>
            <input v-model="otherEmail" type="text" placeholder="Enter your email address"/><br/>
            <el-button @click="submitEmailBtn()">SUBMIT</el-button>
        </div>
        <div class="link">
            <i v-for="item in linkIcon" :class="item" @click="toOtherLink(item,$event)"></i>
        </div>
    </div>
    <div class="about">
        <h4>About</h4>
        <ul>
            <li><span @click="switchPages(0,$event)">Contact us</span></li>
        </ul>
    </div>
    <div class="support">
        <h4>Support</h4>
        <ul>
            <li><span @click="switchPages(1,$event)">Refund & Exchange</span></li>
            <li><span @click="switchPages(2,$event)">Warranty</span></li>
        </ul>
    </div>
    <div class="contact">
        <div class="call">
            <h4>Call us</h4>
            <p>13560455672</p>
        </div>
        <div class="email">
            <h4>Email</h4>
            <p>245452530@qq.com</p>
        </div>
    </div>
</div>