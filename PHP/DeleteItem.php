<?php
include("./connect.php");

$Code = $_POST["OriginalCode"];

$sql = "UPDATE `menu` SET `isDeleted` = 1 WHERE `ItemCode` = '{$Code}'";

if ($conn->query($sql) === TRUE) {
  echo "Successfully soft deleted";
} else {
  echo "Failed to soft delete: " . $conn->error;
}

$conn->close();
?>