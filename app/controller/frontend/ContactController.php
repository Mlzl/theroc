<?php
namespace Roc\FrontendController;
use Roc\Library\SymmetricEncryption;
use Roc\Library\Captcha;
use Roc\Library\PhpMailer;
use Roc\Library\UploadFile;

/**
 * User: ambi
 * Date: 2017/6/21
 * 联系我们
 */
class ContactController extends FrontendController {
    public function indexAction(){
        $this->view->render('pages','contact');
    }
}