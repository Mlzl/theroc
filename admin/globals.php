<?php
/**
 * 后台全局项加载
 * @copyright (c) Emlog All Rights Reserved
 */

require_once '../init.php';

define('TEMPLATE_PATH', EMLOG_ROOT.'/admin/views/');//后台当前模板路径
define('OFFICIAL_SERVICE_HOST', 'http://www.emlog.net/');//官方服务域名

$sta_cache = $CACHE->readCache('sta');
$user_cache = $CACHE->readCache('user');
$action = isset($_GET['action']) ? addslashes($_GET['action']) : '';


if (IS_ADMIN === false) {
        exit('后台登陆');
}

$request_uri = strtolower(substr(basename($_SERVER['SCRIPT_NAME']), 0, -4));
if (ROLE == ROLE_USER && !in_array($request_uri, array('write_log','admin_log','attachment','blogger','comment','index','save_log'))) {
    emMsg('权限不足！','./');
}
