
function openNav() {
  document.getElementById("mySidenav").style.width = "80px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

let ListOfCustomers;


window.onload = () => {

  // alert('Got')
  let email = sessionStorage.getItem("email") || "usamafaheem80@gmail.com";
  let Owner_Fk = sessionStorage.getItem("Login_id") || "87262";
  //  let email =  "usamafaheem80@gmail.com";

  // alert(email);
  let data = {
    email: email,
    Owner_Fk: Owner_Fk
  }

  $.ajax({

    url: "../../PHP/GetCustomers.php",
    method: "GET",
    data: data,
    success: function (res) {
      // console.log(res);
      let resData = JSON.parse(res);
      // console.log(resData);
      ListOfCustomers = resData;
      console.log(ListOfCustomers);
      // alert(res);
      display_Sales();


    }
  });

};

function display_Sales() {
  // Assuming `salesData` is the array containing the fetched sales data

  const CustomerTableBody = document.getElementById('CustomerTableBody');

  ListOfCustomers.forEach((Customer, index) => {
    const row = document.createElement('tr');

    const salesIdCell = document.createElement('td');
    salesIdCell.textContent = index + 1;
    row.appendChild(salesIdCell);

    const orderIdCell = document.createElement('td');
    orderIdCell.textContent = Customer.Customer_Name;
    row.appendChild(orderIdCell);

    const itemNameCell = document.createElement('td');
    itemNameCell.textContent = Customer.Customer_Phone;
    itemNameCell.classList.add("NameTag")
    row.appendChild(itemNameCell);


    const itemCodeCell = document.createElement('td');
    itemCodeCell.textContent = Customer.Customer_Address;
    row.appendChild(itemCodeCell);

    CustomerTableBody.appendChild(row);
  });

}
