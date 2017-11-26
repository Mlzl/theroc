<?php
namespace Roc\BackendController;
use \Phalcon\Mvc\Controller;
/**
 * User: ambi
 * Date: 2017/6/21
 * 用户管理页
 */
class UsermanaController extends BackendController{
    public function indexAction(){
        $this->view->render('pages','userMana');
    }
}