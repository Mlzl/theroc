<?php
/**
 * User: ambi
 * Date: 2017/6/26
 */
class UserEmail extends Model{
    public function getSource(){
        return 'theroc_user_email';
    }

    public function addEmail($email){
        $data = array(
            'email'=>$email,
            'create_time'=>time()
        );
        return $this->save($data);
    }

    public static function getList($page, $size){
        $email = self::find(array(
            'limit'=>array('number'=>$size, 'offset'=>($page-1)*$size),
        ));
        if(!$email){
            return false;
        }
        return $email->toArray();
    }
    public static function getEmail($email){
        $email = self::findFirst(array(
            'conditions'=>'email=:email:',
            'bind' =>array('email'=>$email)
        ));
        if(!$email){
            return false;
        }
        return $email;
    }

}