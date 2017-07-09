<?php

namespace Roc\Library;

use Phalcon\Logger\Formatter\Line as LineFormatter;

class Logger {

    public $logger = null;

    //使用了setMessageFormat的列表
    private $used_setMessageFormat_function = array(
        'debug','warning','info','error','setLog','setMessageFormat'
    );
    public function __construct($file)
    {
        $this->logger = new \Phalcon\Logger\Adapter\File($file);
        $format = new LineFormatter();
        $format->setFormat("[%type%]%message%");
        $this->logger->setFormatter($format);
        $this->logger->begin();//开始事务
    }


    private function setMessageFormat($message){
        $message = trim($message);
        $backtrace = debug_backtrace(2);
        $last =$target= array();
        foreach($backtrace as $item){
            if(isset($item['function']) && !in_array($item['function'],$this->used_setMessageFormat_function)){
                $target = $item;
                break;
            }else{
                $last = $item;
            }
        }
        if(!$target){
            $target['file'] = $last['file'];
        }
        $line = isset($last['line']) ? $last['line']:'';
        $class = isset($target['class']) ? $target['class']:$target['file'];
        $func = isset($target['function']) ? $target['function']: '';
        $position = '['.$class.'-'.$func.'-'.$line.']';
        $date = date('Y-m-d H:i:s');
        $microTime = explode('.',microtime(true));
        return "[$date,{$microTime[1]}]".$position.' '.$message;
    }

    public function warning($message){
        $message = $this->setMessageFormat($message);
        return $this->logger->warning($message);
    }

    public function info($message){
        $message = $this->setMessageFormat($message);
        return $this->logger->info($message);
    }

    public function error($message){
        $message = $this->setMessageFormat($message);
        return $this->logger->error($message);
    }
    public function __destruct(){
        $this->logger->commit();//提交事务
    }
}