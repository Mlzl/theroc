<?php
/**
 * User: ambi
 * Date: 2017/7/8
 */

namespace Roc\BackendController;


use Roc\BackendController\BackendController;
use Roc\Library\InputCheck;
use Roc\Library\Language;
use Roc\Library\Response;

class ProductpictureController extends BackendController  {
    public function api_addAction(){
        $productPicture = new \ProductPicture();
        $pic_path = $this->request->getPost('path');
        $product_id = $this->request->getPost('product_id');
        if(!$pic_path || !$product_id){
            Response::error(Language::LOST_PARAMS);
        }

        $data = array(
            'product_id'=>$product_id,
            'path'=>$pic_path,
        );
        $productPicture->addPicture($data);
        Response::success(true);
    }


    public function api_deleteAction(){
        $picture_id = $this->request->get('picture_id');
        if(!$picture_id){
            Response::error(Language::LOST_PARAMS);
        }
        \ProductPicture::deleteOneByField($picture_id);
        Response::success(true);
    }
}