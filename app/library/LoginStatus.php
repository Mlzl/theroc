<?php
/**
 * User: ambi
 * Date: 2017/7/4
 */

namespace Roc\Library;


use Roc\Core\UserEntity;

class LoginStatus{

    private $di;
    public function __construct(&$di){
        $this->di = $di;
    }

    private $roc_cookie_key = 'roc_key';//登陆凭证
    private $uid_mk5_cookie_key = 'roc_u';//md5的uid

    public function logout(){
        if(empty($_COOKIE[$this->roc_cookie_key]) || empty($_COOKIE[$this->uid_mk5_cookie_key])){
            return false;
        }
        $roc_key = $_COOKIE[$this->roc_cookie_key];
        setcookie($this->roc_cookie_key, '', time(), '/');
        setcookie($this->uid_mk5_cookie_key, '', time(), '/');
        $this->di->get('redis')->del(RedisKey::USER_LOGIN_KEY.$roc_key);
        $this->di->setShared('user',null);
        return true;
    }

    public function setLoginStatus($uid, $user_info, $is_admin=false){
        if(!$uid || !$user_info){
            return false;
        }
        $user_info['is_admin'] = $is_admin;
        $roc_key = md5(time().$uid.time().mt_rand(1,100000));
        setcookie($this->roc_cookie_key, $roc_key, time() + TimeStep::SEVEN_DAYS, '/');
        $roc_u = Password::getMD5Uid($uid);
        setcookie($this->uid_mk5_cookie_key, $roc_u, time() + TimeStep::SEVEN_DAYS, '/');
        $this->di->get('redis')->set(RedisKey::USER_LOGIN_KEY.$roc_key, json_encode($user_info), TimeStep::SEVEN_DAYS);
        $this->registerUserToDi($user_info['user_id'], $user_info['email'], $user_info['user_name'],false);
        return true;
    }

    public function isLogin(){
        if(empty($_COOKIE[$this->roc_cookie_key]) || empty($_COOKIE[$this->uid_mk5_cookie_key])){
            return false;
        }
        $roc_key = $_COOKIE[$this->roc_cookie_key];
        $roc_u = $_COOKIE[$this->uid_mk5_cookie_key];
        $user_info = $this->di->get('redis')->get(RedisKey::USER_LOGIN_KEY.$roc_key);
        if(!$user_info){
            return false;
        }
        $user_info = json_decode($user_info, true);
        if(empty($user_info['user_id']) || $roc_u != Password::getMD5Uid($user_info['user_id'])){
            return false;
        }
        $this->registerUserToDi($user_info['user_id'], $user_info['email'], $user_info['user_name'], false);

        return $user_info;
    }

    public function isAdminLogin(){
        $user_info = $this->isLogin();
        if(!$user_info){
            return false;
        }
        if(empty($user_info['is_admin'])){
            return false;
        }
        $this->registerUserToDi($user_info['user_id'], $user_info['email'], $user_info['user_name'],true);
        return $user_info;
    }

    public function registerUserToDi($user_id, $email, $user_name, $is_admin){
        $user_entity = new UserEntity($user_id, $email, $user_name, $is_admin);
        $this->di->setShared('user',$user_entity);
        return true;
    }
}