<?php
namespace Roc\FrontendController;
use Roc\Library\SymmetricEncryption;
use Roc\Library\Captcha;
use Roc\Library\PhpMailer;

/**
 * User: ambi
 * Date: 2017/6/21
 */
class IndexController extends FrontendController {
    public function indexAction(){
        echo 'index->frontend';
    }
    public function testDBAction(){
        $res = \Test::findFirst();
        var_dump($res->toArray());
    }

    public function test_captchaAction(){
        $captcha = new Captcha();
        $captcha->paintText();
        $image64 = $captcha->getBase64Image();
        $img_src = "data:image/".$captcha->imageType.";base64," . $image64;
        echo $captcha->captchaCode;
        echo ("<img src='{$img_src}' style='width:110px;height:40px;' />");
    }

    public function test_voltAction(){
        $this->view->render('index','index');
    }

    public function test_decryptAction(){
        $symme = SymmetricEncryption::encrypt('user',123456678);
        echo SymmetricEncryption::decrypt('user', $symme);
    }

    public function test_mailAction(){
        PhpMailer::sendRegisterMail();
    }

    public function phpinfoAction(){
        phpinfo();
    }
}