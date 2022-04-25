<?php
$odp = array(
    "status" => "null"
);

$time = time();
while (time() - $time < 10) {
    usleep(5000);
}
echo json_encode($odp);
?>