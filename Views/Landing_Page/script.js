let ListOfItems ;

var r = document.querySelector(':root');
let height = $(window).height()+"px";
r.style.setProperty('--height', height);


window.onload = () => {
    

//    let email =  sessionStorage.getItem("email");
   let email =  "usamafaheem80@gmail.com";

    // alert(email);
    let data = {
        email: email,
    }

    $.ajax({
        
        url: "../../PHP/GetMenu.php",
        method:"GET",
        data: data,
        success: function (res) {
            // console.log(res);
            let resData = JSON.parse(res);
            console.log(resData);
            ListOfItems=resData;
            // alert(res);
            display();

        }        
    });





};




let clicked =1;
function openNav() {
let hide = document.getElementsByName("hide");
let icon = document.getElementsByName("icon");
let iconLength = document.getElementsByName("icon").length;
// console.log(iconLength);
let length = document.getElementsByName("hide").length;

// console.log(hide);
if(clicked===1){
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.paddingLeft = "250px";
    document.body.style.backgroundColor = "#4c6677";
    clicked=0;
    document.getElementById("nav-icon1").classList.add('open');
    document.getElementById("profileImage").style.width="130px";
    document.getElementById("profileImage").style.height="130px";
    document.getElementById("image_span").style.top="30px";
    document.getElementById("image_span").style.left="50px";
    document.getElementById("divider").style.marginTop="150px";
    for(let i=0; i<length;i++){
      hide[i].style.display="inline-flex";
    };
    for(let i=0; i<iconLength;i++){
      // alert("jon");
      icon[i].style.marginLeft="25px";
      // icon[i].style.display="inline-flex";
      icon[i].style.opacity="100%";
      
    };

    setTimeout( function() { document.getElementById("name").classList.remove('d-none'); },430);
   
  }
  else{
    document.getElementById("mySidenav").style.width = "65px";
    document.getElementById("main").style.paddingLeft= "65px";
    document.body.style.backgroundColor = "lightskyblue";
    clicked=1;
    document.getElementById("nav-icon1").classList.remove('open');
    document.getElementById("name").classList.add('d-none');
    document.getElementById("profileImage").style.width="40px";
    document.getElementById("profileImage").style.height="40px";
    document.getElementById("image_span").style.top="0px";
    document.getElementById("image_span").style.left="13px";
    document.getElementById("divider").style.marginTop="0px";
    for(let i=0; i<length;i++){
      hide[i].style.display="none";
    };
    for(let i=0; i<iconLength;i++){
      icon[i].style.marginLeft="0px";
      // icon[i].style.display="none";
      icon[i].style.opacity="0";

    };

}
}

// function display(){
//   let length = ListOfItems.length;
//   // alert(length);



//   for (let i = 0; i < ListOfItems.length; i++) {
//     let card = document.createElement("div");
//     card.classList.add("card");
//     card.classList.add("text-left");
//     card.classList.add("itemCards");
//     card.classList.add("slide-in-bottom");
//     // card.addEventListener("click",AddToCart);
//     card.addEventListener("click", function() {
//       // Call the AddToCart function with the parameters
//       AddToCart(ListOfItems[i].itemName, ListOfItems[i].ItemPrice, ListOfItems[i].ImgUrl, ListOfItems[i].ItemCode);
//     });

//     let cardBody = document.createElement("div");
//     cardBody.classList.add("card-body");
//     cardBody.classList.add("pt-1");
//     cardBody.classList.add("pb-0");

//     let row = document.createElement("div");
//     row.classList.add("row");
//     cardBody.appendChild(row);
    
//     let col5 = document.createElement("div");
//     col5.classList.add("col-md-5");
//     col5.classList.add("p-0");
//     col5.classList.add("m-0");
//     row.appendChild(col5);


//     let img = document.createElement("img");
//     img.classList.add("roundedItem");
//     img.src=ListOfItems[i].ImgUrl;
//     col5.appendChild(img);



//     let col7 = document.createElement("div");
//     col7.classList.add("col-md-7");
//     row.appendChild(col7);

//     let h4 = document.createElement("h4");
//     h4.classList.add("card-title");
//     h4.textContent=ListOfItems[i].itemName;
//     col7.appendChild(h4);


//     let p = document.createElement("p");
//     p.classList.add("card-text");
//     p.textContent=ListOfItems[i].ItemPrice+"-/Rs";
//     col7.appendChild(p);

//     card.appendChild(cardBody);



//     let container = document.getElementById("ItemsDisplay");
//     container.appendChild(card);
//   }
// }
function display() {
  let length = ListOfItems.length;

  for (let i = 0; i < ListOfItems.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card");

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("card-img-container");
    card.appendChild(imgContainer);

    let img = document.createElement("img");
    img.classList.add("card-img");
    img.src = ListOfItems[i].ImgUrl;
    imgContainer.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    let h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.textContent = ListOfItems[i].itemName;
    cardBody.appendChild(h5);

    let p = document.createElement("p");
    p.classList.add("card-text");
    p.textContent = ListOfItems[i].ItemPrice + "/Rs";
    cardBody.appendChild(p);

    // Add event listener to the card
    card.addEventListener("click", function() {
      AddToCart(ListOfItems[i].itemName, ListOfItems[i].ItemPrice, ListOfItems[i].ImgUrl, ListOfItems[i].ItemCode);
    });

    let container = document.getElementById("ItemsDisplay");
    container.appendChild(card);
  }
}

let CartItemNumber = 0;
let buyArray = [];
let totalPrice = 0;

function AddToCart(name,price,url,code){
  // alert(name+" "+price+" "+url);

  let existingItem = buyArray.find(item => item.itemName === name);
  if (existingItem) {
    // Item already exists in cart, update price and quantity
    existingItem.ItemPrice += parseFloat(price);
    existingItem.itemQuantity +=  1 ;

    totalPrice = totalPrice+parseFloat(price);
    document.getElementById("totalPrice").value = totalPrice+"-/Rp";

    const card = document.getElementById(`card-${existingItem.itemId}`);
    incrementCardQuantity(card);

    return false;
  }

  let add={
    itemId: CartItemNumber,
    itemName:name,
    ItemPrice:parseFloat(price),
    ItemCode:code,
    itemQuantity:1,
  }

  buyArray.push(add);

  totalPrice = totalPrice+parseFloat(price);

  document.getElementById("totalPrice").value = totalPrice+"-/Rp";


  let card = document.createElement("div");
  // card text-left BuyItemCards
  card.classList.add("card");
  card.classList.add("text-left");
  card.classList.add("BuyItemCards");
  card.classList.add("slide-in-right");
  card.setAttribute("id", "card-" + CartItemNumber);


  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.classList.add("pt-1");
  cardBody.classList.add("pb-0");

  let row = document.createElement("div");
  row.classList.add("row");
  cardBody.appendChild(row);
  
  let col2 = document.createElement("div");
  col2.classList.add("col-md-2");
  col2.classList.add("p-0");
  col2.classList.add("m-0");
  row.appendChild(col2);


  let img = document.createElement("img");
  img.classList.add("roundedbuy");
  img.src=url;
  col2.appendChild(img);



  let col5 = document.createElement("div");
  col5.classList.add("col-md-5");
  row.appendChild(col5);

  let h4 = document.createElement("h4");
  h4.classList.add("card-title");
  h4.textContent=name;
  col5.appendChild(h4);


  let p = document.createElement("p");
  p.classList.add("card-text");
  p.textContent=price+"-/Rs";
  col5.appendChild(p);

  let newCol5 = document.createElement("div");
  newCol5.classList.add("col-md-5");
  row.appendChild(newCol5);

  let i = document.createElement("i");
  i.classList.add("fa-solid");
  i.classList.add("fa-xmark");
  i.classList.add("float-right");
  i.classList.add("my-1");
  i.setAttribute("id", "card-" + CartItemNumber);

  i.addEventListener("click", function() {
    // Call the AddToCart function with the parameters
    remove(this.id);
  });
  newCol5.appendChild(i);


  let input_group = document.createElement("div");
  input_group.classList.add("input-group");
  newCol5.appendChild(input_group);

  let input_group_prepend = document.createElement("div");
  input_group_prepend.classList.add("input-group-prepend");
  input_group_prepend.setAttribute("id", CartItemNumber);

  input_group_prepend.addEventListener("click", function() {
    // Call the AddToCart function with the parameters
    Minus(this.id);
  });
  input_group.appendChild(input_group_prepend);



  let input_group_text = document.createElement("span");
  input_group_text.classList.add("input-group-text");
  input_group_text.innerHTML="<i class='fa-sm fa-solid fa-minus slide-bck-left'></i>";
  input_group_prepend.appendChild(input_group_text);

  let input = document.createElement("input");
  input.classList.add("form-control");
  input.type="text";
  input.value="1";
  input.setAttribute("id", "input_" + CartItemNumber);
  input_group.appendChild(input);

  let input_group_append= document.createElement("div");
  input_group_append.classList.add("input-group-append");
  input_group_append.setAttribute("id", CartItemNumber);
  input_group_append.addEventListener("click", function() {
    // Call the AddToCart function with the parameters
    Plus(this.id);
  });
  input_group.appendChild(input_group_append);

  let input_group_text2 = document.createElement("span");
  input_group_text2.classList.add("input-group-text");
  input_group_text2.innerHTML="<i class='fa-sm fa-solid fa-plus slide-bck-left'></i>";
  input_group_append.appendChild(input_group_text2);



  card.appendChild(cardBody);



  let container = document.getElementById("buyBoxes");
  container.appendChild(card);

  ++CartItemNumber;
}




function remove(cardID) {
  // Extract the itemId from the cardID
  let itemId = parseInt(cardID.split("-")[1]);

  // Find the index of the item with the matching itemId
  let index = buyArray.findIndex(item => item.itemId === itemId);

  if (index !== -1) {
    // Remove the item from the buyArray
    let removedItem = buyArray.splice(index, 1)[0];

    // Update the total price
    totalPrice -= parseFloat(removedItem.ItemPrice);

    // Update the total price element
    document.getElementById("totalPrice").value = totalPrice + "-/Rp";

    // Remove the card from the DOM
    let card = document.getElementById(cardID);
    card.classList.add("slide-in-right");
    card.classList.add("slide-out-right");

    setTimeout(() => {
      let container = document.getElementById("buyBoxes");
      container.removeChild(card);
    }, 700);

    // Update the CartItemNumber
    --CartItemNumber;
  }
}


function Minus(id){
  // id="input-1"
  // alert(id);



 let min = document.getElementById("input_" +id).value; 
 if (min==1||min<=0){
  let removeConfirm = confirm("This will remove item from cart");
  // console.warn(removeConfirm);
  if(removeConfirm){
    remove("card-" + id);
  }
 }
 else{

   let existingItem = buyArray.find(item => item.itemId === parseFloat(id));
   if (existingItem) {
 
     totalPrice = totalPrice-(parseFloat(existingItem.ItemPrice)/parseFloat(existingItem.itemQuantity));
     document.getElementById("totalPrice").value = totalPrice+"-/Rp";
 
     // Item already exists in cart, update price and quantity
     existingItem.ItemPrice -= (parseFloat(existingItem.ItemPrice)/parseFloat(existingItem.itemQuantity));
     existingItem.itemQuantity -=  1 ;
 
 
     const card = document.getElementById(`card-${existingItem.itemId}`);
     decrementCardQuantity(card);

     document.getElementById("input_" + id).value = existingItem.itemQuantity;
 
   }
 }

//  alert(min);

}

function Plus(PlusID) {
  
  // alert(PlusID)
  // console.log(buyArray);

  let existingItem = buyArray.find(item => item.itemId === parseFloat(PlusID));
  // console.log(existingItem);

  if (existingItem) {
    existingItem.ItemPrice += (parseFloat(existingItem.ItemPrice) / parseFloat(existingItem.itemQuantity));
    existingItem.itemQuantity += 1;
    totalPrice += (parseFloat(existingItem.ItemPrice) / parseFloat(existingItem.itemQuantity));
    document.getElementById("totalPrice").value = totalPrice + "-/Rp";
    ++document.getElementById("input_" + PlusID).value;
  }

}

function incrementCardQuantity(card) {
  const inputElement = card.querySelector('input');
  const currentValue = parseInt(inputElement.value);
  inputElement.value = currentValue + 1;
}

function decrementCardQuantity(card) {
  const inputElement = card.querySelector('input');
  const currentValue = parseInt(inputElement.value);
  inputElement.value = currentValue - 1;
}


function search(value){

  let length = ListOfItems.length;
  // alert(length);

  let searchTerm = value.toLowerCase()

  let container = document.getElementById("ItemsDisplay");

// Get all the cards in the container
let cards = container.querySelectorAll(".card");

// Loop through all the cards and show/hide them based on whether their item name contains the search term
for (let i = 0; i < cards.length; i++) {
  let itemName = cards[i].querySelector(".card-title").textContent.toLowerCase();
  if (itemName.indexOf(searchTerm) === -1) {
    cards[i].style.display = "none";
  } else {
    cards[i].style.display = "block";
  }
}



}

function sellConfirm(){
  console.log(buyArray);
 
    let OrderId = generateOrderID() ;

    document.getElementById("OrderId").innerHTML=OrderId;
    document.getElementById("OrderId2").innerHTML=OrderId;
    const currentDate = new Date();
    const date = currentDate.getDate();
    const day = currentDate.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
    // alert(day);
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const year = currentDate.getFullYear();
    const min = currentDate.getMinutes();
    const hours = currentDate.getHours();
    document.getElementById("Date").innerHTML= day+" "+date+"/"+month+"/"+year+" "+hours+":"+min;
    document.getElementById("Date2").innerHTML= day+" "+date+"/"+month+"/"+year+" "+hours+":"+min;


    // Assuming you have a table with id "salesTable"
const salesTable = document.getElementById("ReceiptTable");
const salesTable2 = document.getElementById("ReceiptTable2");

// Remove all existing rows from the table
while (salesTable.rows.length > 0) {
  salesTable.deleteRow(0);
  salesTable2.deleteRow(0);
}

let GrandTotal=0;
// Loop through the buyArray and add rows to the table
for (let i = 0; i < buyArray.length; i++) {
  const item = buyArray[i];

  // Create a new row
  const newRow = salesTable.insertRow();
  const newRow2 = salesTable2.insertRow();

  // Insert cells into the row
  const itemNameCell = newRow.insertCell();
  const unitPriceCell = newRow.insertCell();
  const quantityCell = newRow.insertCell();
  const totalBillCell = newRow.insertCell();

  const itemNameCell2 = newRow2.insertCell();
  const unitPriceCell2 = newRow2.insertCell();
  const quantityCell2 = newRow2.insertCell();
  const totalBillCell2 = newRow2.insertCell();

  // Set the cell values based on the item data
  itemNameCell.textContent = item.itemName;
  unitPriceCell.textContent = item.ItemPrice/item.itemQuantity;// need work
  quantityCell.textContent = item.itemQuantity;
  totalBillCell.textContent = item.ItemPrice;

  itemNameCell2.textContent = item.itemName;
  unitPriceCell2.textContent = item.ItemPrice/item.itemQuantity;// need work
  quantityCell2.textContent = item.itemQuantity;
  totalBillCell2.textContent = item.ItemPrice;

  GrandTotal += item.ItemPrice;

}

document.getElementById("OrderTotal").innerHTML=GrandTotal;
document.getElementById("OrderTotal2").innerHTML=GrandTotal;

// printDiv();

  // Print the desired div
  $("[data-toggle = modal]").trigger({ type: "click" });
}

const generateOrderID = () => {
  // const ItemCode = ItemCode;
  const currentDate = new Date();
  const date = currentDate.getDate();
  const day = currentDate.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
  // alert(day);
  // const month = currentDate.getMonth() + 1; // Months are zero-based
  // const year = currentDate.getFullYear();
  const seconds = currentDate.getSeconds();
  const hours = currentDate.getHours();

  return day + date + hours + seconds;
};

function Confirm(){
  $("[data-toggle = modal]").trigger({ type: "click" });


  $.ajax({
    url: "../../PHP/SendSales.php",
    method:"POST",
    data: {buyArray: buyArray},
    success: function (res) {
      alert("Ok saved \n"+res);
    }
  
  
  });




  printDiv();

}


function printDiv() {
  const printDiv = document.getElementById("Print");

  // Hide unwanted content on the page
  const elementsToHide = document.querySelectorAll("body > :not(#Print)");
  elementsToHide.forEach((element) => {
    element.style.display = "none";
  });

  // Print the desired div
  printDiv.style.display = "block";

  // Print the page
  window.print();


  // Restore the original display styles
  elementsToHide.forEach((element) => {
    element.style.display = "";
  });
  printDiv.style.display = "";

  buyArray = [];
  
  // Remove all cards from the buyBoxes container except for the first card
  const buyBoxes = document.getElementById("buyBoxes");
  const cards = buyBoxes.getElementsByClassName("card");
  while (cards.length > 1) {
    buyBoxes.removeChild(cards[1]);
  }
  totalPrice = 0;
  document.getElementById("totalPrice").value = totalPrice+"-/Rp";
}
