<?php


$BuyArray = $_POST["buyArray"];
$BuyLength = count($BuyArray);


for($i=0; $i<$BuyLength;$i++){



$sales = $BuyArray[$i];


echo $sales["itemId"];
echo $sales["itemName"];
echo $sales["ItemPrice"];
echo $sales["itemQuantity"];
echo $sales["ItemCode"];



}



// let add={
//     itemId: CartItemNumber,
//     itemName:name,
//     ItemPrice:parseFloat(price),
//     ItemCode:code,
//     itemQuantity:1,
//   }







?>