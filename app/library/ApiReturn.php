<?php
/**
 * User: ambi
 * Date: 2016/12/3
 */

namespace Roc\Library;


class ApiReturn{
    const SUCCESS = 0;
    const UNKNOWN_ERROR = 1130000;
    const NOT_FOUND = 1130001;
    const REQUIRE_CAPTCHA_ID = 1130002;
    const REQUIRE_CAPTCHA = 1130003;
    const CAPTCHA_ERROR = 1130004;
    const MEMCACHE_CONNECT_ERROR = 1130005;
    const VALIDATE_CAPTCHA_FAILED_TIMES_REACH_MAX_LIMIT = 1130006;
    const NOT_ALLOW_CAPTCHA_TYPE = 1130007;
    const OPERATOR_IS_REQUIRED = 1130008;
    const FAILED_TIMES_LIMIT_INVALID = 1130009;
    const PARAM_LOST = 1130010;
    const TITLE_IS_REQUIRE = 1130011;
    const KEY_IS_REQUIRE = 1130012;
    const QUESTION_IS_REQUIRE = 1130013;
    const APP_NAME_IS_REQUIRE = 1130014;
    const APP_HAS_EXISTS = 1130015;
    const APP_HAS_NOT_EXISTS = 1130016;
    const APP_REQUEST_TOO_FREQUENTLY = 1130017;
    const CAPTCHA_TIMEOUT = 1130018;

    const SYSTEM_ERROR = 1139900;# 1139900 以上为系统异常码
    private static $message = array(
        self::SUCCESS => 'success',
        self::UNKNOWN_ERROR=>'unknown error',
        self::SYSTEM_ERROR => 'system error',
        self::NOT_FOUND =>'path 404',
        self::REQUIRE_CAPTCHA_ID => 'captcha_id is require',
        self::REQUIRE_CAPTCHA => 'captcha is require',
        self::CAPTCHA_ERROR => '验证码错误',
        self::MEMCACHE_CONNECT_ERROR =>'memcache service is unstable',
        self::VALIDATE_CAPTCHA_FAILED_TIMES_REACH_MAX_LIMIT =>'验证码过期，请重新获取。',
        self::NOT_ALLOW_CAPTCHA_TYPE => '无效的验证码',
        self::OPERATOR_IS_REQUIRED => 'operator is require',
        self::FAILED_TIMES_LIMIT_INVALID =>'number is invalid',
        self::PARAM_LOST =>'param lost',
        self::TITLE_IS_REQUIRE =>'title is require',
        self::KEY_IS_REQUIRE =>'key is require',
        self::QUESTION_IS_REQUIRE =>'question is require',
        self::APP_NAME_IS_REQUIRE =>'app name is require',
        self::APP_HAS_EXISTS =>'app has exists',
        self::APP_HAS_NOT_EXISTS =>'app has not exists',
        self::APP_REQUEST_TOO_FREQUENTLY =>'app request too frequent',
        self::CAPTCHA_TIMEOUT =>'验证码已失效'

    );

    public static function error($code,$message='',$type='json'){
        if(!$message){
            $message = isset(self::$message[$code]) ? self::$message[$code]:self::$message[self::UNKNOWN_ERROR];
        }
        $data = array();
        self::echoMessage($data,$code,$message,$type);
    }

    public static function success($data=array(),$code=0,$message='success',$type = 'json'){
        self::echoMessage($data,$code,$message,$type);
    }

    private static function echoMessage($data,$code,$message,$type){
        switch ($type){
            case 'json':
                $returnData = array(
                    'code'=>$code,
                    'message'=>$message,
                    'data'=>$data
                );
                echo json_encode($returnData);
                break;
        }
        exit;
    }

}