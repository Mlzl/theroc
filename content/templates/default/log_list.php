<?php
/**
 * 站点首页模板
 */
if (!defined('EMLOG_ROOT')) {
    exit('error!');
}
?>

<div class="col-md-7 content">
    <?php
    if (!empty($logs)):
        foreach ($logs as $value):
            ?>
            <h2><?php topflg($value['top'], $value['sortop'], isset($sortid) ? $sortid : ''); ?><a href="<?php echo $value['log_url']; ?>"><?php echo $value['log_title']; ?></a></h2>
            <p class="date"><?php echo gmdate('Y-n-j', $value['date']); ?> <?php echo ',author: '.$value['user_name']; ?>
            <?php blog_sort($value['logid']); ?> 
            </p>
        <?php echo $value['log_description']; ?>
            <p class="tag"><?php blog_tag($value['logid']); ?></p>
            <p class="count">
                <a href="<?php echo $value['log_url']; ?>#comments">comment(<?php echo $value['comnum']; ?>)</a>
                <a href="<?php echo $value['log_url']; ?>">browse(<?php echo $value['views']; ?>)</a>
            </p>
            <div style="clear:both;"></div>
            <?php
        endforeach;
    else:
        ?>
        <h2>未找到</h2>
        <p>抱歉，没有符合您查询条件的结果。</p>
        <?php endif; ?>

    <div id="pagenavi">
<?php echo $page_url; ?>
    </div>
</div>

<?php
include View::getView('side');
include View::getView('footer');
?>