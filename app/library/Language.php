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