<?php
namespace Roc\BackendController;
use \Phalcon\Mvc\Controller;
/**
 * User: ambi
 * Date: 2017/6/21
 * 产品管理页
 */
class ProductManaController extends BackendController{
    public function indexAction(){
        $this->view->render('pages','productMana');
    }
}