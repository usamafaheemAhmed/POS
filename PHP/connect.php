<?php
$servername = "localhost";
$username = "root";
$password = "";
$db="pos_database";

// $servername = "localhost";
// $username = "id20735726_admin";
// $password = "Usama334422@";
// $db="id20735726_pos_database";


// Create connection
$conn = mysqli_connect($servername, $username, $password,$db);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
// else{
//   echo"successFull";
// }

?>