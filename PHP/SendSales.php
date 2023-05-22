<?php
include("./connect.php");

$SalesArray = $_POST["buyArray"];
$OrderId = $_POST["OrderId"];

// Get the current date and time
$currentDate = date("Y-m-d"); // Format: DD-MM-YYYY
$currentTime = date("H:i:s"); // Format: HH:MM:SS

$Email = $_POST["Email"];

$loop = 0;

$stmt = $conn->prepare("INSERT INTO sales (Sales_ID, OrderID, itemName, ItemCode, Quantity, date, time, ItemPrice, Email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

if (!$stmt) {
  die("Error in preparing the statement: " . $conn->error);
}

foreach ($SalesArray as $sales) {
  $Sales_ID = '';
  $result = $stmt->bind_param("ssssissis", $Sales_ID, $OrderId, $sales["itemName"], $sales["ItemCode"], $sales["itemQuantity"], $currentDate, $currentTime, $sales["ItemPrice"], $Email);

  if (!$result) {
    die("Error in binding the parameters: " . $stmt->error);
  }

  $result = $stmt->execute();

  if (!$result) {
    die("Error in executing the statement: " . $stmt->error);
  }

  $loop += 1;
}

if ($loop === count($SalesArray)) {
  echo "Successfully submitted all sales data.";
} else {
  echo "Failed to submit some sales data.";
}

$stmt->close();
$conn->close();
?>
