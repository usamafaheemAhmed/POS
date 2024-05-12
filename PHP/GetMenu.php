<?php
include("./connect.php");


// echo $_GET['Owner_Fk'];

$sql = "SELECT * FROM `menu` WHERE `Email` = '{$_GET['email']}' AND `Owner_Fk` = '{$_GET['Owner_Fk']}'";
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
