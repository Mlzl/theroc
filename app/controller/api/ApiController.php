<?php
/**
 * User: ambi
 * Date: 2017/7/3
 */

namespace Roc\ApiController;


use Phalcon\Mvc\Controller;

class ApiController extends Controller {

    public function testAction(){
        echo 'api';
        exit;
    }
}