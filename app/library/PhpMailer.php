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
            $mailer->Port = 25;
            $mailer->Timeout = 3;
            $mailer->SMTPAuth = false;
            $mailer->SMTPSecure = false;
            $mailer->Username = 'notice@limskey.com';
            $mailer->Host = 'smtpout.secureserver.net';
            $mailer->Password = 'Gdd526691651';
            $mailer->FromName = "limskey";
            $mailer->From = "zhanwei@join.limskey.com";
            $mailer->isHTML(true);
        }
        return $mailer;
    }
    public static function sendRegisterMail($mail, $name, $token){
        $mailer = self::getMailerInstance();
        $mailer->addAddress($mail, $name);     // Add a recipient
        $mailer->Subject = 'join limskey';
        $mailer->Body    =<<<EOT
dear user $name:<br />
    thank you for you register limskey.you can enjoy all service,after you click below link to active your account.<br />
    <a href='http://www.limskey.com/login/activateAccount?email=$mail&token=$token'>http://www.limskey.com/login/activateAccount?email=$mail&token=$token</a><br />
    ps: the link will be invalid after 24 hour
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