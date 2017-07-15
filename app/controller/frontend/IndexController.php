<?php
namespace Roc\FrontendController;
use Roc\Library\SymmetricEncryption;
use Roc\Library\Captcha;
use Roc\Library\PhpMailer;
use Roc\Library\UploadFile;

/**
 * User: ambi
 * Date: 2017/6/21
 */
class IndexController extends FrontendController {

    public function indexAction(){
        $this->view->render('home','index1');
    }
    public function productsAction(){
        $this->view->render('products','index');
    }
    public function productsDetailAction(){
        $this->view->render('products','detail');
    }




    public function index1Action(){
        $this->view->render('index', 'test_upload');
    }

    public function test_captchaAction(){
        $captcha = new Captcha();
        $captcha->paintText();
        $image64 = $captcha->getBase64Image();
        $img_src = "data:image/".$captcha->imageType.";base64," . $image64;
        echo $captcha->captchaCode;
        echo ("<img src='{$img_src}' style='width:110px;height:40px;' />");
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

    public function add_addressAction(){
        $addressModel = new \UserAddress();
        $addressModel = $addressModel->getAddressById(1);
        var_dump($addressModel->toArray());
    }

    public function test_uploadAction(){
        var_dump($this->request->isPost());
        var_dump($_FILES);
        $upload = new UploadFile();
        if(!$upload->upload($_FILES['upload_file'])){
            echo $upload->getErrorMsg();
        }
        exit();
    }

    public function test_redisAction(){
        $this->redis->set('redis_test', 'redis_value', 10);
        var_dump($this->redis->get('redis_test'));
    }
}