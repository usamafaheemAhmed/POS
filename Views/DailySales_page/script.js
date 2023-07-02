
function openNav() {
    document.getElementById("mySidenav").style.width = "80px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
   
}

let ListOfSales ;


window.onload = () => {
    

  //    let email =  sessionStorage.getItem("email");
     let email =  "usamafaheem80@gmail.com";
  
      // alert(email);
      let data = {
          email: email,
      }
  
      $.ajax({
          
          url: "../../PHP/GetSales.php",
          method:"GET",
          data: data,
          success: function (res) {
              // console.log(res);
              let resData = JSON.parse(res);
              console.log(resData);
              ListOfSales = resData;
            console.log(ListOfSales);
              // alert(res);
            display_Sales();

  
          }        
      });
  
};

let totalPriceOfDay = 0; 

function display_Sales() {
  // Assuming `salesData` is the array containing the fetched sales data

const salesTableBody = document.getElementById('salesTableBody');

ListOfSales.forEach(sale => {
  const row = document.createElement('tr');

  const salesIdCell = document.createElement('td');
  salesIdCell.textContent = sale.Sales_ID;
  row.appendChild(salesIdCell);

  const orderIdCell = document.createElement('td');
  orderIdCell.textContent = sale.OrderID;
  row.appendChild(orderIdCell);

  const itemNameCell = document.createElement('td');
  itemNameCell.textContent = sale.itemName;
  itemNameCell.classList.add("NameTag")
  row.appendChild(itemNameCell);

  const itemCodeCell = document.createElement('td');
  itemCodeCell.textContent = sale.ItemCode;
  row.appendChild(itemCodeCell);

  const quantityCell = document.createElement('td');
  quantityCell.textContent = sale.Quantity;
  row.appendChild(quantityCell);

  const totalPriceCell = document.createElement('td');
  totalPriceCell.textContent = sale.ItemPrice/sale.Quantity;
  row.appendChild(totalPriceCell);

  const dateCell = document.createElement('td');
  dateCell.textContent = sale.date;
  dateCell.classList.add("dateTag")
  row.appendChild(dateCell);

  const timeCell = document.createElement('td');
  timeCell.textContent = sale.time;
  row.appendChild(timeCell);

  const itemPriceCell = document.createElement('td');
  itemPriceCell.textContent = sale.ItemPrice;
  itemPriceCell.classList.add("priceTag");
  row.appendChild(itemPriceCell);

  totalPriceOfDay += parseFloat(sale.ItemPrice);

  salesTableBody.appendChild(row);
});
  
  
const row = document.createElement('tr');
  
const totalText = document.createElement('td');
  totalText.textContent = "Total";
  totalText.colSpan = "8";
  row.appendChild(totalText);

  const salesIdCell = document.createElement('td');
  salesIdCell.textContent = totalPriceOfDay;
  row.appendChild(salesIdCell);
  salesIdCell.id="totalResults";  
  salesTableBody.appendChild(row);
  
  

}

function exportToExcel() {
  const table = document.querySelector('table');
  const rows = Array.from(table.querySelectorAll('tr'));
  const headerRow = table.querySelector('thead tr');
  const headerData = Array.from(headerRow.querySelectorAll('th')).map(cell => cell.textContent);
  const tableData = rows.map(row => {
    if (row.style.display !== 'none') {
      return Array.from(row.querySelectorAll('td')).map(cell => cell.textContent);
    }
    return null;
  }).filter(rowData => rowData !== null);

  tableData.unshift(headerData);

  const worksheet = XLSX.utils.aoa_to_sheet(tableData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Data');
  const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  saveAsExcelFile(excelData, 'visible_sales_data.xlsx');
}

function saveAsExcelFile(data, filename) {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}

function searchByDate(value) {
  let searchTerm = value;
  let tbody = document.getElementById("salesTableBody");
  let tr = tbody.getElementsByTagName("tr");

  // alert(searchTerm);

  for (let i = 0; i < tr.length; i++) {
    let dateTag = tr[i].querySelector(".dateTag");

    // Check if the dateTag element exists within the current table row
    if (dateTag) {
      let dateText = dateTag.innerText;

      // Compare the date text with the provided value
      if (dateText !== searchTerm) {
        tr[i].style.display = "none";
        // alert('matched');
      } else {
        tr[i].style.display = "table-row";
        // alert('Notmatched1');
      }
    } else {
      // Show the row if it doesn't have a dateTag element
      tr[i].style.display = "table-row";
      // alert('Notmatched2');
    }
  }

  calculateVisibleTotal();
}

function showAllRows() {
  let tbody = document.getElementById("salesTableBody");
  let tr = tbody.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    tr[i].style.display = "table-row";
  }
  calculateVisibleTotal();
}

function searchByName(value) {
  let searchTerm = value;
  let tbody = document.getElementById("salesTableBody");
  let tr = tbody.getElementsByTagName("tr");

  // alert(searchTerm);

  for (let i = 0; i < tr.length; i++) {
    let NameTag = tr[i].querySelector(".NameTag");

    // Check if the dateTag element exists within the current table row
    if (NameTag) {
      let NameText = NameTag.innerText;

      // Compare the date text with the provided value
      if (NameText !== searchTerm) {
        tr[i].style.display = "none";
        // alert('matched');
      } else {
        tr[i].style.display = "table-row";
        // alert('Notmatched1');
      }
    } else {
      // Show the row if it doesn't have a dateTag element
      tr[i].style.display = "table-row";
      // alert('Notmatched2');
    }
  }
  calculateVisibleTotal();
}

function calculateVisibleTotal() {
  let tbody = document.getElementById("salesTableBody");
  let tr = tbody.getElementsByTagName("tr");
  let total = 0;

  for (let i = 0; i < tr.length - 1; i++) { // Exclude the last row
    if (tr[i].style.display !== "none") {
      let priceTag = tr[i].querySelector(".priceTag");
      if (priceTag) {
        let price = parseFloat(priceTag.innerText);
        total += price;
      }
    }
  }

  // Update the total in the last row
  document.getElementById("totalResults").innerText=total.toFixed(2);

  return total;
}

function DeleteOrder() {
  let orderId = document.getElementById("OrderId").value;

  let data = {
    OrderID: orderId,
  }


  $.ajax({
        
    url: "../../PHP/DeleteOrder.php",
    method: "POST",
    data: data,
    success: function (res) {

      alert(res);
      $("[data-toggle = modal]").trigger({ type: "click" });
     }
  });

  document.getElementById("salesTableBody").innerHTML = "";
  

    //    let email =  sessionStorage.getItem("email");
    let email =  "usamafaheem80@gmail.com";
  
    // alert(email);
    let data2 = {
        email: email,
    }

    $.ajax({
        
        url: "../../PHP/GetSales.php",
        method:"GET",
        data: data2,
        success: function (res) {
            // console.log(res);
            let resData = JSON.parse(res);
            console.log(resData);
            ListOfSales = resData;
          console.log(ListOfSales);
            // alert(res);
          display_Sales();


        }        
    });

}