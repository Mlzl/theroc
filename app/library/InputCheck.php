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

}