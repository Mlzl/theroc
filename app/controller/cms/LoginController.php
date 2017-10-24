<?php
namespace Roc\BackendController;
use \Phalcon\Mvc\Controller;
/**
 * User: ambi
 * Date: 2017/6/21
 * 登录页
 */
class LoginController extends BackendController{
    public function onConstruct(){
        $this->view->setViewsDir(APP_PATH.'view/cms');
    }

    public function indexAction(){
        $this->view->render('pages','login');
    }
}