<?php
/**
 * User: ambi
 * Date: 2017/7/3
 */

namespace Roc\Library;


class Language{

    const CAPTCHA_ERROR     =   'captcha_error';
    const EMAIL_EMPTY       =   'email_empty';
    const PASSWORD_EMPTY    =   'password_empty';
    const USER_NOT_EXISTS   =   'user_not_exists';
    const USER_NAME_EMPTY   =   'user_name_empty';
    const EMAIL_HAD_BE_USED =   'email_had_be_used';
    const REGISTER_ERROR    =   'register_error';
    const LOST_PARAMS    =   'lost params';
    const MONEY_FORMAT_ERROR    =   'money format error';
    const FAILED_OPERATION  =   'failed operation';
    const ITEM_NOT_EXISTS = 'item not exists';
    const LOST_CLASS_ID = 'lost class id';
    const DATA_NOT_EXISTS   =   'data not exists';
    const PRODUCT_CLASS_NOT_EXISTS  =   'product class not exists';
    const PARENT_CLASS_NOT_EXISTS = 'parent class not exists';
    const PRODUCT_NOT_EXISTS  =   'product not exists';
    const PRODUCT_LABEL_NOT_EXISTS = 'product label not exists';
    const PARAM_ERROR   = 'params error';
    const PASSWORD_ERROR = 'password error';
    const EMAIL_FORMAT_INVALID = "email format invalid";
    const NO_LOGIN_STATUS ="you had not login";


    public static function getMessage($message){
        $t = English::getMessage($message);
        return $t ? $t :$message;
    }
}

class English{
    public static function getMessage($message){
        $template = array(
            Language::CAPTCHA_ERROR =>  'captcha error',
            Language::EMAIL_EMPTY   =>  'email empty',
            Language::PASSWORD_EMPTY=>  'password empty',
        );
        if(isset($template[$message])){
            return $template[$message];
        }
        return false;
    }
}