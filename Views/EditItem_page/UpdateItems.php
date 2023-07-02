<?php
// include("./connect.php");

// $Name = $_POST["name"];
// $Price = $_POST["Price"];
// $Code = $_POST["Code"];
// $OriginalCode = $_POST["OriginalCode"];


// // $sql = "INSERT INTO `logins` (`LoginID`, `Name`, `Email`, `password`, `Agreed`) VALUES ('', '{$name}', '{$email}', '{$password}', '{$agreeTerm}')"; 


// $sql = "UPDATE `menu` SET `ItemCode` = '{$Code}', `itemName` = '{$Name}', `ItemPrice` = '{$Price}' WHERE `ItemCode` = '{$OriginalCode}'";

// if ($conn->query($sql) === TRUE) {
//   echo "Successfully updated";
// } else {
//   echo "Failed to update: " . $conn->error;
// }

// // UPDATE `menu` SET `ItemPrice` = '250' WHERE `menu`.`id` = 1;




include("../../PHP/connect.php");

$Name = $_POST["name"];
$Price = $_POST["Price"];
$Code = $_POST["Code"];
$OriginalCode = $_POST["OriginalCode"];

$uploadedFile = $_FILES["image"];

// Check if a file was uploaded
if (!empty($uploadedFile) && $uploadedFile["error"] === UPLOAD_ERR_OK) {
  $tempFilePath = $uploadedFile["tmp_name"];
  $fileName = $uploadedFile["name"];
  $targetDirectory = "../Item_Images/";
  $targetFilePath = $targetDirectory . $fileName;

  // Move the uploaded file to the target directory
  if (move_uploaded_file($tempFilePath, $targetFilePath)) {
    // File uploaded successfully, proceed with the database update
    $sql = "UPDATE `menu` SET `ItemCode` = '{$Code}', `itemName` = '{$Name}', `ItemPrice` = '{$Price}', `ImgUrl` = '{$targetFilePath}' WHERE `ItemCode` = '{$OriginalCode}'";

    if ($conn->query($sql) === TRUE) {
      echo "Successfully updated and image uploaded";
    } else {
      echo "Failed to update and upload image: " . $conn->error;
    }
  } else {
    echo "Failed to upload image";
  }
} else {
  // No file uploaded or error occurred, proceed with the database update without the image
  $sql = "UPDATE `menu` SET `ItemCode` = '{$Name}', `itemName` = '{$Price}', `ItemPrice` = '{$Code}' WHERE `ItemCode` = '{$OriginalCode}'";

  if ($conn->query($sql) === TRUE) {
    echo "Successfully updated";
  } else {
    echo "Failed to update: " . $conn->error;
  }
}

$conn->close();





?>
