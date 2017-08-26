<?php
/**
 * User: ambi
 * Date: 2017/2/13
 */

namespace Roc\Library;


class Common{
    public static function goLogin(){
        header("Location: /login");
        exit();
    }

    public static function goHome(){
        header("Location: /");
        exit();
    }
}