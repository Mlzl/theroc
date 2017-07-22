<?php
namespace Roc\FrontendController;
use Roc\Library\SymmetricEncryption;
use Roc\Library\Captcha;
use Roc\Library\PhpMailer;
use Roc\Library\UploadFile;

/**
 * User: ambi
 * Date: 2017/6/21
 * 注册页
 */
class RegisterController extends FrontendController {
    public function indexAction(){
        $this->view->render('pages','register');
    }
}