<?php
namespace Roc\FrontendController;
use Roc\Library\Utility;

/**
 * User: ambi
 * Date: 2017/6/21
 * 登陆页
 */
class LoginController extends FrontendController {
    public function indexAction(){
        $this->view->render('pages','login');
    }

    public function activateAccountAction(){
        $token = $this->request->get('token');
        $email = $this->request->get('email');
        $utility = new Utility($this->di);
        if($utility->checkRegisterToken($token, $email)){
            $user = \User::findUserByEmail($email);
            if($user){
                $user->activateAccount();
                exit("success");
            }
        }
        exit("failed");
    }
}