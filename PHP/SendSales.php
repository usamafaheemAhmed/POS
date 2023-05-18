<?php

include("./connecte.php");
// $BuyArray = $_POST["buyArray"];
// $BuyLength = count($BuyArray);


// for($i=0; $i<$BuyLength;$i++){



// $sales = $BuyArray[$i];


// echo $sales["itemId"];
// echo $sales["itemName"];
// echo $sales["ItemPrice"];
// echo $sales["itemQuantity"];
// echo $sales["ItemCode"];



// }


// Your database connection code here

$BuyArray = $_POST["buyArray"];
$BuyLength = count($BuyArray);

// Prepare the INSERT statement
// $sql = "INSERT INTO sales (itemId, itemName, ItemPrice, itemQuantity, ItemCode) VALUES (?, ?, ?, ?, ?)";
// $stmt = $mysqli->prepare($sql);

// Bind parameters and execute the statement for each item in the buyArray
foreach ($BuyArray as $sales) {
//   $stmt->bind_param("ssdss", $sales["itemId"], $sales["itemName"], $sales["ItemPrice"], $sales["itemQuantity"], $sales["ItemCode"]);
//   $stmt->execute();
$sql = "INSERT INTO `menu` (`Sales_ID`, `itemName`, `Quantity`, `date`,  `time`,`ItemTotal`) VALUES (NULL, '{$sales["itemName"]}', '{$sales["ItemPrice"]}', '{$sales["itemName"]}', '{$sales["ItemPrice"]}');";
$result = mysqli_query($conn, $sql);
}

// Check if the insertion was successful
if ($stmt->affected_rows > 0) {
  // Prepare the response
  $response = array(
    'status' => 'success',
    'message' => 'Data stored successfully.'
  );
} else {
  // Prepare the response
  $response = array(
    'status' => 'error',
    'message' => 'Failed to store data.'
  );
}

// Close the statement and database connection
$stmt->close();
$mysqli->close();

// Send the response back to JavaScript
echo json_encode($response);



?>