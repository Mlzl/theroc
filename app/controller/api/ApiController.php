<?php
/**
 * User: ambi
 * Date: 2017/7/3
 */

namespace Roc\ApiController;


use Phalcon\Mvc\Controller;
use Roc\Library\Response;

class ApiController extends Controller {


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