<?php
/**
 * User: ambi
 * Date: 2017/6/23
 */

namespace Roc\Library;

require_once APP_PATH.'vendor/PHPMailer/PHPMailerAutoload.php';
class PhpMailer{
    public static function getMailerInstance(){
        static $mailer = null;
        if(!$mailer){
            $mailer = new \PHPMailer();
            $mailer->Port = '25';
            $mailer->isSMTP();
            $mailer->SMTPAuth = true;
            $mailer->Username = '13533808115@163.com';
            $mailer->Host = 'smtp.163.com';
            $mailer->Password = 'ambi123456ambi';
            $mailer->setFrom('13533808115@163.com', 'theroc');
            $mailer->isHTML(true);
        }
        return $mailer;
    }
    public static function sendRegisterMail(){
        $mailer = self::getMailerInstance();
        $mailer->addAddress('245452530@qq.com', 'ttys');     // Add a recipient
        $mailer->Subject = 'Here is the mail test';
        $mailer->Body    = 'This is the HTML message body <b>in bold!</b>';
        if(!$mailer->send()){
            var_dump($mailer->ErrorInfo);
        }
    }
}