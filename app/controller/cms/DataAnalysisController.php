<?php
namespace Roc\BackendController;
use \Phalcon\Mvc\Controller;
/**
 * User: ambi
 * Date: 2017/6/21
 * 数据分析页
 */
class DataAnalysisController extends BackendController{
    public function indexAction(){
        $this->view->render('pages','dataAnalysis');
    }
}