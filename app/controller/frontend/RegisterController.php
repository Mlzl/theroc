<?php
namespace Roc\FrontendController;

/**
 * User: ambi
 * Date: 2017/6/21
 * 注册页
 */
class RegisterController extends FrontendController {
    public function onConstruct(){
        $this->view->setViewsDir(APP_PATH.'view/frontend');
    }

    public function indexAction(){
        $this->view->render('pages','register');
    }
}