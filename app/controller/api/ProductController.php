<?php
/**
 * User: ambi
 * Date: 2017/7/8
 */

namespace Roc\ApiController;


use Phalcon\Cache\Frontend\Data;
use Roc\Library\Language;
use Roc\Library\Library;
use Roc\Library\Response;

class ProductController extends ApiController {

    public function getProductDetailAction(){
        $product_id = intval($this->request->get('product_id'));
        if(!$product_id){
            Response::error(Language::PARAM_ERROR);
        }
        $product_info = \Product::getProductById($product_id);
        if(!$product_info){
            Response::error(Language::PRODUCT_NOT_EXISTS);
        }
        $product_info = $product_info->toArray();
        $product_info['attr'] = \ProductAttribute::getAttributeByProductId($product_id);
        Response::success($product_info);
    }

    public function getProductsAction(){
        $size = $this->request->get('size', null, 20);
        $page = $this->request->get('page', null, 1);
        $class_id = $this->request->get('class_id');
        $product_model = new \Product();

        if($class_id == 0){
            $products_info = $product_model->getProduct($page, $size);
            $total = \Product::count(array('status=1'));
        }else{
            $products_info = $product_model->getProductByClassId($class_id, $page, $size);
            $total = \Product::count(
                array('conditions'=>'class_id=:class_id: and status=1', 'bind'=>array('class_id'=>$class_id)
                ));
        }
        foreach ($products_info as &$product){
            $attributes = \ProductAttribute::getAttributeByProductId($product['product_id']);
            if(!$attributes){
                $attributes = array();
            }
            $product['attr'] = $attributes;
        }
        $data = array(
            'list'=>$products_info,
            'total'=>$total
        );
        Response::success($data);
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
                if(isset($classes[$item['pid']])){
                    $classes[$item['pid']]['child'][] = $item;
                }
            }
        }
        $classes =(array_values($classes));
        Response::success($classes);
    }

    public function getCommentsAction(){
        $product_id = intval($this->request->get('product_id'));
        $size = $this->request->get('size', null, 10);
        $page = $this->request->get('page', null, 1);
        if(!$product_id){
            Response::error(Language::PARAM_ERROR);
        }
        $comments_info = \ProductComment::getCommentByProductId($product_id, $page, $size);
        foreach ($comments_info as &$comments){
            $user_info = \User::findOneByField('user_id', $comments['user_id']);
            $comments['user_name'] = $user_info->user_name;
        }
        $data = array(
            'list'=>$comments_info,
            'total'=>\ProductComment::count(array('conditions'=>'product_id=:product_id:',
                'bind'=>array('product_id'=>$product_id)))
        );
        Response::success($data);
    }

    public function addCommentAction(){
        $content = $this->request->get('content');
        $product_id = $this->request->get('product_id');
        $stat_num = intval($this->request->get('stat_num'));
        $user_id = $this->user->user_id;
        $product_comment = new \ProductComment();
        if(!$content || !$product_id || !$user_id){
            Response::error(Language::LOST_PARAMS);
        }
        if($stat_num<1 || $stat_num>5){
            Response::error(Language::PARAM_ERROR);
        }
        if(!\Product::getProductById($product_id)){
            Response::error(Language::PRODUCT_NOT_EXISTS);
        }
        $data = array(
            'content'=>$content,
            'product_id'=>$product_id,
            'create_time'=>time(),
            'user_id'=>$user_id,
            'stat_num'=>$stat_num
        );
        $product_comment->save($data);
        Response::success($product_comment->toArray());
    }



    public function getBannerAction(){
        $banner_type = $this->request->get('banner_type');

        $banner_info = array();

        if($banner_type == \Setting::PRO_BANNER){
            $banner_info = \Setting::getSetting(\Setting::PRO_BANNER);
        }elseif($banner_type == \Setting::HOME_BANNER){
            $banner_info = \Setting::getSetting(\Setting::HOME_BANNER);
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