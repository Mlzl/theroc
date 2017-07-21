<?php
/**
 * User: ambi
 * Date: 2017/6/26
 */

namespace Roc\Library;


class Password{
    public static function geneSalt($length=6){
        $get_one = function (){
            $a = mt_rand(1,10);
            $is_word = $a%2==0;
            if($is_word){
                return chr(mt_rand(97,123));
            }else{
                return mt_rand(0,9);
            }
        };
        $salt = '';
        for($i=0; $i<$length; $i++){
            $salt .= $get_one();
        }
        return $salt;
    }

    public static function encrypt($password, $salt){
        return md5($password.$salt);
    }

    public static function getMD5Uid($uid){
        $secret = 'sdf347o8h3ul2fea2kn';
        return md5($secret.$uid.$secret);
    }

}
