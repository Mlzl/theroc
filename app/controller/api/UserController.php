<?php
/**
 * User: ambi
 * Date: 2017/7/3
 */

namespace Roc\ApiController;
use Roc\Library\Language;

use Roc\Library\Captcha;
use Roc\Library\LoginStatus;
use Roc\Library\PhpMailer;
use Roc\Library\Response;

class UserController extends ApiController{

    public function loginAction(){
        $email = $this->request->getPost('email');
        $password = $this->request->getPost('password');
        /*$captcha = $this->request->getPost('captcha');
        if(!Captcha::verify($captcha)){
            Response::error(Language::CAPTCHA_ERROR);
        }*/
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
        $loginStatusLib = new LoginStatus($this->di);
        $loginStatusLib->setLoginStatus($user_info['user_id'], $user_info);
        Response::success($user_info);
    }

    public function getCaptchaAction(){
        $captcha = new Captcha();
        $captcha->paintText();
        $base64 = $captcha->getBase64Image();
        $data = array(
            'base64'=>$base64,
            'img_type'=>$captcha->imageType
        );
        Response::success($data);
    }

    public function registerAction(){
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
            PhpMailer::sendRegisterMail($email, $username);
            Response::success($userModel->toArray());
        }
        Response::error(Language::REGISTER_ERROR);
    }
}