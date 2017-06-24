<?php
namespace Roc\FrontendController;
use \Phalcon\Mvc\Controller;
/**
 * User: ambi
 * Date: 2017/6/21
 */
class FrontendController extends Controller{

    public function onConstruct(){
        $this->view->setViewsDir(APP_PATH.'view/frontend');
    }

    public function indexAction(){
        echo 'frontend';
    }
}