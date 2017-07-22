<?php
namespace Roc\FrontendController;
use Roc\Library\LoginStatus;

/**
 * User: ambi
 * Date: 2017/6/21
 */
class LoginController extends FrontendController {
    public function indexAction(){

        $loginStatusLib = new LoginStatus($this->di);
        $loginStatusLib->setLoginStatus(1, array('user_id'=>1, 'email'=>'1069163403@qq.com'));
        var_dump($this->user);
        exit();
    }
}