<?php
use \Roc\Library\Password;
/**
 * User: ambi
 * Date: 2017/6/26
 */
class User extends Model{
    public function getSource(){
        return 'theroc_user';
    }

    public function addUser($user=array()){
        $data = array(
            'user_name'=>$user['user_name'],
            'email'=>$user['email'],
            'reg_date'=>time(),
            'status'=>0,
            'salt'=>Password::geneSalt(),
        );
        $data['password'] = Password::encrypt($user['password'], $data['salt']);
        return $this->save($data);
    }



}