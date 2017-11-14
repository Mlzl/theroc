<?php
/**
 * User: ambi
 * Date: 2017/7/3
 */

namespace Roc\ApiController;


use Phalcon\Mvc\Controller;
use Roc\Library\Language;
use Roc\Library\LoginStatus;
use Roc\Library\Password;
use Roc\Library\Response;

class ApiController extends Controller {

    public function onConstruct(){
        $loginLib = new LoginStatus($this->di);
        $loginLib->isLogin();
//        if(!$loginLib->isLogin()){
//            Response::error(Language::NO_LOGIN_STATUS);
//        }
    }

    public function updateItem(&$model, $data=array()){
        if(!$data){
            return true;
        }
        foreach ($data as $key=>$value){
            if($value === null){
                continue;
            }
            $model->$key = $value;
        }
        $res = $model->update();
        if(!$res){
            Response::error($model->getMessage());
        }
        return true;
    }

    public function getUserInfoAction(){
        $user_id = $this->user->user_id;
        $user_info = \User::findOneByField("user_id", $user_id);
        if(!$user_info){
            $user_info = array();
        }
        else{
            $user_info = $user_info->toArray();
        }
        Response::success((array)$user_info);
    }


    public function update_profileAction(){
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
        $user_id = $this->user->user_id;
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