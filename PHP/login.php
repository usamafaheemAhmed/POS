<?php

include("./connect.php");

$email = $_POST["email"];
$password = $_POST["password"];

// Use a prepared statement to prevent SQL injection
$sql = "SELECT * FROM `logins` WHERE `Email` = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

$response = array();

// Check if the user exists with the provided email
if ($row = $result->fetch_assoc()) {
    // User found, now check the password
    if ($password === $row["password"]) {
        $response["status"] = "1";
        $response["id"] = $row["LoginID"];
        echo json_encode($response);
    } else {
        // Incorrect password
        $response["status"] = "3";
        echo json_encode($response);
    }
} else {
    // User not found with the provided email
    $response["status"] = "2";
    echo json_encode($response);
}

$stmt->close();
$conn->close();

?>
