<?php
/**
 * User: ambi
 * Date: 2017/8/29
 */

namespace Roc\ApiController;



use Roc\Library\Language;
use Roc\Library\Response;

class ServiceController extends ApiController{
    public function addRefundAction(){
        $order_detail = $this->request->getPost("order_detail");
        $product_detail = $this->request->getPost('product_detail');
        $images = $this->request->getPost('images');
        $username = $this->request->getPost('username');
        $email = $this->request->getPost('email');
        if(!$order_detail || !$product_detail || !$username || !$email){
            Response::error(Language::PARAM_ERROR);
        }
        if(mb_strlen($username)>50){
            Response::error(Language::USER_NAME_TOO_LONG);
        }
        if(mb_strlen($email)>50){
            Response::error(Language::EMAIL_TOO_LONG);
        }

        $data = array(
            'order_detail'=>$order_detail,
            'product_detail'=>$product_detail,
            'images'=>$images,
            'username'=>$username,
            'email'=>$email
        );
        $refundModel = new \Refund();
        if($refundModel->addRefund($data)){
            Response::success();
        }
        Response::error($refundModel->getMessage());
    }

    public function searchProductAction(){
        $keyword = $this->request->get('keyword');
        $page = intval($this->request->get('page'));
        $size = intval($this->request->get('size'));
        if(!$page) $page =1;
        if(!$size) $size = 10;
        $product_list = \Product::search($keyword, $page, $size);

        foreach ($product_list as &$product){
            $attributes = \ProductAttribute::getAttributeByProductId($product['product_id']);
            if(!$attributes){
                $attributes = array();
            }
            $product['attr'] = $attributes;
        }
        $data = array(
            'list'=>$product_list,
            'total'=>\Product::count(
                array('conditions'=>'name like :keyword: and status=1', 'bind'=>array('keyword'=>"%$keyword%")
                ))
        );
        Response::success($data);
    }
}