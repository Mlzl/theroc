<?php

/**
 * User: ambi
 * Date: 2017/8/29
 */
class Refund extends Model{
    public function getSource(){
        return "theroc_refund";
    }

    public function addRefund($refund_data){
        $data = array(
            'product_detail'=>$refund_data['product_detail'],
            'order_detail'=>$refund_data['order_detail'],
            'create_time'=>time(),
            'images'=>$refund_data['images'],
            'user_id'=>$refund_data['user_id']
        );
        return $this->save($data);
    }

    public static function refundList($page, $size){
        $refunds = self::find(array(
            'limit'=>array('number'=>$size, 'offset'=>($page-1)*$size),
        ));
        if(!$refunds){
            return false;
        }
        return $refunds->toArray();
    }
}