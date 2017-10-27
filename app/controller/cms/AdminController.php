<?php
/**
 * User: ambi
 * Date: 2017/7/3
 */

namespace Roc\BackendController;
use Roc\Library\Language;

use Roc\Library\Captcha;
use Roc\Library\LoginStatus;
use Roc\Library\PhpMailer;
use Roc\Library\Response;
use Roc\Library\Utility;

class AdminController extends BackendController {

    public function onConstruct(){
        //不继承父方法
    }

    public function api_loginAction(){
        $email = $this->request->getPost('email');
        $password = $this->request->getPost('password');
        if(!$email){
            Response::error(Language::EMAIL_EMPTY);
        }
        if(!$password){
            Response::error(Language::PASSWORD_EMPTY);
        }
        $userModel = new \User();
        if (!$user_info = $userModel->login($email, $password)){
            Response::error($userModel->getMessage());
        }
        $adminInfo = \Admin::getAdminByUserId($user_info['user_id']);
        if(!$adminInfo){
            Response::error(Language::USER_NOT_EXISTS);
        }
        $loginStatusLib = new LoginStatus($this->di);
        $loginStatusLib->setLoginStatus($user_info['user_id'], $user_info, true);
        Response::success($user_info);
    }

    public function api_registerAction(){
        $email = $this->request->getPost('email');
        $password = $this->request->getPost('password');
        $captcha = $this->request->getPost('captcha');
        $username = $this->request->getPost('username');
        if(!Captcha::verify($captcha)){
            Response::error(Language::CAPTCHA_ERROR);
        }
        if(!$email){
            Response::error(Language::EMAIL_EMPTY);
        }
        if(!$password){
            Response::error(Language::PASSWORD_EMPTY);
        }
        if(!$username){
            Response::error(Language::USER_NAME_EMPTY);
        }
        if(\User::findUserByEmail($email)){
            Response::error(Language::EMAIL_HAD_BE_USED);
        }
        $userModel = new \User();
        $data = array(
            'user_name' =>$username,
            'password'  =>$password,
            'email'     =>$email,
        );
        if($userModel->addUser($data)){
            $token = (new Utility($this->di))->geneRegisterToken($email);
            PhpMailer::sendRegisterMail($email, $username, $token);
            Response::success($userModel->toArray());
        }
        Response::error(Language::REGISTER_ERROR);
    }

    public function testAction(){
        $key = "theroc:login:user:info:a24d1a6f1626323e5fcb3bb73b51db19";
        var_dump($this->redis->get($key));
    }
}