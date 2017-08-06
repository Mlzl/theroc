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

    public function getAllClassAction(){
        $class_info = \ProductClass::getAllClass();
        $classes = array();
        foreach ($class_info as $item){
            if($item['pid'] == 0){
                $classes[$item['id']] = $item;
            }else{
                $classes[$item['pid']]['child'][] = $item;
            }
        }
        Response::success($classes);
    }

    public function getCommentsAction(){
        $product_id = $this->request->get('product_id');
        $size = $this->request->get('size', null, 10);
        $page = $this->request->get('page', null, 1);
        $comments_info = \ProductComment::getCommentByProductId($product_id, $page, $size);
        Response::success($comments_info);
    }

    public function addCommentAction(){
        $content = $this->request->get('content');
        $product_id = $this->request->get('product_id');
        $user_id = $this->user->user_id;
        $product_comment = new \ProductComment();
        if(!$content || !$product_id || !$user_id){
            Response::error(Language::LOST_PARAMS);
        }
        if(!\Product::getProductById($product_id)){
            Response::error(Language::PRODUCT_NOT_EXISTS);
        }
        $data = array(
            'content'=>$content,
            'product_id'=>$product_id,
            'create_time'=>time(),
            'user_id'=>$user_id
        );
        $product_comment->save($data);
        Response::success($product_comment->toArray());
    }

    public function getBannerAction(){
        $banner_info = \Setting::getSetting(\Setting::BANNER_NAME);
        if(!$banner_info){
            $banner_info = array();
        }
        Response::success($banner_info);
    }

    public function getSpecialProductAction(){
        $special_label = $this->request->get('special_label');
        $special_setting = \Setting::getOneSetting($special_label);
        $special_product = array();
        if($special_setting){
            $special_setting = unserialize($special_setting->value);
            foreach ($special_setting as $product_id){
                $product = \Product::getProductById($product_id);
                if($product){
                    $special_product[] = $product->toArray();
                }
            }
        }
        Response::success($special_product);
    }
}