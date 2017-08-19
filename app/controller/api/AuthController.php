<?php
/**
 * User: ambi
 * Date: 2017/7/29
 */

namespace Roc\ApiController;


use Roc\Library\QiniuService;
use Roc\Library\Response;

class AuthController extends ApiController{
    public function getQiNiuTokenAction(){
        $upload_token = QiniuService::getUploadToken();
        Response::success(array('upload_token'=>$upload_token));
    }
}