<?php
//phpinfo();
// $_POST    $_GET   $_REQUEST
// print_r($_POST);
include("hidden.php"); //require
$mysqli = new mysqli($host, $user, $passwd, $dbname);
$mysqli->query("set names utf8");

// $sql = "insert into imiona(imie) values(?)";
// $stmt = $mysqli->prepare($sql);
// $stmt->bind_param("s", rawurldecode($_POST['imie']));
// $stmt->execute();
if(isset($_POST["acc"]) && $_POST["acc"]== "get"){
    $sql = "select * from main,flagi,materiały where main.id_flagi = flagi.id_flagi AND materiały.id_materialu = main.id_stopu";
    $result = $mysqli->query($sql);
    $all = $result->fetch_all();
}

echo json_encode($all);

// select count(*) from flagi
// select count(*) from flagi
// select count(*) from flagi
// select count(*) from users where login='    ' or 1=1 --     ' and passwd='".$_POST['passwd']."'
// binduj!!!
