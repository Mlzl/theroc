<?php
namespace Roc\BackendController;
use \Phalcon\Mvc\Controller;
/**
 * User: ambi
 * Date: 2017/6/21
 * 登录页
 */
class LoginController extends BackendController{
    public function indexAction(){
        $this->view->render('pages','login');
    }
}