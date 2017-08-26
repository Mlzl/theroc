<?php
namespace Roc\BackendController;
use \Phalcon\Mvc\Controller;
/**
 * User: ambi
 * Date: 2017/6/21
 * 轮播图页
 */
class CarouselController extends BackendController{
    public function indexAction(){
        $this->view->render('pages','carousel');
    }
}