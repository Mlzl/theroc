<?php
/**
 * User: ambi
 * Date: 2017/6/22
 */

namespace Roc\Library;


class Captcha{
    private $imageHandle = '';
    private $antiAlias = true;//抗锯齿
    public $fontSize = 0; //字体大小
    public $fontFile = '';//字体文件
    public $width = 120;//验证码宽度
    public $height = 35;//验证码高度


    public $imageType = 'png';//验证码图片格式
    public $fontColor;//字体颜色
    public $disturbColor;//干扰颜色
    public $backgroundColor;//背景颜色
    public $captchaText = '';//验证码文本
    public $captchaCode = '';//验证码

    public $disturbTextLen = 0;//干扰文本长度
    public $disturbTextSize = 3;//干扰文本的大小
    public $isDisturb = true;//是否干扰
    public $isPaintPixel = true;//是否画像素点
    public $pixelNum = 0;
    public $isPaintLine = true;//是否画干扰线
    public $lineNum = 0;//干扰线数量
    private $isPaintShadow = false;//旋转图片或者画阴影
    public function __construct( $width =120 , $height =50){
        $this->height = $height;
        $this->width = $width;
        $this->imageHandle = imagecreate($this->width , $this->height);
    }

    public static function verify($code){
        $raw_code = $_SESSION['captcha_code'];
        if(strtoupper($code) == strtoupper($raw_code)){
            return true;
        }
        return false;
    }

    public static function getFontColor(){
        $_ = array(
            array(0xEE,0x41,0x02),//大红
            array(0xB1,0x22,0x1D),//血红
            array(0x34,0x30,0x2F),//黑色
            array(0xCC,0x10,0x11),//深红
            array(0x00,0x64,0x00),//深绿
            array(0x00,0x00,0xCD),//深蓝
        );
        return $_[rand(0,count($_)-1)];
    }

    /**
     * @return mixed
     * 干扰颜色淡色系
     */
    public static function getDisturbColor(){
        $_ = array(
            array(0xBF,0xBF,0xBF),//灰色
            array(0xFA,0xE6,0xE4),//浅粉
            array(0xE1,0xA8,0x97),//灰粉
            array(0xFF,0xD9,0xDF),//稍深粉
            array(0xFF,0xED,0xFF),//浅紫粉
            array(0xE1,0xA9,0x98),//浅棕
            array(0xFA,0xE6,0xE4),//浅粉
        );
        return $_[rand(0,count($_)-1)];
    }

    /**
     * @return mixed
     * 背景颜色淡色系
     */
    public static function getBackgroundColor(){
        $_ = array(
            array(0xE8,0xE8,0xE8),
            array(0xCA,0xE1,0xFF),
            array(0xC1,0xC1,0xC1),
            array(0x8D,0xB6,0xCD),
            array(0x87,0xCE,0xEB),
            array(0xE8,0xE8,0xE8),
        );
        return $_[rand(0,count($_)-1)];
    }

    private function initImage(){
        if($this->antiAlias){
            imageantialias($this->imageHandle,true);
        }
        $this->getRandFont();
        //第一次调用被设为背景色
        $this->backgroundColor = $this->backgroundColor ? $this->backgroundColor : self::getBackgroundColor();
        $this->backgroundColor = imagecolorallocate($this->imageHandle , $this->backgroundColor[0], $this->backgroundColor[1], $this->backgroundColor[2]);
        $this->disturbColor = $this->disturbColor ? $this->disturbColor : self::getDisturbColor();
        $this->disturbColor = imagecolorallocatealpha($this->imageHandle , $this->disturbColor[0], $this->disturbColor[1], $this->disturbColor[2],50);
    }

    private function getRandFontColor(){
        $this->fontColor = self::getFontColor();
        $this->fontColor = imagecolorallocate($this->imageHandle , $this->fontColor[0], $this->fontColor[1], $this->fontColor[2]);
        return $this->fontColor;
    }
    public static $englishFont = array(//英文数字字体 不支持中文
        array('size'=>30,'file'=>'AntykwaBold.ttf'),
        array('size'=>30,'file'=>'Duality.ttf'),
        array('size'=>30,'file'=>'TimesNewRomanBold.ttf'),
        array('size'=>30,'file'=>'VeraSansBold.ttf'),
        array('size'=>30,'file'=>'Vrinda.ttf'),
        array('size'=>30,'file'=>'futuraLT.ttf'),
        array('size'=>30,'file'=>'LITHOS.otf'),
        array('size'=>30,'file'=>'ArchitectsDaughter.ttf'),
    );
    private function getRandFont(){
        $font = self::$englishFont[mt_rand(0,count(self::$englishFont)-1)];
        $this->fontFile = ROOT_PATH.'public/font/'.$font['file'];
        $this->fontSize = $font['size'];
    }

    public static $ascii = array(
        'a','b','c','d','e','f','g','h','k','m','n','p','q','r','s','t','u','v','w','x','y','3','4','5','6','7','8','9'
    );
    /**
     * @return array
     * 获取字母+数字组合
     */
    public static function getAsciiText(){
        $ascii = self::$ascii;
        $textLength = 4;//验证码长度
        $text = '';
        $answer = '';
        for ($i=0;$i<$textLength;$i++){
            $w = $ascii[mt_rand(0,count($ascii)-1)];
            if(mt_rand(1,10)<5 && $w!='w'&& $w!='m'){//w和m不大写  大写特别占地方
                $text[] = strtoupper($w);
            }else{
                $text[] = $w;
            }
            $answer .=$w;
        }
        return array('text'=>$text,'answer'=>$answer);
    }

    public function paintText(){
        $this->initImage();

        $text = self::getAsciiText();
        $this->captchaCode = $text['answer'];
        $this->captchaText = $text['text'];
        $x = mt_rand(0 , 5);
        foreach ($this->captchaText as $w){
            $y = mt_rand($this->height/3*2 , $this->height/4*3);
            $angel = mt_rand(-15,15);
            $wordWidth = imagettftext($this->imageHandle,$this->fontSize ,$angel,$x,$y,$this->getRandFontColor(),$this->fontFile,$w);
            $x1 = $wordWidth[2]-$wordWidth[0];//右下角-左下角
            $x2 = $wordWidth[4] - $wordWidth[6];//右上角-左上角
            $width = $x1>$x2?$x2:$x1;
            $x += $width>25?25:$width-2;
            $this->getRandFont();//换字体
        }
        if($this->isPaintLine){
            while($this->lineNum -- ){
                $this->paintLine($this->fontColor);
            }
        }
        $this->isPaintPixel && $this->setPixel($this->fontColor);
        $this->isDisturb && $this->paintDisturbText();
        $_SESSION['captcha_code'] = $this->captchaCode;
        return $this->captchaCode;
    }

    private function addRandomShadow(){
        if($this->isPaintShadow){
            $x = mt_rand(2,3);
            $z = mt_rand(2,4)/2;
            $emboss = array(array($x, 0, 0), array(0, 1, 0), array(0,-1,-$z));
            imageconvolution($this->imageHandle, $emboss, 1, 127);
        }else{
            $this->imageHandle = imagerotate($this->imageHandle,mt_rand(-10,10),$this->fontColor);
        }
    }

    public function getBase64Image(){
        ob_start();
        if($this->imageType == 'png'){
            imagepng($this->imageHandle);
        }else if($this->imageType == 'jpeg'){
            imagejpeg($this->imageHandle);
        }
        $base64 = base64_encode(ob_get_clean());
        return $base64;
    }

    /**
     * @param $color
     * 画弧线
     */
    private function paintLine($color){
        imageline($this->imageHandle,mt_rand(0,$this->width/2),mt_rand(0,$this->height/2),mt_rand($this->width/2,$this->width),mt_rand($this->height/2,$this->height),$color);
    }

    /**
     * @param $color
     * 画颜色点
     */
    private function setPixel($color){
        $pixelLength = $this->pixelNum;
        for($i=0;$i<$pixelLength ; $i++){
            imagesetpixel($this->imageHandle , mt_rand(0,$this->width) , mt_rand(0,$this->height),$color);
        }
    }


    /**
     * @return mixed
     * 单个字母或数字
     */
    public static function getDisturbText(){
        return self::$ascii[mt_rand(0,count(self::$ascii)-1)];
    }
    /**
     * 干扰文本
     */
    private function paintDisturbText(){
        for($i=0;$i<$this->disturbTextLen;$i++){
            $text = self::getDisturbText();
            $x = mt_rand(0,$this->width-$this->disturbTextLen);
            $y = mt_rand(0,$this->height- $this->disturbTextLen);
            imagechar($this->imageHandle,$this->disturbTextSize,$x,$y,$text,$this->disturbColor);
        }
    }

    /**
     *销毁验证码图片
     */
    public function __destruct(){
        imagedestroy($this->imageHandle);
    }
}