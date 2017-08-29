<?php
/**
 * User: ambi
 * Date: 2017/8/29
 */

namespace Roc\BackendController;


use Roc\Library\Response;

class ServiceController extends BackendController{

    public function getRefundListAction(){
        $page = intval($this->request->get('page'));
        $size = intval($this->request->get('size'));
        if(!$page){
            $page = 1;
        }
        if(!$size){
            $size = 10;
        }
        $refunds = \Refund::refundList($page, $size);
        foreach ($refunds as &$refund){
            $refund_user = \User::findOneByField("user_id", $refund['user_id']);
            $user_name = '';
            $email = '';
            if($refund_user){
                $user_name = $refund_user->user_name;
                $email = $refund_user->email;
            }
            $refund['user_name'] = $user_name;
            $refund['email'] =  $email;
        }
        $data = array(
            'list'=>$refunds,
            'total'=>\Refund::count()
        );
        Response::success($data);
    }

}