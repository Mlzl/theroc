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
class ProductController extends FrontendController {
    public function indexAction(){
        $this->view->render('pages','product');
    }
    public function detailAction(){
        $this->view->render('pages','product_detail');
    }
    public function searchAction(){
        $this->view->render('pages','product_search');
    }
}