<?php

/**
 * User: ambi
 * Date: 2017/6/26
 */
class ProductPicture extends Model{
    public function getSource(){
        return 'theroc_product_picture';
    }

    public function addPicture(){

    }
    public function getPictureByProductId($product_id){
        $pictures = self::find(array(
            'conditions'=>'product_id=:product_id:',
            'bind'=>array('product_id'=>$product_id),
        ));
        if(!$pictures){
            return false;
        }
        return $pictures->toArray();
    }
}