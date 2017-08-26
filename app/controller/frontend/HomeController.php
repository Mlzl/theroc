<?php
namespace Roc\FrontendController;

/**
 * User: ambi
 * Date: 2017/6/21
 * 首页
 */
class HomeController extends FrontendController {
    public function indexAction(){
        $this->view->render('pages','home');
    }
}