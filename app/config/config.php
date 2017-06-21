<?php
/**
 * User: ambi
 * Date: 2016/12/3
 */
return array(
    'directory'=>array(
        'library'=>APP_PATH.'library',
        'backend'=>APP_PATH.'controller/backend',
        'frontend'=>APP_PATH.'controller/frontend',
        'view'=>APP_PATH.'view',
        'core'=>APP_PATH.'core',
        'model'=>APP_PATH.'model',
    ),
    'namespace' =>array(
        'backend'=>"Roc\\BackendController",
        'frontend'=>"Roc\\FrontendController",
        'library'=>"Roc\\Library",
    ),
    'mysql' =>array(
        'host'=>getenv('THEROC_MYSQL_HOST'),
        'password'=>getenv('THEROC_MYSQL_PASSWORD'),
        'username'=>getenv('THEROC_MYSQL_USERNAME'),
        'port'=>getenv('THEROC_MYSQL_PORT'),
        'dbname'=>getenv('THEROC_MYSQL_DATABASE'),
        'charset' => 'utf8',
    )
);