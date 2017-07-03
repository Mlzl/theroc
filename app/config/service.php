<?php
/**
 * User: ambi
 * Date: 2016/12/19
 */


$config = require "config.php";

$loader = new \Phalcon\Loader();
$loader->registerNamespaces(array(
    $config['namespace']['cms']=>$config['directory']['cms'],
    $config['namespace']['frontend']=>$config['directory']['frontend'],
    $config['namespace']['api']=>$config['directory']['api'],
    $config['namespace']['library']=>$config['directory']['library'],
    $config['namespace']['core']=>$config['directory']['core'],
))->register();
$loader->registerDirs(
    array(
        $config['directory']['model']
    )
)->register();
$di->setShared('logger',function (){
    $logger = new \Roc\Library\Logger(APP_PATH.'logs/'.date('Y-m-d').'.log');
    return $logger;
});

$di->setShared('db',function ()use($config){
    $connection = new Phalcon\Db\Adapter\Pdo\Mysql($config['mysql']);
    return $connection;
});

$di->set('view', function() use ($config) {
    $view = new \Roc\Core\View();
    $view->setViewsDir($config['directory']['view']); //设置模版文件位置
    $view->registerEngines(array(
        ".volt" => 'volt'
    ));
    return $view;
});

$di->setShared(
    "volt",
    function ($view, $di) {
        $volt = new Phalcon\Mvc\View\Engine\Volt($view, $di);

//        $volt->setOptions(
//            [
//                "compiledPath"      => "../app/cache/",
//            ]
//        );
        return $volt;
    }
);

$route = new \Phalcon\Mvc\Router();

$route->add('/cms/?([a-zA-Z0-9_-]*)/?([a-zA-Z0-9_]*)(/.*)*',array(
    'namespace' => $config['namespace']['cms'],
    'controller'=> 1,
    'action'    => 2,
    'params'    => 3
));
$route->setDefaultNamespace($config['namespace']['frontend']);
$di->set('router', $route);


