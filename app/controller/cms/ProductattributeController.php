<?php
/**
 * User: ambi
 * Date: 2017/7/8
 */

namespace Roc\BackendController;


use Roc\BackendController\BackendController;
use Roc\Library\InputCheck;
use Roc\Library\Language;
use Roc\Library\Response;

class ProductattributeController extends BackendController  {
    public function addAction(){
        $productAttribute = new \ProductAttribute();
        $name = $this->request->getPost('name');
        $product_id = $this->request->getPost('product_id');
        $price = $this->request->getPost('price');
        if(!$name || !$product_id){
            Response::error(Language::LOST_PARAMS);
        }
        if(!InputCheck::isValidMoney($price)){
            Response::error(Language::MONEY_FORMAT_ERROR);
        }
        $data = array(
            'product_id'=>$product_id,
            'name'=>$name,
            'price'=>$price,
        );
        $productAttribute->addProductAttribute($data);
        Response::success(true);
    }

    public function updateAction(){
        $name = $this->request->getPost('name', null, null);
        $attribute_id = $this->request->get('attribute_id');
        $price = $this->request->getPost('price', null, null);
        $product_id = $this->request->getPost('product_id', null, null);
        if($price!==null){
            if(!InputCheck::isValidMoney($price)){
                Response::error(Language::MONEY_FORMAT_ERROR);
            }
        }
        $productAttribute = \ProductAttribute::getOneById($attribute_id);
        if(!$productAttribute){
            Response::error(Language::ITEM_NOT_EXISTS);
        }
        $data = array(
            'product_id'=>$product_id,
            'name'=>$name,
            'price'=>$price,
        );
        if($this->updateItem($productAttribute, $data)){
            Response::success(true);
        }
        $this->logger->error("[$attribute_id]update attribute error.".$productAttribute->getMessage());
        Response::error(Language::FAILED_OPERATION);
    }

    public function deleteAction(){
        $attribute_id = $this->request->get('attribute_id');
        $productAttribute = \ProductAttribute::getOneById($attribute_id);
        if(!$productAttribute){
            Response::error(Language::ITEM_NOT_EXISTS);
        }
        $productAttribute->delete();
        Response::success(true);
    }
}