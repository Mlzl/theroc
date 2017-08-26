<?php
/**
 * User: ambi
 * Date: 2017/7/3
 */

namespace Roc\ApiController;


use Phalcon\Mvc\Controller;
use Roc\Library\Language;
use Roc\Library\LoginStatus;
use Roc\Library\Response;

class ApiController extends Controller {

    public function onConstruct(){
        $loginLib = new LoginStatus($this->di);
        if(!$loginLib->isLogin()){
            Response::error(Language::NO_LOGIN_STATUS);
        }
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
}