<?php
/**
 * User: ambi
 * Date: 2017/7/8
 */

namespace Roc\BackendController;


use Roc\Library\Language;
use Roc\Library\Response;

class ProductController extends BackendController {
    public function api_add_productAction(){
        $productModel = new \Product();
        $name = $this->request->getPost('name');
        $class_id = $this->request->getPost('class_id');
        $target_url = $this->request->getPost('target_url');
        $product_label = $this->request->getPost('product_label');
        $product_img_txt_detail = $this->request->getPost('img_txt_detail');
        $picture_url = $this->request->getPost('picture_url');
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
            'label'=>strval($product_label),
            'img_txt_detail'=>strval($product_img_txt_detail),
            'picture_url'=>strval($picture_url)
        );
        $productModel->addProduct($data);
        Response::success();
    }

    public function api_update_productAction(){
        $name = $this->request->getPost('name');
        $class_id = $this->request->getPost('class_id');
        $target_url = $this->request->getPost('target_url');
        $product_id = $this->request->getPost('product_id');
        $product_label = $this->request->getPost('product_label');
        $product_img_txt_detail = $this->request->getPost('img_txt_detail');
        $picture_url = $this->request->getPost('picture_url');

        if(!$product_id){
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
            'label'=>$product_label,
            'img_txt_detail'=>$product_img_txt_detail,
            'picture_url'=>$picture_url
        );
        $this->updateItem($product_model, $data);
        Response::success();
    }

    public function update_product_statusAction(){
        $status = $this->request->get('update_status');
        $product_id = $this->request->get('product_id');
        if(!is_numeric($status) || !in_array($status, \Product::PRODUCT_STATUS) || !$product_id){
            Response::error(Language::PARAM_ERROR);
        }
        $productModel = \Product::getProductById($product_id);
        if(!$productModel){
            Response::error(Language::PRODUCT_NOT_EXISTS);
        }
        $this->updateItem($productModel, array('status'=>$status));
    }

    public function api_add_classAction(){
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

    public function api_update_classAction(){
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

    public function api_delete_classAction(){
        $class_id = intval($this->request->getPost('class_id'));
        if(!$class_id){
            Response::error(Language::LOST_CLASS_ID);
        }
        \ProductClass::deleteOneByField($class_id);//删除类
        \ProductClass::deleteOneByField($class_id, 'pid');//删除子类
        Response::success();
    }

    public function api_delete_commentsAction(){
        $comment_id = intval($this->request->get('comment_id'));
        if(!$comment_id){
            Response::error(Language::PARAM_ERROR);
        }
        \ProductComment::deleteOneByField('id', $comment_id);
        Response::success();
    }
}