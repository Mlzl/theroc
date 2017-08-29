<?php

/**
 * User: ambi
 * Date: 2017/6/26
 */
class Product extends Model{
    public $primary_key = 'product_id';

    const PRODUCT_STATUS = array(0,1);//0删除 1上架
    public function getSource(){
        return 'theroc_product';
    }

    public function addProduct($product_info){
        $item = array(
            'name'=>$product_info['name'],
            'class_id'=>$product_info['class_id'],
            'create_time'=>time(),
            'status'=>1,
            'target_url'=>$product_info['target_url'],
            'label'=>$product_info['label'],
            'img_txt_detail'=>$product_info['img_txt_detail'],
            'picture_url'=>$product_info['picture_url']
        );
        return $this->save($item);
    }

    public function getProductByClassId($class_id, $page=1, $size=20){
        $products = self::find(array(
            'conditions'=>'class_id=:class_id: and status=1',
            'bind'=>array('class_id'=>$class_id),
            'limit'=>array('number'=>$size, 'offset'=>($page-1)*$size),
        ));
        if(!$products){
            return false;
        }
        return $products->toArray();
    }

    public function getProduct($page=1, $size=20){
        $products = self::find(array(
            'conditions'=>'status=1',
            'limit'=>array('number'=>$size, 'offset'=>($page-1)*$size),
        ));
        if(!$products){
            return false;
        }
        return $products->toArray();
    }

    public static function getProductById($product_id){
        $product = self::findFirst(array(
            'conditions'=>'product_id=:product_id: and status=1',
            'bind'=>array('product_id'=>$product_id)
        ));
        if($product){
            return $product;
        }
        return false;
    }

    public static function search($keyword, $page, $size){
        $products = self::find(array(
            'conditions'=>"name like :keyword: and status=1",
            "bind"=>array('keyword'=>"%$keyword%"),
            'limit'=>array('number'=>$size, 'offset'=>($page-1)*$size),
        ));
        if(!$products){
            return false;
        }
        return $products->toArray();
    }
}