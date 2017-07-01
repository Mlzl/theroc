<?php
/**
 * User: ambi
 * Date: 2017/6/26
 */
class UserAddress extends Model{
    public function getSource(){
        return 'theroc_user_address';
    }

    public function addAddress($address){
        $data = array(
            'big_address'=>$address['big_address'],
            'detail_address'=>$address['detail_address'],
            'zip_code'  =>$address['zip_code'],
            'phone_number'=>$address['phone_number'],
            'create_time'=>time()
        );
        $this->save($data);
    }

    public function getAddressById($address_id){
        $address = self::findFirst(array(
            'conditions'=>'id=:id:',
            'bind' =>array('id'=>$address_id)
        ));
        if(!$address){
            return false;
        }
        return $address;
    }

    public function getAddressByUid($user_id){
        $addresses = self::find(array(
            'conditions'=>'user_id=:user_id:',
            'bind'=>array('user_id'=>$user_id)
        ));
        if(!$addresses){
            return false;
        }
        return $addresses;
    }
}