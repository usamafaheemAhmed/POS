<?php
include("./connect.php");

$sql = "SELECT * FROM `menu` WHERE `Email` = '{$_GET['email']}'";
$result = mysqli_query($conn, $sql);

$menu_items = array();
while ($row = mysqli_fetch_assoc($result)) {
    array_push($menu_items, $row);
}


if (count($menu_items) > 0) {
    $data = json_encode($menu_items);
    echo $data;
} else {
    echo "2 Not Found any Menu";
}
?>
