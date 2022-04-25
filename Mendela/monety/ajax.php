<?php

include("hidden.php");
$mysqli = new mysqli($host, $user, $passwd, $dbname);
$mysqli->query("set names utf8");

if (isset($_POST["acc"]) && $_POST["acc"] == "get") {
    $sql = "select * from main,flagi,materiały where main.id_flagi = flagi.id_flagi AND materiały.id_materialu = main.id_stopu";
    $result = $mysqli->query($sql);
    $all = $result->fetch_all();
} else if ($_POST["acc"] == "getflagi") {
    $sql = "select * from flagi";
    $result = $mysqli->query($sql);
    $all = $result->fetch_all();
} else if ($_POST["acc"] == "getstopy") {
    $sql = "select * from materiały";
    $result = $mysqli->query($sql);
    $all = $result->fetch_all();
} else if ($_POST["acc"] == "add") {
    $sql = "insert into main(id,id_flagi,nominal, nr_kat, id_stopu, rok) values(NULL,?,?,?,?,?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('issii', rawurldecode($_POST["flaga"]), rawurldecode($_POST["nominal"]), rawurldecode($_POST["kategoria"]), rawurldecode($_POST["stop"]), rawurldecode($_POST["rok"]));
    $stmt->execute();
} else if ($_POST["acc"] == "remove") {
    $sql = "delete from main where id = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('i', $_POST["id"]);
    $stmt->execute();
} else if ($_POST["acc"] == "send2") {
    $sql = "update main set id_flagi=?, nominal=?, nr_kat=?, id_stopu=?, rok=? where id= ?";
    $stmt = $mysqli->prepare($sql);
    echo rawurldecode($_POST["flaga"]). rawurldecode($_POST["nominal"]). rawurldecode($_POST["kategoria"]). rawurldecode($_POST["stop"]). rawurldecode($_POST["rok"]). $_POST["id"];
    $stmt->bind_param('issiii', rawurldecode($_POST["flaga"]), rawurldecode($_POST["nominal"]), rawurldecode($_POST["kategoria"]), rawurldecode($_POST["stop"]), rawurldecode($_POST["rok"]), $_POST["id"]);
    $stmt->execute();
} else {
    $all = "Something went wrong";
}
if (isset($all)) {
    echo json_encode($all);
}
