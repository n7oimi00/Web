<?php
require_once 'Controller.php';
require_once 'Model.php';

$controller = new Controller();

$url = isset($_SERVER['PATH_INFO']) ? explode('/', ltrim($_SERVER['PATH_INFO'],'/')) : ['showIndex'];

$action = $url[0];
$params = isset($url[1]) ? array_slice($url, 1) : NULL;
$controller->$action($params);
?>