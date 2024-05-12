<?php

include("../../PHP/connect.php");

$Name = $_POST["itemName"];
$Price = $_POST["itemPrice"];
$Code = $_POST["itemCode"];
$Category = $_POST["itemCategory"];
$OriginalCode = $_POST["OriginalCode"];



// echo"<pre>";
// print_r($_POST);
// echo"</pre>";




// die;

// Check if a file was uploaded
if (isset($_FILES["image"])) {
    
    $uploadedFile = $_FILES["image"];

    // echo"<pre>";
    // print_r($uploadedFile);
    // echo"</pre>";

    $tempFilePath = $uploadedFile["tmp_name"];
    $fileName = basename($uploadedFile["name"]);
    $targetDirectory = "../Item_Images/";
    $targetFilePath = $targetDirectory . $fileName;

    // Move the uploaded file to the target directory
    if (move_uploaded_file($tempFilePath, $targetFilePath)) {
        // File uploaded successfully, proceed with the database update using prepared statement
        $sql = "UPDATE `menu` SET `ItemCode` = ?, `itemName` = ?, `ItemPrice` = ?, `category` = ?, `ImgUrl` = ? WHERE `ItemCode` = ?";
        // echo "Code: $Code, Name: $Name, Price: $Price, Category: $Category, TargetFilePath: $targetFilePath, OriginalCode: $OriginalCode \n";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssisss", $Code, $Name, $Price, $Category, $targetFilePath, $OriginalCode);

        if ($stmt->execute()) {
            echo "Successfully updated and image uploaded";
        } else {
            echo "Failed to update and upload image: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Failed to upload image";
    }
} else {
    // No file uploaded or error occurred, proceed with the database update without the image
    $sql = "UPDATE `menu` SET `ItemCode` = ?, `itemName` = ?, `ItemPrice` = ?, `category` = ? WHERE `ItemCode` = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssiss", $Code, $Name, $Price, $Category, $OriginalCode);

    if ($stmt->execute()) {
        echo "Successfully updated";
    } else {
        echo "Failed to update: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
