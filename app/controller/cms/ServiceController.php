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
        $data = array(
            'list'=>$refunds,
            'total'=>\Refund::count()
        );
        Response::success($data);
    }

}