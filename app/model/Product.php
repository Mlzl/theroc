<?php

/**
 * User: ambi
 * Date: 2017/6/26
 */
class Product extends Model{
    public $primary_key = 'product_id';
    public function getSource(){
        return 'theroc_product';
    }

    public function addProduct($product_info){
        $item = array(
            'name'=>$product_info['name'],
            'class_id'=>$product_info['class_id'],
            'create_time'=>time(),
            'status'=>1,
        );
        return $this->save($item);
    }

    public function getProductByClassId($class_id, $page=0, $size=20){
        $products = self::find(array(
            'conditions'=>'class_id=:class_id:',
            'bind'=>array('class_id'=>$class_id),
            'limit'=>array('number'=>$page, 'offset'=>$page*$size),
        ));
        if(!$products){
            return false;
        }
        return $products->toArray();
    }

    public function getProductById($product_id){
        $product = self::findFirst(array(
            'conditions'=>'product_id=:product_id:',
            'bind'=>array('product_id'=>$product_id)
        ));
        if($product){
            return $product;
        }
        return false;
    }
}