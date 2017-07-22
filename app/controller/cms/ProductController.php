<?php
/**
 * User: ambi
 * Date: 2017/7/8
 */

namespace Roc\BackendController;


use Roc\Library\Language;
use Roc\Library\Response;

class ProductController extends BackendController {
    public function addProductAction(){
        $productModel = new \Product();
        $name = $this->request->getPost('name');
        $class_id = $this->request->getPost('class_id');
        $target_url = $this->request->getPost('target_url');
        $product_label = $this->request->getPost('product_label');
        if(!$name || !$class_id || !$target_url){
            Response::error(Language::LOST_PARAMS);
        }
        if(!\ProductClass::findOneByField('id', $class_id)){
            Response::error(Language::PRODUCT_CLASS_NOT_EXISTS);
        }
        $data = array(
            'name'=>$name,
            'class_id'=>$class_id,
            'target_url'=>$target_url,
            'label'=>$product_label
        );
        $productModel->addProduct($data);
        Response::success();
    }

    public function updateProductAction(){
        $name = $this->request->getPost('name');
        $class_id = $this->request->getPost('class_id');
        $target_url = $this->request->getPost('target_url');
        $product_id = $this->request->getPost('product_id');
        $product_label = $this->request->getPost('product_label');
        if(!$name || !$class_id || !$target_url){
            Response::error(Language::LOST_PARAMS);
        }
        if(!\ProductClass::findOneByField('id', $class_id)){
            Response::error(Language::PRODUCT_CLASS_NOT_EXISTS);
        }
        if(!$product_model = \Product::getProductById($product_id)){
            Response::error(Language::PRODUCT_NOT_EXISTS);
        }
        $data = array(
            'name'=>$name,
            'class_id'=>$class_id,
            'target_url'=>$target_url,
            'label'=>$product_label
        );
        $this->updateItem($product_model, $data);
        Response::success();
    }

    public function addClassAction(){
        $class_name = $this->request->getPost('name');
        $pid = intval($this->request->getPost('pid'));
        if(!$class_name){
            Response::error(Language::LOST_PARAMS);
        }
        if($pid && !\ProductClass::findOneByField('id', $pid)){
            Response::error(Language::PARENT_CLASS_NOT_EXISTS);
        }
        $product_class = new \ProductClass();
        $data = array(
            'pid'=>$pid,
            'name'=>$class_name
        );
        $product_class->addProductClass($data);
        Response::success();
    }

    public function updateClassAction(){
        $class_name = $this->request->getPost('name');
        $class_id = intval($this->request->getPost('class_id'));
        if(!$class_name || !$class_id){
            Response::error(Language::LOST_PARAMS);
        }
        $product_class = \ProductClass::findOneByField('id', $class_id);
        if(!$product_class){
            Response::error(Language::DATA_NOT_EXISTS);
        }
        $data = array(
            'name'=>$class_name
        );
        $this->updateItem($product_class, $data);
        Response::success();
    }
}