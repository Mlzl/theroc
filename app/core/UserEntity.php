<?php
/**
 * User: ambi
 * Date: 2017/7/22
 */

namespace Roc\Core;


class UserEntity
{
    public $user_id = null;
    public $email = null;
    public $is_admin = false;
    public $user_name = false;
    public function __construct($user_id, $email, $user_name, $is_admin=false){
        $this->user_id = $user_id;
        $this->email = $email;
        $this->is_admin = false;
        $this->user_name = $user_name;
    }
}