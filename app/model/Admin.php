<?php

/**
 * User: ambi
 * Date: 2017/10/11
 */
class Admin extends \Phalcon\Mvc\Model{
    public function getSource(){
        return 'theroc_admin';
    }

    public static function getAdminByUserId($userId){
        return self::findFirst(
            array('conditions'=>'user_id=:user_id:',
                'bind'=>array('user_id'=>$userId)
            ));
    }
}