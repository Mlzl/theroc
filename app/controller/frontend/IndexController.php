<?php
namespace Roc\FrontendController;
use Roc\Library\LoginStatus;

/**
 * User: ambi
 * Date: 2017/6/21
 * 首页
 */
class IndexController extends FrontendController {
    public function onConstruct(){
        $this->view->setViewsDir(APP_PATH.'view/frontend');
        $loginLib = new LoginStatus($this->di);
        if($user_info = $loginLib->isLogin()){
            $this->view->setVar("user_info", $user_info);
        }
        $this->view->setViewsDir(APP_PATH.'view/frontend');
    }

    public function indexAction(){
        $this->view->render('pages','home');
    }

}

