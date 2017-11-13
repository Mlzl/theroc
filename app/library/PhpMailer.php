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
            $mailer->setFrom('notice@limskey.com', 'limskey');
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
<a href='http://www.limskey.com/login/activateAccount?email=$mail&token=$token'>点击激活</a>";
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