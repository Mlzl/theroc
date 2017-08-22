<?php
namespace Roc\FrontendController;
use \Phalcon\Mvc\Controller;
use Roc\Library\LoginStatus;
use Roc\Library\Response;

/**
 * User: ambi
 * Date: 2017/6/21
 */
class FrontendController extends Controller{

    public function onConstruct(){
        $this->view->setViewsDir(APP_PATH.'view/frontend');
        $loginLib = new LoginStatus($this->di);
        $loginLib->registerUserToDi(10000000,'1069163403@qq.com', 'mlzl', 0);

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