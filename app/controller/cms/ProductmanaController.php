<?php
namespace Roc\BackendController;
use \Phalcon\Mvc\Controller;
/**
 * User: ambi
 * Date: 2017/6/21
 * 产品管理页
 */
class ProductmanaController extends BackendController{
    public function indexAction(){
        $this->view->render('pages','productMana');
    }
    public function detailAction(){
        $this->view->render('pages','product_detail');
    }
}