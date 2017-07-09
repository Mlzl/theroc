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
}