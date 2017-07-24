<?php
namespace Roc\BackendController;
use \Phalcon\Mvc\Controller;
/**
 * User: ambi
 * Date: 2017/6/21
 * 博客管理页
 */
class BlogManaController extends BackendController{
    public function indexAction(){
        $this->view->render('pages','blogMana');
    }
}