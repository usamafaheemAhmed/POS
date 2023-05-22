<?php

include("./connect.php");


$sql = "SELECT * FROM `logins`";
$result =  mysqli_query($conn, $sql);

while($row = mysqli_fetch_array($result)) {

     if ($row["Email"]==$_POST["email"]){
        if($row["password"]==$_POST["password"]){
            echo "1";
            break;
        }
        else{
            echo "3";
        }
     }
     else{
        echo "2";
    }
      }

?>