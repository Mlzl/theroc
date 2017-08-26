<?php
namespace Roc\FrontendController;

/**
 * User: ambi
 * Date: 2017/6/21
 * 首页
 */
class IndexController extends FrontendController {
    public function onConstruct(){
        $this->view->setViewsDir(APP_PATH.'view/frontend');
    }

    public function indexAction(){
        $this->view->render('pages','home');
    }
}