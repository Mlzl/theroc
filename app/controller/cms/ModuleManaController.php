<?php
namespace Roc\BackendController;
use \Phalcon\Mvc\Controller;
/**
 * User: ambi
 * Date: 2017/6/21
 * 模块管理页
 */
class ModuleManaController extends BackendController{
    public function indexAction(){
        $this->view->render('pages','moduleMana');
    }
}