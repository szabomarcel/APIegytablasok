<?php
switch ($_SERVER['REQUEST_METHOD']){
    case "GET":
        require_once 'egytablasok/getegytabla.php';
        break;
    case "POST":
        require_once 'egytablasok/postegytabla.php';
        break;
    default:
        break;
}