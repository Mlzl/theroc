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
class ProductsController extends FrontendController {
    public function indexAction(){
        $this->view->render('products','index');
    }
    public function detailAction(){
        $this->view->render('products','detail');
    }
    public function searchAction(){
        $this->view->render('products','search');
    }
}