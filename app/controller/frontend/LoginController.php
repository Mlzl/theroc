<?php
namespace Roc\FrontendController;
use Roc\Library\Common;
use Roc\Library\LoginStatus;
use Roc\Library\Utility;

/**
 * User: ambi
 * Date: 2017/6/21
 * 登陆页
 */
class LoginController extends FrontendController {

    public function onConstruct(){
        $loginLib = new LoginStatus($this->di);
        if($user_info = $loginLib->isLogin()){
            Common::goHome();
        }
        $this->view->setViewsDir(APP_PATH.'view/frontend');
    }

    public function indexAction(){
        $this->view->render('pages','login');
    }

    public function activateAccountAction(){
        $token = $this->request->get('token');
        $email = $this->request->get('email');
        $user = \User::findUserByEmail($email);
        if(!$user){
            $this->view->render('pages','active_fail');
        }
        if($user->status == 1){
            $this->view->render('pages','active_success');
        }
        if($user->status == 2){
            $this->view->render('pages','active_fail');
        }
        $utility = new Utility($this->di);
        if($utility->checkRegisterToken($token, $email)){
            if($user){
                $user->activateAccount();
                $this->view->render('pages','active_success');
            }
        }
        $this->view->render('pages','active_fail');
    }
}