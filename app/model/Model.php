<?php

/**
 * User: ambi
 * Date: 2017/6/26
 */
class Model extends \Phalcon\Mvc\Model{
    protected $error_message;
    public function getMessage()
    {
        foreach (parent::getMessages() as $message){
            $this->error_message .= $message->getMessage();
        }
        return $this->error_message;
    }

    public static function findOneByField($key, $value){

        $target = self::findFirst(array(
            'conditions'=>"$key=:param1:",
            'bind'=>array('param1'=>$value)
        ));
        if($target){
            return $target;
        }
        return false;
    }


    public static function deleteOneByField($value, $key='id'){
        $target = self::findFirst(array(
            'conditions'=>"$key=:param1:",
            'bind'=>array('param1'=>$value)
        ));
        if($target){
            return $target->delete();
        }
        return false;
    }


}