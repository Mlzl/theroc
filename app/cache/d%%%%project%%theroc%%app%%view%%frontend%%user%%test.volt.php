<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>user</title>
    <!--<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-default/index.css">-->
    <!--<link rel="stylesheet" href="http://cdn.bootcss.com/element-ui/1.3.7/theme-default/index.css">-->
    <link rel="stylesheet" href="/plugin/element-ui/lib/theme-default/index.css">
    <link rel="stylesheet" href="/frontend/css/user/text.css" >
</head>
<body>
    <div class="user-container">
        <div class="userInfo">
            <div class="pic"></div>
            <div class="info">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="userForm">
            <div class="row">
                <input type="text" placeholder="User name" class="ipt1">
            </div>
            <div class="row row2">
                <span class="email"></span>
                <span class="email-info"></span>
            </div>
            <div class="row clearfix">
                <input type="text" placeholder="Date of birth" class="ipt2"><div class="fill"></div>
                <input type="text" placeholder="Gender" class="ipt2"><div class="fill"></div>
                <input type="text" placeholder="phone number" class="ipt3">
            </div>
            <div class="row clearfix ">
                <input type="text" placeholder="country" class="ipt2"><div class="fill"></div>
                <input type="text" placeholder="state" class="ipt2"><div class="fill"></div>
                <input type="text" placeholder="city" class="ipt4 "><div class="fill2"></div>
                <input type="text" placeholder="zip code" class="ipt5">
            </div>
            <div class="row row4">
                <span class="submit">submit</span>
            </div>
        </div>
    </div>

<script type="text/javascript" src="/plugin/vue.js"></script>
<!--<script src="https://unpkg.com/element-ui/lib/index.js"></script>-->
<!--<script src="http://cdn.bootcss.com/element-ui/1.3.7/index.js"></script>-->
<script src="/plugin/element-ui/lib/index.js"></script>
<script type="text/javascript" src="/frontend/js/user/index.js"></script>
</body>
</html>