<?php
/**
 * User: ambi
 * Date: 2017/6/26
 */
namespace Roc\Library;
class UploadFile {
    private $save_path = UPLOAD_IMG_PATH;
    private $filename = null;
    private $error_msg = '';
    public function __construct(){
        $this->save_path = $this->save_path . date('Ymd') .'/';
        $this->check_dir();
    }

    private function check_dir(){
        if(!is_dir($this->save_path)){
            mkdir($this->save_path, 0755, true);
        }
        return true;
    }

    public function upload($upload_file){
        if(empty($upload_file['name'])){
            $this->error_msg = '上传文件为空';
            return false;
        }
        if($upload_file['error']){
            $this->error_msg = $upload_file['error'][0];
            return false;
        }
        $this->filename = $this->save_path . $upload_file['name'];
        if(file_exists($this->filename)){
            $this->error_msg = '文件已经存在';
            return false;
        }
        if(!is_uploaded_file($upload_file['tmp_name'])){
            $this->error_msg = '非上传文件';
            return false;
        }
        if(move_uploaded_file($upload_file['tmp_name'], $this->filename)){
            return true;
        }
        $this->error_msg = '上传失败';
        return false;
    }
    public function getErrorMsg(){
        return $this->error_msg;
    }
}
