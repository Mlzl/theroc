<?php
/**
 * User: ambi
 * Date: 2017/7/3
 */

namespace Roc\BackendController;
use Roc\Library\Response;

class UserController extends BackendController {

    public function listAction(){
        $page = $this->request->get('page', null, 1);
        $size = $this->request->get('size', null, 20);
        $users = \User::getList($page, $size);
        foreach ($users as &$user){
            unset($user['salt']);
            unset($user['password']);
        }
        $data = array(
            'list'=>$users,
            'total'=>\User::count()
        );
        Response::success($data);
    }

}