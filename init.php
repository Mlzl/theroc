<?php
/**
 * 全局项加载
 * @copyright (c) Emlog All Rights Reserved
 */

error_reporting(7);
ob_start();
header('Content-Type: text/html; charset=UTF-8');

define('EMLOG_ROOT', dirname(__FILE__));

if (extension_loaded('mbstring')) {
	mb_internal_encoding('UTF-8');
}

require_once EMLOG_ROOT.'/config.php';
require_once EMLOG_ROOT.'/include/lib/function.base.php';

doStripslashes();

$CACHE = Cache::getInstance();

$userData = array();

define('ISLOGIN',	LoginAuth::isLogin());
define('IS_ADMIN',LoginAuth::isAdminLogin());
//站点时区
date_default_timezone_set(Option::get('timezone'));

//用户组:admin管理员, writer联合撰写人, visitor访客
define('ROLE_ADMIN', 'admin');
define('ROLE_USER', 'normal_user');
define('ROLE_VISITOR', 'visitor');
//用户角色
if(IS_ADMIN){
    define('ROLE', ROLE_ADMIN);
}else if(ISLOGIN){
    define('ROLE', ROLE_USER);
}else{
    define('ROLE', ROLE_VISITOR);
    $userData['user_id'] = 0;
}
//用户ID
define('UID', $userData['user_id']);
//站点固定地址

define('BLOG_URL', Option::get('blogurl'));
define('BASE_URL', trim(BLOG_URL, '/').'/community.php');
//模板库地址
define('TPLS_URL', BLOG_URL.'content/templates/');
//模板库路径
define('TPLS_PATH', EMLOG_ROOT.'/content/templates/');
//解决前台多域名ajax跨域
define('DYNAMIC_BLOGURL', Option::get("blogurl"));
//前台模板URL
define('TEMPLATE_URL', 	TPLS_URL.Option::get('nonce_templet').'/');

$active_plugins = Option::get('active_plugins');
$emHooks = array();
if ($active_plugins && is_array($active_plugins)) {
	foreach($active_plugins as $plugin) {
		if(true === checkPlugin($plugin)) {
			include_once(EMLOG_ROOT . '/content/plugins/' . $plugin);
		}
	}
}
