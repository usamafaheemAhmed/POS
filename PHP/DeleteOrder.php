<?php
include("./connect.php");

$orderId = $_POST['OrderID'];

$sql = "DELETE FROM `sales` WHERE `OrderID` = '$orderId'";
$result = mysqli_query($conn, $sql);

if ($result) {
  $count = mysqli_affected_rows($conn);
  echo $count . " row(s) deleted successfully";
} else {
  echo "Error deleting rows: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
