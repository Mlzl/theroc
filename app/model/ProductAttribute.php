<?php

/**
 * User: ambi
 * Date: 2017/6/26
 * 产品属性
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
        );
        return $this->save($item);
    }

    public static function getAttributeByProductId($product_id){
        $attributes = self::find(array(
            'conditions'=>'product_id=:product_id:',
            'bind'=>array('product_id'=>$product_id)
        ));
        if(!$attributes){
            return false;
        }
        return $attributes->toArray();
    }


    public static function getOneById($attribute_id, $product_id){
        $attribute = self::findFirst(array(
            'conditions'=>'id=:id: and product_id=:product_id:',
            'bind'=>array('id'=>$attribute_id, 'product_id'=>$product_id)
        ));
        return $attribute;
    }
}