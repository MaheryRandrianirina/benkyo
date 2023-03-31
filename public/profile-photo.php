<?php

require_once(dirname(__DIR__) . DIRECTORY_SEPARATOR . "vendor" . DIRECTORY_SEPARATOR . "autoload.php");
use Database\Models\UsersModel;

$image = UsersModel::profilePhoto();
echo file_get_contents($image);