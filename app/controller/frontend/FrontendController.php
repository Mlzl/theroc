<?php
namespace Roc\FrontendController;
use \Phalcon\Mvc\Controller;
use Roc\Library\Common;
use Roc\Library\LoginStatus;
use Roc\Library\Response;

/**
 * User: ambi
 * Date: 2017/6/21
 */
class FrontendController extends Controller{

    public function onConstruct(){
        $loginLib = new LoginStatus($this->di);
        $user_info = $loginLib->isLogin();
        if($user_info == false){
            $user_info ='';
        }
        $this->view->setVar("user_info", $user_info);
        $this->view->setViewsDir(APP_PATH.'view/frontend');
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
}