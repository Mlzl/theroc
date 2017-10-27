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
            $mailer->Timeout = 5;
            $mailer->SMTPAuth = true;
            $mailer->Username = '13533808115@163.com';
            $mailer->Host = 'smtp.163.com';
            $mailer->Password = 'ambi123456ambi';
            $mailer->setFrom('13533808115@163.com', 'theroc');
            $mailer->isHTML(true);
        }
        return $mailer;
    }
    public static function sendRegisterMail($mail, $name, $token){
        $mailer = self::getMailerInstance();
        $mailer->addAddress($mail, $name);     // Add a recipient
        $mailer->Subject = 'from the';
        $mailer->Body    =<<<EOT
This is the HTML message body <b>in bold!</b>
<a href='http://www.theroc.com/login/activateAccount?email=$mail&token=$token'>点击激活</a>";
EOT;
        if(!$mailer->send()){
            return $mailer->ErrorInfo;
        }
        return true;
    }

    public static function sendCaptcha($mail, $captcha){
        $mailer = self::getMailerInstance();
        $mailer->addAddress($mail);     // Add a recipient
        $mailer->Subject = 'from the roc';
        $mailer->Body    =<<<EOT
your captcha is [<strong>$captcha</strong>]<br/>
it will out of date after <strong>5</strong>minutes
EOT;
        if(!$mailer->send()){
            return $mailer->ErrorInfo;
        }
        return true;
    }
}