<?php
include("./connect.php");

$SalesArray = $_POST["buyArray"];
$OrderId = $_POST["OrderId"];

$Owner_Fk = $_POST["Owner_Fk"];

$Customer_Name = $_POST["Customer_Name"];
$Customer_Phone = $_POST["Customer_Phone"];
$Customer_Address = $_POST["Customer_Address"];
$Customer_Souses = $_POST["Customer_Souses"];
$tableNumber = $_POST["tableNumber"];
if(!empty($Customer_Souses)){

  $Customer_Souses = json_encode($Customer_Souses);
}

$existingCustomerId = 'null';

if (!empty($Customer_Name)) {
// Assuming $conn is your database connection
$existingCustomerId = null;

// echo "Customer_Name: $Customer_Name, Customer_Phone: $Customer_Phone, Customer_Address: $Customer_Address, Owner_FK: $Owner_Fk \n";


// Check if the customer already exists
$checkQuery = $conn->prepare("SELECT Customer_ID FROM customer WHERE Customer_Name = ? AND Customer_Phone = ? AND Customer_Address = ? AND Owner_FK = ?");
$checkQuery->bind_param("sssi", $Customer_Name, $Customer_Phone, $Customer_Address ,$Owner_Fk);
$checkQuery->execute();
$checkQuery->bind_result($existingCustomerId);
$checkQuery->fetch();
$checkQuery->close();


// echo "aya";
// if ($existingCustomerId !== null) {
//     echo $existingCustomerId;
// } else {
//     echo "No matching record found.";
// }
// echo "\n";


if ($existingCustomerId) {
    // Customer already exists, use the existing ID
    // echo "Customer already exists with ID: $existingCustomerId";
    $lastInsertedID = $existingCustomerId ;

} else {


    $stmt = $conn->prepare("INSERT INTO customer (Customer_Name, Customer_Phone, Customer_Address, Owner_Fk) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $Customer_Name, $Customer_Phone, $Customer_Address, $Owner_Fk);
    $stmt->execute();
    $newCustomerId = $stmt->insert_id; // Get the ID of the newly inserted customer
    $stmt->close();
    $lastInsertedID = mysqli_insert_id($conn);


    $lastInsertedID = mysqli_insert_id($conn);
    // echo "New customer inserted with ID: $newCustomerId";
}

}

// $lastInsertedID = mysqli_insert_id($conn) || "null";

// echo $lastInsertedID;




// Get the current date and time
$currentDate = date("Y-m-d"); // Format: DD-MM-YYYY
$currentTime = date("H:i:s"); // Format: HH:MM:SS

$Email = $_POST["Email"];

$loop = 0;

$stmt = $conn->prepare("INSERT INTO sales (Sales_ID, OrderID, itemName, ItemCode, Quantity, date, time, ItemPrice, Email, Owner_Fk, Customer_Fk, Souses, tableNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

if (!$stmt) {
  die("Error in preparing the statement: " . $conn->error);
}

foreach ($SalesArray as $sales) {
  $Sales_ID = null;
  $result = $stmt->bind_param("ssssissisiisi", $Sales_ID, $OrderId, $sales["itemName"], $sales["ItemCode"], $sales["itemQuantity"], $currentDate, $currentTime, $sales["ItemPrice"], $Email, $Owner_Fk, $lastInsertedID, $Customer_Souses, $tableNumber);

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
