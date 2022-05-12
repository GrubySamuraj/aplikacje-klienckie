<?php
//id lub dlugosc tabelki
include("hidden.php");
$mysqli = new mysqli($host, $user, $passwd, $dbname);
$mysqli->query("set names utf8");
if(isset($_POST["acc"]) && $_POST["acc"] == "send"){
    $sql1 = "select id from main";
    $result = $mysqli->query($sql1);
    $id = $result->fetch_all();
    $sql = "insert into main(id,nickname, wiadomosc ,kolor, time) values(NULL,?,?,?,NULL)";
    $stmt = $mysqli->prepare($sql);
    $sql1 = "DELETE from main WHERE id < (SELECT max(id) FROM main)";
    $result1 = $mysqli->query($sql1);
    $stmt->bind_param('sss',rawurldecode($_POST["nick"]),rawurldecode($_POST["message"]),rawurldecode($_POST["kolor"]));
    $stmt->execute();
}
if(isset($_POST["acc"]) && $_POST["acc"] == "whatID"){
    $sql1 = "SELECT id from main WHERE id = (SELECT max(id) FROM main)";
    $result = $mysqli->query($sql1);
    $id = $result->fetch_all();
    $odp = array(
        "status" => "success",
        "id" => $id
    );
}
if(isset($_POST["acc"]) && $_POST["acc"] == "get"){
    $time = time();
    $odp = array(
        "status" => "null"
    );
    $sql2 = "SELECT id from main WHERE id = (SELECT max(id) FROM main)";
    $result2 = $mysqli->query($sql2);
    $current_id = $result2->fetch_all()[0][0];
    while (time() - $time < 2) {
        if($current_id > $_POST["last"]){
            $sql1 = "DELETE from main WHERE id < (SELECT max(id) FROM main)";
            $result1 = $mysqli->query($sql1);
            $sql = "select * from main";
            $result = $mysqli->query($sql);
            $all = $result->fetch_all();
            $odp = array(
                "status" => "success",
                "data" => $all,
                "id" => $_POST["last"]
            );
            break;
        }
        usleep(100);
    }
}
echo json_encode($odp);