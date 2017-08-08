<?php
/**
 * User: ambi
 * Date: 2017/7/3
 */

namespace Roc\Library;


class Library
{
    protected $error_msg = '';

    public function getErrorMsg(){
        return $this->error_msg;
    }

    public static function array2js($data){
        $json = '';
        foreach ($data as $value) {
            $json .= json_encode($value) . ',';
        }
        return '[' . substr($json,0,strlen($json) - 1) . ']';
    }
}