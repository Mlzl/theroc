<?php

/**
 * User: ambi
 * Date: 2017/6/26
 */
class ProductComment extends Model{
    public function getSource(){
        return 'theroc_product_comment';
    }

    public static function getCommentByProductId($product_id, $page=1, $size=20){
        $comments = self::find(array(
            'conditions'=>'product_id=:product_id:',
            'bind'=>array('product_id'=>$product_id),
            'limit'=>array('number'=>$size, 'offset'=>($page-1)*$size)
        ));
        if(!$comments){
            return false;
        }
        return $comments->toArray();
    }
}