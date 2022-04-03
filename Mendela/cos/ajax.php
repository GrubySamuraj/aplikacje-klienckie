<?php
//phpinfo();
// $_POST    $_GET   $_REQUEST
// print_r($_POST);
// print_r($_GET);
// print_r($_REQUEST);
include("hidden.php"); //require
$mysqli = new mysqli($host, $user, $passwd, $dbname);
$mysqli->query("set names utf8");

if(isset($_POST['acc']) && $_POST['acc']=='add'){
    $sql = "insert into imiona(imie) values(?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("s", rawurldecode($_POST['imie']));
    $stmt->execute();
}else if(isset($_POST['acc']) && $_POST['acc']=='get'){
    $sql = "select * from imiona";
    $result = $mysqli->query($sql);
    $all = $result->fetch_all();
    echo json_encode($all);
}

// select count(*) from users where login='".$_POST['user']"' and passwd='".$_POST['passwd']."'
// select count(*) from users where login='    ' or 1=1 --     ' and passwd='".$_POST['passwd']."'
// binduj!!!
?>
