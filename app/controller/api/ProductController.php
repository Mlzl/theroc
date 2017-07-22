<?php
/**
 * User: ambi
 * Date: 2017/7/8
 */

namespace Roc\ApiController;


use Phalcon\Cache\Frontend\Data;
use Roc\Library\Language;
use Roc\Library\Response;

class ProductController extends ApiController {
    public function getProductsAction(){
        $size = $this->request->get('size', null, 20);
        $page = $this->request->get('page', null, 1);
        $class_id = $this->request->get('class_id');
        if(!$class_id){
            Response::error(Language::LOST_CLASS_ID);
        }
        $product_model = new \Product();
        $products_info = $product_model->getProductByClassId($class_id, $page, $size);
        Response::success($products_info);
    }

    public function getAttributeAction(){
        $product_id = $this->request->get('product_id');
        $attribute_id = $this->request->get('attribute_id');
        if(!$product_id || !$attribute_id){
            Response::error(Language::LOST_PARAMS);
        }
        $attribute_info = \ProductAttribute::getOneById($attribute_id, $product_id);
        if(!$attribute_info){
            Response::error(Language::DATA_NOT_EXISTS);
        }
        Response::success($attribute_info->toArray());
    }

    public function getClassAction(){
        $pid = $this->request->get('pid');
        $class_info = \ProductClass::findClassByPid($pid);
        Response::success($class_info);
    }

    public function getCommentsAction(){
        $product_id = $this->request->get('product_id');
        $size = $this->request->get('size', null, 10);
        $page = $this->request->get('page', null, 1);
        $comments_info = \ProductComment::getCommentByProductId($product_id, $page, $size);
        Response::success($comments_info);
    }

    public function addCommentsAction(){
        $content = $this->request->get('content');

    }
}