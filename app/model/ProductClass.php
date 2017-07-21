<?php

/**
 * User: ambi
 * Date: 2017/6/26
 * 产品类别
 */
class ProductClass extends Model{
    public function getSource(){
        return 'theroc_product_class';
    }

    public function addProductClass($product_class){
        $item = array(
            'pid'=>$product_class['pid'],
            'name'=>$product_class['name'],
        );
        return $this->save($item);
    }

    public static function findClassByPid($pid=0){
        $classes = self::find(array(
            'conditions'=>'pid=:pid:',
            'bind'=>array('pid'=>$pid)
        ));
        if(!$classes){
            return false;
        }
        return $classes->toArray();
    }
}
