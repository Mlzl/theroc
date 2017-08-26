<?php
/**
 * User: ambi
 * Date: 2017/6/26
 * 用户页
 */

namespace Roc\FrontendController;

use Roc\Library\Common;
use Roc\Library\LoginStatus;

class UserController extends FrontendController{
    public function indexAction(){
        $this->view->render('pages','user');
    }

    public function logoutAction(){
        (new LoginStatus($this->di))->logout();
        Common::goLogin();
    }
}