<?php
/**
 * User: ambi
 * Date: 2017/7/30
 */

namespace Roc\Library;
require_once ROOT_PATH.'vendor/qiniusdk/autoload.php';
use Qiniu\Auth;
class QiniuService
{
    public static function getUploadToken(){
        $accessKey = '8GdnLt1bxn51uNMYAKpyYQgUQF4gVwkoLtIe0pyl';
        $secretKey = 'Vac2hx8mX_aWN4S6OphteH0Uh7jQ8xVnvMVgQiCI';
        $bucket = 'theroc-statis-resource';
        $auth = new Auth($accessKey, $secretKey);
        $upload_token = $auth->uploadToken($bucket);
        return $upload_token;
    }
}