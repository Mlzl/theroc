<?php
namespace Roc\FrontendController;
use \Phalcon\Mvc\Controller;
use Roc\Library\Captcha;

/**
 * User: ambi
 * Date: 2017/6/21
 */
class IndexController extends Controller{
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
}