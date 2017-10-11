<?php
namespace Roc\BackendController;
use \Phalcon\Mvc\Controller;
use Roc\Library\Language;
use Roc\Library\Response;
use Roc\Library\LoginStatus;

/**
 * User: ambi
 * Date: 2017/6/21
 */
class BackendController extends Controller{
    public function onConstruct(){
        $this->view->setViewsDir(APP_PATH.'view/cms');
        $loginLib = new LoginStatus($this->di);
        if(!$loginLib->isAdminLogin()){
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


}