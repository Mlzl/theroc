<?php
namespace Roc\BackendController;
use \Phalcon\Mvc\Controller;
/**
 * User: ambi
 * Date: 2017/6/21
 * 退款管理页
 */
class ReturnManaController extends BackendController{
    public function indexAction(){
        $this->view->render('pages','returnMana');
    }
}