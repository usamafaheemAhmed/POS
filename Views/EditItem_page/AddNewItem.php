<?php

include("../../PHP/connect.php");

// echo"<pre>";
// print_r($_POST);
// echo"</pre>";

$Name = $_POST["itemName"];
$Price = $_POST["itemPrice"];
$Code = $_POST["itemCode"];
$Category = $_POST["itemCategory"];
$Email = $_POST["email"];
$Owner_Fk = $_POST["Owner_Fk"];


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
        $sql = "INSERT INTO `menu` (`ItemCode`, `itemName`, `ItemPrice`, `category`, `ImgUrl`, `Email`, `Owner_Fk`)
        VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssisssi", $Code, $Name, $Price, $Category, $targetFilePath, $Email, $Owner_Fk);

        if ($stmt->execute()) {
            echo "Successfully Added and image uploaded";
        } else {
            echo "Failed to Add and upload image: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Failed to upload image";
    }


die;

?>