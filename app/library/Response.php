<?php
/**
 * User: ambi
 * Date: 2017/7/3
 */

namespace Roc\Library;


class Response{
    public static function success($data){
        echo json_encode(array('code'=>0, 'msg'=>'success', 'data'=>$data));
        exit();
    }

    public static function error($message, $code = '400001'){
        $data = array(
            'code'=>$code,
            'msg'=>Language::getMessage($message)
        );
        echo json_encode($data);
        exit();
    }
}