<?php

/**
 * User: ambi
 * Date: 2017/6/26
 */
class Setting extends Model{

    /**
     * 产品轮播图
     */
    const PRO_BANNER= 'pro_banner';

    /**
     * 主页轮播图
     */
    const HOME_BANNER = 'home_banner';

    /**
     * 产品导航
     */
    const PRODUCT_NAV_NAME = 'product_nav';

    /**
     * 热销产品
     */
    const PRODUCT_HOT_NAME = 'product_hot';

    /**
     * 推荐产品
     */
    const PRODUCT_RECOMMEND_NAME = 'product_recommend';

    public function getSource(){
        return 'theroc_setting';
    }

    public function addSetting($name, $value){
        if(!$name){
            return false;
        }
        $data = array(
            'name'=>$name,
            'value'=>serialize($value)
        );
        return $this->save($data);
    }

    public static function getSetting($name){
        $setting_info = self::find(array('conditions'=>'name=:name:',
            'bind'=>array('name'=>$name)));
        if(!$setting_info){
            return false;
        }
        $setting_info = $setting_info->toArray();
        foreach ($setting_info as &$setting){
            $setting['value'] = unserialize($setting['value']);
        }
        return $setting_info;
    }

    public static function getOneSetting($name){
        $setting_info = self::findFirst(array('conditions'=>'name=:name:',
            'bind'=>array('name'=>$name)));
        if(!$setting_info){
            return false;
        }
        return $setting_info;
    }
}