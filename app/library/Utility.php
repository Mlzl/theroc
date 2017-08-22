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
            return$token;
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
}