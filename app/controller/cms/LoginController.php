<?php
namespace Roc\BackendController;
use Roc\Library\LoginStatus;

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
        $loginLib = new LoginStatus($this->di);
        if($loginLib->isAdminLogin()){
            header("Location: ".$_SERVER['SERVER_NAME']);
            exit();
        }
        $this->view->render('pages','login');
    }

    public function logoutAction(){
        $loginStatus = new LoginStatus($this->di);
        $loginStatus->logout();
    }
}