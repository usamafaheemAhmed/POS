<?php

include("./connecte.php");


$sql = "SELECT * FROM `logins`";
$result =  mysqli_query($conn, $sql);

while($row = mysqli_fetch_array($result)) {

     if ($row["Email"]==$_POST["Email"]){
      //   echo "2";
        echo "2 Email Already Exist";
        die;
     }
      }

      $name  = $_POST["Name"];
      $email = $_POST["Email"];
      $password  = $_POST["password"];
      $agreeTerm  = $_POST["agreeTerm"];
     
       $sql = "INSERT INTO `logins` (`LoginID`, `Name`, `Email`, `password`, `Agreed`) VALUES ('', '{$name}', '{$email}', '{$password}', '{$agreeTerm}')"; 
       $run = mysqli_query($conn,$sql) or die("Failed to run");
       echo $run." Successfully Submit";
      //  echo $run;

?>