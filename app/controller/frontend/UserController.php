<?php
/**
 * User: ambi
 * Date: 2017/6/26
 */

namespace Roc\FrontendController;

class UserController extends FrontendController{
    public function indexAction(){
        $this->view->render('user','index');
    }

}