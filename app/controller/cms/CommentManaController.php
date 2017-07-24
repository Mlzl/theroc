<?php
namespace Roc\BackendController;
use \Phalcon\Mvc\Controller;
/**
 * User: ambi
 * Date: 2017/6/21
 * 评价管理页
 */
class CommentManaController extends BackendController{
    public function indexAction(){
        $this->view->render('pages','commentMana');
    }
}