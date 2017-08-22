<?php
namespace Roc\BackendController;
use \Phalcon\Mvc\Controller;
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
        $loginLib->registerUserToDi(10000000,'1069163403@qq.com', 'mlzl', 1);
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