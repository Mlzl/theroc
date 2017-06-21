<?php
date_default_timezone_set('Asia/Shanghai');
ini_set('display_errors', true);

try{
    define('ROOT_PATH', __DIR__ . '/../');
    define('APP_PATH', ROOT_PATH . 'app/');
    $di = new \Phalcon\Di\FactoryDefault();
    require_once APP_PATH.'config/service.php';
    $application = new \Phalcon\Mvc\Application($di);
    $application->setDI($di);

    $application->handle()->send();
}
catch (\Exception $e){
    var_dump($e);
}