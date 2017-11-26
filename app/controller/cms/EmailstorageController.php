<?php
namespace Roc\BackendController;
use \Phalcon\Mvc\Controller;
use Roc\Library\Response;

/**
 * User: ambi
 * Date: 2017/6/21
 * email存储页
 */
class EmailstorageController extends BackendController{
    public function indexAction(){
        $this->view->render('pages','emailStorage');
    }

    public function api_get_email_listAction(){
        $page = $this->request->get('page');
        $size = $this->request->get('size');
        $page = $page? intval($page) : 1;
        $size = $size ? intval($size) : 10;
        $emails = \UserEmail::getList($page, $size);
        if(!$emails){
            $emails = array();
        }
        $data = array(
            'list'=>$emails,
            'total'=>\UserEmail::count()
        );
        Response::success($data);
    }
}