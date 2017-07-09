<?php
/**
 * User: ambi
 * Date: 2017/7/4
 */


$route = new \Phalcon\Mvc\Router();

$route->add('/cms/?([a-zA-Z0-9_-]*)/?([a-zA-Z0-9_]*)(/.*)*',array(
    'namespace' => $config['namespace']['cms'],
    'controller'=> 1,
    'action'    => 2,
    'params'    => 3
));
$route->add('/api/?([a-zA-Z0-9_-]*)/?([a-zA-Z0-9_]*)(/.*)*',array(
    'namespace' => $config['namespace']['api'],
    'controller'=> 1,
    'action'    => 2,
    'params'    => 3
));
$route->setDefaultNamespace($config['namespace']['frontend']);
$di->set('router', $route);