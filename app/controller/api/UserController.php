<?php
/**
 * User: ambi
 * Date: 2017/7/3
 */

namespace Roc\ApiController;
use Roc\Library\Language;

use Roc\Library\Captcha;
use Roc\Library\Library;
use Roc\Library\LoginStatus;
use Roc\Library\Password;
use Roc\Library\PhpMailer;
use Roc\Library\Response;

class UserController extends ApiController{

    public function loginAction(){
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
        $username = $this->request->getPost('username');
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
            //PhpMailer::sendRegisterMail($email, $username);
            Response::success($userModel->toArray());
        }
        Response::error(Language::REGISTER_ERROR);
    }

    public function update_profileAction(){
        $user_id = intval($this->request->getPost('user_id'));
        $user_name = $this->request->getPost('user_name');
        $password = $this->request->getPost('password');
        $old_password = $this->request->getPost('old_password');
        $country = $this->request->getPost('country');
        $state = $this->request->getPost('state');
        $city = $this->request->getPost('city');
        $zip_code = $this->request->getPost('zip_code');
        $sex = $this->request->getPost('sex');
        $cellphone = $this->request->getPost('cellphone');
        $avatar = $this->request->getPost('avatar');
        if(!$user_id){
            Response::error(Language::LOST_PARAMS);
        }
        $user_model = \User::findOneByField('user_id', $user_id);
        if(!$user_model){
            Response::error(Language::USER_NOT_EXISTS);
        }
        if($password && $old_password){ # 更新密码
            if($old_password != $user_model->password){
                Response::error(Language::PASSWORD_ERROR);
            }
            $user_model->update(array('password'=>Password::encrypt($password, $user_model->salt)));
            Response::success();
        }
        $user_profile = array(
            'user_name'=>$user_name,
            'country'=>$country,
            'state'=>$state,
            'city'=>$city,
            'zip_code'=>$zip_code,
            'sex'=>$sex,
            'cellphone'=>$cellphone,
            'avatar'=>$avatar
        );
        $this->updateItem($user_model, $user_profile);
        Response::success();
    }
}