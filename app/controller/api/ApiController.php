<?php
/**
 * User: ambi
 * Date: 2017/7/3
 */

namespace Roc\ApiController;


use Phalcon\Mvc\Controller;

class ApiController extends Controller {

    public function testAction(){
        echo 'api';
        exit;
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
        return $model->update();
    }

}