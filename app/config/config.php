<?php
/**
 * User: ambi
 * Date: 2016/12/3
 */
return array(
    'directory'=>array(
        'library'=>APP_PATH.'library',
        'cms'=>APP_PATH.'controller/cms',
        'frontend'=>APP_PATH.'controller/frontend',
        'api'=>APP_PATH.'controller/api',
        'view'=>APP_PATH.'view',
        'core'=>APP_PATH.'core',
        'model'=>APP_PATH.'model',
    ),
    'namespace' =>array(
        'cms'=>"Roc\\BackendController",
        'frontend'=>"Roc\\FrontendController",
        'library'=>"Roc\\Library",
        'core'  =>"Roc\\Core",
        'api'  =>"Roc\\ApiController",
    ),
    'mysql' =>array(
        'host'=>getenv('THEROC_MYSQL_HOST'),
        'password'=>getenv('THEROC_MYSQL_PASSWORD'),
        'username'=>getenv('THEROC_MYSQL_USERNAME'),
        'port'=>getenv('THEROC_MYSQL_PORT'),
        'dbname'=>getenv('THEROC_MYSQL_DATABASE'),
        'charset' => 'utf8',
    ),
    'redis' =>array(
        'host'=>getenv('THEROC_REDIS_HOST'),
        'port'=>getenv('THEROC_REDIS_PORT')
    ),
);