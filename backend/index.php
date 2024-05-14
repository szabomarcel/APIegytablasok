<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
require_once './databaseconnection.php';
$keresegytablas = explode('/', $_SERVER['QUERY_STRING']);
if($keresegytablas[0] === "versenyzok"){
    require_once 'egytablasok/index.php';
}else{
    http_response_code(405);
    $errotJson = array('message' => 'Nincs ilyen API');
    return json_encode($errotJson);
}