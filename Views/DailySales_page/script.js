
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
  const tableData = Array.from(table.querySelectorAll('tr')).map(row => {
    return Array.from(row.querySelectorAll('th, td')).map(cell => cell.textContent);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(tableData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Data');
  const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  saveAsExcelFile(excelData, 'sales_data.xlsx');
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

  for (let i = 0; i < tr.length; i++) {
    let dateTag = tr[i].querySelector(".dateTag");

    // Check if the dateTag element exists within the current table row
    if (dateTag) {
      let dateText = dateTag.innerText;

      // Compare the date text with the provided value
      if (dateText !== searchTerm) {
        tr[i].style.display = "none";
      } else {
        tr[i].style.display = "table-row";
      }
    } else {
      // Show the row if it doesn't have a dateTag element
      tr[i].style.display = "table-row";
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


