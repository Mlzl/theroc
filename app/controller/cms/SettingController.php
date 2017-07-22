<?php
/**
 * User: ambi
 * Date: 2017/7/8
 */

namespace Roc\BackendController;


use Roc\Library\Language;
use Roc\Library\Response;
use Roc\Library\UploadFile;

class SettingController extends BackendController {
    /**
     * 新增轮播图
     */
    public function api_add_bannerAction(){
        $target_url = $this->request->getPost('target_url');
        $upload_lib = new UploadFile();
        if(!$upload_lib->upload($_FILES['upload_file'])){
            Response::error($upload_lib->getErrorMsg());
        }
        $image_path = $upload_lib->filename;
        if(!$target_url || !$image_path){
            Response::error(Language::LOST_PARAMS);
        }
        $setting_model = new \Setting();
        $setting_model->addSetting(\Setting::BANNER_NAME,
            array('target_url'=>$target_url, 'image_path'=>$image_path));
        Response::success();
    }

    public function api_delete_bannerAction(){
        $banner_id = $this->request->get('banner_id');
        \Setting::deleteOneByField($banner_id);
        $this->logger->info("[{$this->user->user_id}] delete banner[$banner_id]");
        Response::success();
    }


    public function api_add_special_productAction(){
        $product_id = $this->request->get('product_id');
        $special_label = $this->request->get('special_label');
        $allow_label = array(\Setting::PRODUCT_NAV_NAME, \Setting::PRODUCT_HOT_NAME,
            \Setting::PRODUCT_RECOMMEND_NAME);
        if(!in_array($special_label, $allow_label)){
            Response::error(Language::PRODUCT_LABEL_NOT_EXISTS);
        }
        if(!\Product::getProductById($product_id)){
            Response::error(Language::PRODUCT_NOT_EXISTS);
        }
        $special_product = \Setting::getOneSetting($special_label);
        if(!$special_product){//添加
            $special_product[] = $product_id;
            $setting_model = new \Setting();
            $setting_model->addSetting($special_label, $special_product);
        }else{
            $special_product_id = unserialize($special_product->value);
            if(!in_array($product_id, $special_product_id)){
                $special_product_id[] = $product_id;
                $special_product->value = serialize($special_product_id);
                $special_product->update();
            }
        }

        Response::success();
    }

    public function api_delete_special_productAction(){
        $product_id = $this->request->get('product_id');
        $special_label = $this->request->get('special_label');
        $allow_label = array(\Setting::PRODUCT_NAV_NAME, \Setting::PRODUCT_HOT_NAME,
            \Setting::PRODUCT_RECOMMEND_NAME);
        if(!in_array($special_label, $allow_label)){
            Response::error(Language::PRODUCT_LABEL_NOT_EXISTS);
        }
        $special_product = \Setting::getOneSetting($special_label);
        if(!$special_product){
            Response::success();
        }
        $special_product_id = unserialize($special_product->value);
        foreach ($special_product_id as $key=>$value){
            if($value == $product_id){
                unset($special_product_id[$key]);
                $special_product->value = serialize($special_product_id);
                $special_product->update();
            }
        }

        Response::success();
    }}