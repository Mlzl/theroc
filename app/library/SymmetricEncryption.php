<?php
/**
 * User: ambi
 * Date: 2017/6/22
 */

namespace Roc\Library;


/**
 * 对称加密算法类
 *
 */
class SymmetricEncryption{
    const CIPHER = MCRYPT_RIJNDAEL_128;
    const MODEL = MCRYPT_MODE_CBC;
    const HASH_ALGORITHM = 'sha1';
    const HASH_SALT = 'AAECAwQFBgcICQoLDA0ODw';
    const HASH_ITERATIONS = 10;
    const HASH_KEY_LENGTH = 16;
    const IV = 'CgELBQQPBwkXAwEGCAwNWw';
    private static $all_key_list = array(
        'product', 'user'
    );
    public function __construct() {
    }


    private static  function filterKey($key){
        if(in_array($key, static::$all_key_list)){
            return true;
        }
        return false;
    }

    /**
     * 加密
     * @param $key string 加密密钥
     * @param $data string 待加密明文
     * @return string 密文
     */
    public static function encrypt($key, $data){
        if(!self::filterKey($key)){
            return false;
        }
        $key = hash_pbkdf2(self::HASH_ALGORITHM, $key, base64_decode(self::HASH_SALT), self::HASH_ITERATIONS, self::HASH_KEY_LENGTH, true);
        $data = self::PKCS7Padding($data);
        $ciphertext = mcrypt_encrypt(self::CIPHER, $key, $data, self::MODEL, base64_decode(self::IV));
        return urlencode(base64_encode($ciphertext));
    }

    /**
     * 解密
     * @param $key string 解密密钥
     * @param $data string 待解密密文
     * @return string 明文
     */
    public static function decrypt($key, $data){
        if(!self::filterKey($key)){
            return false;
        }
        $key = hash_pbkdf2(self::HASH_ALGORITHM, $key, base64_decode(self::HASH_SALT), self::HASH_ITERATIONS, self::HASH_KEY_LENGTH, true);
        $ciphertext_dec = base64_decode(urldecode($data));
        $plaintext_dec = mcrypt_decrypt(self::CIPHER, $key, $ciphertext_dec, self::MODEL, base64_decode(self::IV));
        return self::PKCS7RemovePadding($plaintext_dec);
    }

    /**
     * PKCS7Padding模式填充
     * @param $data
     * @return string
     */
    private static function PKCS7Padding($data){
        $block_size = mcrypt_get_block_size(self::CIPHER,self::MODEL);
        $pad = $block_size - (strlen($data) % $block_size);
        return $data . str_repeat(chr($pad), $pad);
    }

    /**
     * 移除PKCS7Padding模式填充
     * @param $data
     * @return string
     */
    private static function PKCS7RemovePadding($data){
        $pad = ord($data[strlen($data) - 1]);
        return substr($data, 0, -$pad);
    }

}