<?php
use \Roc\Library\Password;
/**
 * User: ambi
 * Date: 2017/6/26
 */
class User extends Model{
    const UN_ACTIVE = 0;
    const NORMAL = 1;
    const BANNED = 2;
    public function getSource(){
        return 'theroc_user';
    }

    public function addUser($user=array()){
        $data = array(
            'user_name'=>$user['user_name'],
            'email'=>$user['email'],
            'reg_date'=>time(),
            'status'=>self::UN_ACTIVE,
            'salt'=>Password::geneSalt(),
        );
        $data['password'] = Password::encrypt($user['password'], $data['salt']);
        return $this->save($data);
    }

    public function login($email, $password){
        $user = self::findFirst(array(
           'conditions'=>'email=:email:',
            'bind'=>array('email'=>$email)
        ));
        if(!$user){
            $this->error_message = \Roc\Library\Language::USER_NOT_EXISTS;
            return false;
        }
        $user = $user->toArray();
        $input_password = Password::encrypt($password, $user['salt']);
        if($user['status'] == self::UN_ACTIVE){
            $this->error_message = '账号尚未激活，请到邮箱激活/联系客服';
            return false;
        }
        if($user['status'] == self::BANNED){
            $this->error_message = '账号被禁止，请联系客服';
            return false;
        }
        if($input_password != $user['password']){
            $this->error_message = '用户名或密码错误';
            return false;
        }
        return $user;
    }

    public static function findUserByEmail($email){
        $user = self::findFirst(array(
           'conditions'=>'email=:email:',
            'bind'=>array('email'=>$email),
        ));
        if(!$user){
            return false;
        }
        return $user;
    }

    public static function getList($page, $size){
        $users = self::find(array(
            'limit'=>array('number'=>$size, 'offset'=>($page-1)*$size),
        ));
        if(!$users){
            return false;
        }
        return $users->toArray();
    }
}