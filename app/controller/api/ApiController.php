<?php
/**
 * User: ambi
 * Date: 2017/7/3
 */

namespace Roc\ApiController;


use Phalcon\Mvc\Controller;
use Roc\Library\LoginStatus;
use Roc\Library\Response;

class ApiController extends Controller {

    public function onConstruct(){
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