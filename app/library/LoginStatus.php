<?php
/**
 * User: ambi
 * Date: 2017/7/4
 */

namespace Roc\Library;


class LoginStatus{

    private $di;
    public function __construct($di){
        $this->di = $di;
    }

    private $roc_cookie_key = 'roc_key';//登陆凭证
    private $uid_mk5_cookie_key = 'roc_u';//md5的uid

    public function setLoginStatus($uid, $user_info){
        if(!$uid || !$user_info){
            return false;
        }
        $roc_key = md5(time().$uid.time());
        setcookie($this->roc_cookie_key, $roc_key, time() + TimeStep::SEVEN_DAYS, '/', Constant::HOST);
        $roc_u = Password::getMD5Uid($uid);
        setcookie($this->uid_mk5_cookie_key, $roc_u, time() + TimeStep::SEVEN_DAYS, '/', Constant::HOST);
        $this->di->get('redis')->set(RedisKey::USER_LOGIN_KEY.$roc_key, json_encode($user_info), TimeStep::SEVEN_DAYS);
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
        if(empty($user_info['uid']) || $roc_u != Password::getMD5Uid($user_info['uid'])){
            return false;
        }
        return $user_info;
    }


}