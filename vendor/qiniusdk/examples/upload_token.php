<?php
require_once __DIR__ . '/../autoload.php';

use Qiniu\Auth;

$accessKey = '8GdnLt1bxn51uNMYAKpyYQgUQF4gVwkoLtIe0pyl';
$secretKey = 'Vac2hx8mX_aWN4S6OphteH0Uh7jQ8xVnvMVgQiCI';
$auth = new Auth($accessKey, $secretKey);

$bucket = 'theroc-statis-resource';
$upToken = $auth->uploadToken($bucket);

echo $upToken;
