let ListOfItems ;

var r = document.querySelector(':root');
let height = $(window).height()+"px";
let height2 =  $(window).height()- 100   +"px";
r.style.setProperty('--height', height);
r.style.setProperty('--height2', height2);

// alert(height2)

window.onload = () => {
    

   let email =  sessionStorage.getItem("email")||"usamafaheem80@gmail.com";
   let Owner_Fk =  sessionStorage.getItem("Login_id")||"87262";
  // let email = "usamafaheem80@gmail.com";
  

    // alert(Owner_Fk);
    let data = {
        email: email,
        Owner_Fk: Owner_Fk
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
          display(ListOfItems);
          createMenuCard();
          Category()
          display_codes()
        }        
    });

};

function display_codes() {
  let forCodePrint = ListOfItems;

  forCodePrint.map((elem, index) => {
    let box = document.createElement('div');
    box.classList.add('SearchDropDown', 'px-2');
    box.innerHTML = elem.ItemCode;
  
    // Use a closure to capture the correct value of elem
    box.addEventListener('click', (function(itemCode) {
      return function() {
        storeInSearch(itemCode);
      };
    })(elem.ItemCode));
  
    document.getElementById('Display_ItemCode').append(box);
  });
  
}

function showDropDown(value) {
  let searchTerm = value.toLowerCase();
  let container = document.getElementById("Display_ItemCode");
  let cards = container.querySelectorAll(".SearchDropDown");

  for (let i = 0; i < cards.length; i++) {
    let innerContent = cards[i].textContent.toLowerCase();
    if (innerContent.includes(searchTerm)) {
      cards[i].style.display = "block";
    } else {
      cards[i].style.display = "none";
    }
  }

  // Show or hide the main container based on whether any matching items were found
  container.classList.toggle('d-none', !Array.from(cards).some(card => card.style.display === 'block'));
}

function storeInSearch(value) {
  // alert(value)
  document.getElementById('search').value = value;
  search(value);
}


function ShowTable() {
  document.getElementById("TableInput").classList.toggle('d-none');
  document.getElementById("tableNum").classList.toggle('d-none');
}

function ShowCustomer_Info() {
  var elements = document.getElementsByClassName("Customer_Info");

  // Loop through each element and toggle the 'd-none' class
  for (var i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('d-none');
  }
  // document.getElementById("tableNum").classList.toggle('d-none');
}

function Category() {

  let categorizedItems = new Set(ListOfItems.map(item => item.category));


  // console.log(categorizedItems);
  let categoriesContainer = document.getElementById('Categories'); // Replace 'categories-container' with the actual ID of your container

  // Loop through each category and create HTML elements
  categorizedItems.forEach(category => {

      let categoryElement = document.createElement('span');
      categoryElement.textContent = category;
    
      // categoryElement.textContent = category;
      categoryElement.classList.add('shadow-drop-2-lr');
      categoryElement.id = category;
      categoryElement.onclick = function() {
          search2(this.id);
      };
  
      categoriesContainer.appendChild(categoryElement);
  });

  let categoryElement = document.createElement('span');
  categoryElement.textContent = "All";

  // categoryElement.textContent = category;
  categoryElement.classList.add('shadow-drop-2-lr');
  categoryElement.id = "";
  categoryElement.onclick = function() {search2(this.id);};
  categoriesContainer.appendChild(categoryElement);


  
}

function search2(Value) {
  // alert(Value);
  document.getElementById('ItemsDisplay').innerHTML="";
  if (Value) {    
    let new_Array = ListOfItems;
    // Filter the array based on the selected category
    let filteredArray = new_Array.filter(obj => obj.category === Value);
  
    display(filteredArray)
  }
  else {
    // console.log("empty")
    display(ListOfItems)
  }

}

function openNav() {
  document.getElementById("mySidenav").style.width = "80px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
 
}

function display(GivenArray) {

  for (let i = 0; i < GivenArray.length; i++) {
    // Create the card element
    var card = document.createElement('div');
    card.classList.add('card', 'text-left', 'itemCards');

    // Create the card image
    var image = document.createElement('img');
    image.classList.add('card-img-top');
    image.src = GivenArray[i].ImgUrl;
    // image.alt = 'Card Image';
    image.alt = GivenArray[i].ImgUrl;
    card.appendChild(image);

    // Create the card body
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'text-center');

    // Create the card title
    var title = document.createElement('h4');
    title.classList.add('card-title','footer');
    title.textContent = GivenArray[i].itemName;
    cardBody.appendChild(title);

    
    // Create the card category
    var category = document.createElement('p');
    category.classList.add('text-muted');
    category.textContent = GivenArray[i].category;
    cardBody.appendChild(category);


    // Create the card price
    var price = document.createElement('p');
    price.classList.add('card-text');
    price.textContent = GivenArray[i].ItemPrice + '-/Rs';
    cardBody.appendChild(price);

    card.appendChild(cardBody);

    // Add event listener to the card
    card.addEventListener('click', function() {
      AddToCart(GivenArray[i].itemName, GivenArray[i].ItemPrice, GivenArray[i].ImgUrl, GivenArray[i].ItemCode);
    });

    let container = document.getElementById('ItemsDisplay');
    container.appendChild(card);
  }
}
function createMenuCard() {
  // Create the outer card container
  for (let i = 0; i < ListOfItems.length; i++) {
    
    const card = document.createElement("div");
    card.classList.add("card", "text-left", "mobileitemCards");

    // Create the row container
    const row = document.createElement("div");
    row.classList.add("row", "px-3");
    card.appendChild(row);

    // Create the card image
    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = ListOfItems[i].ImgUrl;
    img.alt = ListOfItems[i].ImgUrl;
    row.appendChild(img);

    // Create the card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center");
    row.appendChild(cardBody);

    // Create the card title
    const h4 = document.createElement("h4");
    h4.classList.add("card-title");
    h4.textContent = ListOfItems[i].itemName;
    cardBody.appendChild(h4);

    // Create the card price
    const p = document.createElement("p");
    p.classList.add("card-text");
    p.textContent = ListOfItems[i].ItemPrice + "/-Rs";
    cardBody.appendChild(p);

    card.addEventListener('click', function() {
      AddToList(ListOfItems[i].itemName, ListOfItems[i].ItemPrice, ListOfItems[i].ItemCode);
    });

    let container = document.getElementById('mobilebox');
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
    document.getElementById("totalPrice").innerHTML = totalPrice+"-/Rs";

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

  document.getElementById("totalPrice").innerHTML = totalPrice+"-/Rs";


  let card = document.createElement("div");
  // card text-left BuyItemCards
  card.classList.add("card","text-left","BuyItemCards","slide-in-right");
  card.setAttribute("id", "card-" + CartItemNumber);


  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body","pt-1","pb-0");

  let row = document.createElement("div");
  row.classList.add("row");
  cardBody.appendChild(row);
  
  let col2 = document.createElement("div");
  col2.classList.add("col-md-2","p-0","m-0");
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
  i.classList.add("fa-solid","fa-xmark","float-right","my-1");
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
  input.disabled = true;
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
function AddToList(name, price, code) {
  let existingItem = buyArray.find(item => item.ItemCode === code);

  if (existingItem) {
    // Item already exists in the list, update the quantity
    existingItem.ItemPrice += parseFloat(price);
    existingItem.itemQuantity += 1;

    updateBuyListQuantity(existingItem.itemId, existingItem.itemQuantity);

    // Update total price
    totalPrice += parseFloat(price);
    document.getElementById("MobileTotalePrice").value = totalPrice + "-/Rs";

    return;
  }

  let listItem = document.createElement("li");
  listItem.setAttribute("id", "listItem-" + CartItemNumber);
  
  let quantitySpan = document.createElement("span");
  quantitySpan.textContent = "1 -";

  let nameSpan = document.createElement("span");
  nameSpan.textContent = name + " - ";

  let priceSpan = document.createElement("span");
  priceSpan.textContent = price + "/-Rs";

  let crossButton = document.createElement("span");
  crossButton.classList.add("fa", "fa-xmark", "float-right");

  // Add click event listener to the cross button
  crossButton.addEventListener("click", function() {
    removeItemFromBuyList(listItem, code);
  });

  listItem.appendChild(nameSpan);
  listItem.appendChild(quantitySpan);
  listItem.appendChild(priceSpan);
  listItem.appendChild(crossButton);

  let buyList = document.getElementById("buyList");
  buyList.appendChild(listItem);

  // Update buyArray
  let add = {
    itemId: CartItemNumber,
    itemName: name,
    ItemPrice: parseFloat(price),
    ItemCode: code,
    itemQuantity: 1,
  }
  buyArray.push(add);

  // Update total price
  totalPrice += parseFloat(price);
  document.getElementById("MobileTotalePrice").value = totalPrice + "-/Rs";

  ++CartItemNumber;
}

function updateBuyListQuantity(itemId, quantity) {
  let listItem = document.getElementById("listItem-" + itemId);
  let quantitySpan = listItem.querySelector("span:nth-child(2)");
  quantitySpan.textContent = quantity + "-";
}

function removeItemFromBuyList(listItem, code) {
  // Remove the item from buyArray
  let index = buyArray.findIndex(item => item.ItemCode === code);
  if (index !== -1) {
    let removedItem = buyArray.splice(index, 1)[0];
    // alert(removedItem.ItemPrice);
    totalPrice = totalPrice - (removedItem.ItemPrice);
    document.getElementById("MobileTotalePrice").value = totalPrice + "-/Rs";
  }

  // Remove the list item from the buyList
  listItem.remove();
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
    document.getElementById("totalPrice").innerHTML = totalPrice + "-/Rs";

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
     document.getElementById("totalPrice").innerHTML = totalPrice+"-/Rs";
 
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
    document.getElementById("totalPrice").innerHTML = totalPrice + "-/Rs";
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
  document.getElementById("Display_ItemCode").classList.add("d-none");
  document.getElementById('ItemsDisplay').innerHTML = "";
  // alert(value);
  if (value) {    
    let new_Array = ListOfItems;
    // Filter the array based on the selected category
    let filteredArray = new_Array.filter(obj => obj.ItemCode === value);
    console.log(filteredArray);
    display(filteredArray)
  }
  else {
    // console.log("empty")
    display(ListOfItems)
  }
}

function sellConfirm(){
  // console.log(buyArray);
 
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

document.getElementById("OrderTotal").innerHTML=toComma(GrandTotal);
document.getElementById("OrderTotal2").innerHTML=toComma(GrandTotal);

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

function Modal_Back() {

  document.getElementById('ModalTable_1').classList.remove('d-none')
  document.getElementById('ModalTable_2').classList.add('d-none')
  document.getElementById('Modal_Close').classList.remove('d-none')
  document.getElementById('Modal_Back_btn').classList.add('d-none')
  document.getElementById('Modal_Next_btn').classList.remove('d-none')
  document.getElementById('Modal_Confirm').classList.add('d-none')

}
function Modal_Next() {

  document.getElementById('ModalTable_1').classList.add('d-none')
  document.getElementById('ModalTable_2').classList.remove('d-none')
  document.getElementById('Modal_Next_btn').classList.add('d-none')
  document.getElementById('Modal_Confirm').classList.remove('d-none')
  document.getElementById('Modal_Close').classList.add('d-none')
  document.getElementById('Modal_Back_btn').classList.remove('d-none')

}

function Confirm(){
  let orderId = document.getElementById("OrderId").innerHTML;



  // alert(orderId);
    let email =  sessionStorage.getItem("email")||"usamafaheem80@gmail.com";
    let Owner_Fk =  sessionStorage.getItem("Login_id")||87262;
    let Customer_Name = document.getElementById('Customer_Name').value;
    let Customer_Phone = document.getElementById('Customer_Phone').value;
    let Customer_Address = document.getElementById('Customer_Address').value;
    
    let tableExist = document.getElementById('tableExist');
    let Customer_Info = document.getElementById('Customer_Info');
    let tableNumber = document.getElementById('tableNumber').value;
    
    if (tableExist.checked) {
      document.getElementById("Customer_Print_tableNum").innerHTML=tableNumber;
    }
  
  if (Customer_Info.checked) {
    if (!Customer_Name) {
      alert('Please enter Valid Customer Name');
      return false
    }
    if (!Customer_Phone) {
      alert('Please enter Valid Customer Phone');
      return false
    }
    if (!Customer_Address) {
      alert('Please enter Valid Customer Address');
      return false
    }
  }
  
  $("[data-toggle = modal]").trigger({ type: "click" });
  
  
    let Customer_Souses = document.querySelectorAll('input[name="Customer_Souses"]:checked');
    Customer_Souses = Array.from(Customer_Souses)
    let checkedValues = Customer_Souses.map(checkbox => checkbox.value);
    let Souses_Obj = {}
    checkedValues.forEach(value => {
      Souses_Obj[value] = value;
    });

  document.getElementById("Customer_Print_Name").innerHTML=Customer_Name;
  document.getElementById("Customer_Print_Phone").innerHTML=Customer_Phone;
  document.getElementById("Customer_Print_Address").innerHTML = Customer_Address;
  document.getElementById("Customer_Print_Souses").innerHTML = Souses_Obj.Mayo? Souses_Obj.Mayo+(Souses_Obj.Ketchup?" & "+Souses_Obj.Ketchup:""):""
  
  //  let email =  "usamafaheem80@gmail.com";

  let salesDB = {
    buyArray: buyArray,
    OrderId: orderId,
    Email:email,
    Owner_Fk: Owner_Fk,
    Customer_Name: Customer_Name,
    Customer_Phone: Customer_Phone,
    Customer_Address: Customer_Address,
    Customer_Souses: Souses_Obj,
    tableNumber: tableNumber,
  }

  // let salesDB = new FormData();
  // formData.append("buyArray", buyArray);
  // formData.append("OrderId", OrderId);
  // formData.append("Email", Email);
  // formData.append("Owner_Fk", Owner_Fk);
  // formData.append("Customer_Name", Customer_Name);
  // formData.append("Customer_Phone", Customer_Phone);
  // formData.append("Customer_Address", Customer_Address);
  // formData.append("Customer_Souses", Customer_Souses);
  // formData.append("tableNumber", tableNumber);

  console.log(salesDB);

  $.ajax({
    url: "../../PHP/SendSales.php",
    method:"POST",
    data: salesDB,
    // contentType: false, // Set contentType to false when using FormData
    // processData: false, // Set processData to false when using FormData
    // enctype: 'multipart/form-data', // Set enctype to 'multipart/form-data' when using FormData
    success: function (res) {
      // alert("Ok saved \n"+res);
      console.log(res);
      if (res == "Successfully submitted all sales data.") {
        alert(res);
      }
    }
  
  
  });


  Modal_Back();

  printDiv();

}


function printDiv() {
  const printDiv = document.getElementById("Print");

  // Hide unwanted content on the page
  const elementsToHide = document.querySelectorAll("body > :not(#Print)");
  elementsToHide.forEach((element) => {
    element.style.display = "none";
    // console.log(element);
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

  const buyList = document.getElementById("buyList");
  const li = buyList.getElementsByTagName("li");


  while (cards.length > 0) {
    buyBoxes.removeChild(cards[0]);
  }

  
  while (li.length > 0) {
    buyList.removeChild(li[0]);
  }

  totalPrice = 0;
  document.getElementById("totalPrice").innerHTML = totalPrice + "-/Rs";
  document.getElementById("MobileTotalePrice").value = totalPrice + "-/Rs";
  
}


let toComma = (x) => Math.ceil(x)
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"/-Rs";