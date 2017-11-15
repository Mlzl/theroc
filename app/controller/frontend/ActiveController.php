<?php
namespace Roc\FrontendController;
use Roc\Library\SymmetricEncryption;
use Roc\Library\Captcha;
use Roc\Library\PhpMailer;
use Roc\Library\UploadFile;

/**
 * User: ambi
 * Date: 2017/6/21
 * 支持中心页
 */
class ActiveController extends FrontendController {
    public function indexAction(){
        $this->view->render('pages','active_success');
    }
    public function successAction(){
        $this->view->render('pages','active_success');
    }
    public function failAction(){
        $this->view->render('pages','active_fail');
    }
}