<?php
namespace Roc\FrontendController;
use \Phalcon\Mvc\Controller;
/**
 * User: ambi
 * Date: 2017/6/21
 */
class IndexController extends Controller{
    public function indexAction(){
        echo 'index->frontend';
    }
    public function testDBAction(){
        $res = \Test::findFirst();
        var_dump($res->toArray());
    }
}