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
        $user = \User::findUserByEmail($email);
        if(!$user){
            exit('user not exists');
        }
        if($user->status == 1){
            exit('user has activate');
        }
        if($user->status == 2){
            exit('user has been ban');
        }
        $utility = new Utility($this->di);
        if($utility->checkRegisterToken($token, $email)){
            if($user){
                $user->activateAccount();
                exit("success");
            }
        }
        exit("failed");
    }
}