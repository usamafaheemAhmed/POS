
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

  const dateCell = document.createElement('td');
  dateCell.textContent = sale.date;
  row.appendChild(dateCell);

  const timeCell = document.createElement('td');
  timeCell.textContent = sale.time;
  row.appendChild(timeCell);

  const itemPriceCell = document.createElement('td');
  itemPriceCell.textContent = sale.ItemPrice;
  row.appendChild(itemPriceCell);

  const totalPriceCell = document.createElement('td');
  totalPriceCell.textContent = sale.ItemPrice*sale.Quantity;
  row.appendChild(totalPriceCell);

  salesTableBody.appendChild(row);
});

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