<?php
$sql = '';
if(count($keresegytablas) > 1){
    if(is_int(intval($keresegytablas[1]))){
        $sql = "SELECT * FROM `autoverseny` WHERE `autoversenyzid`=" . $keresegytablas[1];
    }else{
        http_response_code(404);
        echo 'Nem létező ügyfel';
    }
}else{
    $sql = "SELECT * FROM `autoverseny` WHERE 1";
}
require_once "./databaseconnection.php";
$result = $conn->query($sql);
if($result->num_rows > 0){
    $egytablasok = array();
    while($row = $result->fetch_assoc()){
        $egytablasok[] = $row;
    }
    http_response_code(200);
    echo json_encode($egytablasok);
}else{
    http_response_code(404);
    echo 'Nincs egy ügyfel sem';
}