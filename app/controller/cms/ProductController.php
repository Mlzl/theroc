<?php
/**
 * User: ambi
 * Date: 2017/7/8
 */

namespace Roc\BackendController;


class ProductController extends BackendController {
    public function addAction(){
        $productModel = new \Product();
        $name = $this->request->getPost('name');
        $class_id = $this->request->getPost('class_id');
    }
}