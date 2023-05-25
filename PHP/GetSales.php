<?php
include("./connect.php");

$sql = "SELECT * FROM `sales` WHERE `Email` = '{$_GET['email']}'";
$result = mysqli_query($conn, $sql);

$sales_item = array();
while ($row = mysqli_fetch_assoc($result)) {
    array_push($sales_item, $row);
}


if (count($sales_item) > 0) {
    $data = json_encode($sales_item);
    echo $data;
} else {
    echo "2 Not Found any sales";
}
?>
