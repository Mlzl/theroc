<?php
/**
 * User: ambi
 * Date: 2017/7/8
 */

namespace Roc\ApiController;


class ProductController extends ApiController {
    public function addAction(){
        $productModel = new \Product();
        $name = $this->request->getPost('name');
        $class_id = $this->request->getPost('class_id');

    }
}