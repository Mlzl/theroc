<?php

/**
 * User: ambi
 * Date: 2017/6/26
 */
class ProductAttribute extends Model{
    public function getSource(){
        return 'theroc_product_attribute';
    }

    public function addProductAttribute($attribute){
        $item = array(
            'product_id'=>$attribute['product_id'],
            'name'=>$attribute['name'],
            'price'=>$attribute['price'],
            ''
        );
        $this->save($item);
    }

    public function getAttributeByProductId($product_id){
        $attributes = self::find(array(
            'conditions'=>'product_id=:product_id:',
            'binds'=>array('product_id'=>$product_id)
        ));
        if(!$attributes){
            return false;
        }
        return $attributes->toArray();
    }
}