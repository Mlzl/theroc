<?php
/**
 * User: ambi
 * Date: 2017/7/15
 */

namespace Roc\Library;


class Utility{
    private $di = '';
    public function __construct($di){
        $this->di = $di;
    }

    private $token_md5_prefix = 'oh1lk2nf728p3f';
    public function geneRegisterToken($email){
        if(!$email){
            return false;
        }
        $token = md5($this->token_md5_prefix . $email) . md5($this->token_md5_prefix . time()) . md5(md5(time()));
        if($this->di->get('redis')->set(RedisKey::REGISTER_TOKEN_KEY.$email, $token, TimeStep::ONE_DAY)){
            return $token;
        }
        return false;
    }

    public function checkRegisterToken($token, $email){
        if(!$token || !$email){
            return false;
        }
        $_token = $this->di->get('redis')->get(RedisKey::REGISTER_TOKEN_KEY.$email);
        if($_token != $token){
            return false;
        }
        $this->di->get('redis')->del(RedisKey::REGISTER_TOKEN_KEY.$email);
        return true;
    }

    public function getForgetPwdCaptcha($email){
        $captcha = md5(time().$email.mt_rand(1,1000));
        $captcha = substr($captcha, 10, 2) . substr($captcha, 10 ,1) . mt_rand(1,9) . substr($captcha, 20, 2);
        if($this->di->get('redis')->set(RedisKey::FORGET_PWD_CAPTCHA.$email, $captcha, TimeStep::FIVE_MINUTE)){
            return $captcha;
        }
        return false;
    }

    public function checkForgetPwdCaptcha($email, $captcha){
        $_captcha = $this->di->get('redis')->get(RedisKey::FORGET_PWD_CAPTCHA.$email);
        if(!$_captcha){
            return false;
        }
        if($_captcha != $captcha){
            return false;
        }
        $this->di->get('redis')->del(RedisKey::FORGET_PWD_CAPTCHA.$email);
        return true;
    }
}