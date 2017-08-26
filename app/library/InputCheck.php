<?php
/**
 * User: ambi
 * Date: 2017/7/3
 */

namespace Roc\Library;

class InputCheck extends Library {

    public function isValidUserName($username){
        if(strlen($username)>30){
            $this->error_msg = 'user name too long';
            return false;
        }
        return true;
    }

    public static function isValidMoney($money, $precision=2){
        if(intval($money) == $money){
            return true;
        }
        $pattern = "/^\d{1,}\.\d{1,$precision}$/";
        preg_match($pattern, $money, $match);

        if(preg_match($pattern, $money)){
            return true;
        }
        return false;
    }

    public static function isValidEmail($email){
        if(!$email){
            return false;
        }
        $pattern = "/^[a-zA-Z0-9_-]{1,}@[a-zA-Z0-9]{1,}\.[a-z]{1,}$/";
        if(preg_match($pattern, $email)){
            return true;
        }
        return false;
    }
}
