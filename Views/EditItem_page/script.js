function openNav() {
    document.getElementById("mySidenav").style.width = "80px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
   
}

let ListOfItems;
let ListOfSales;


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
              // console.log(resData);
              ListOfItems=resData;
              // alert(res);
              display();
          }        
      });
  
      $.ajax({
          
        url: "../../PHP/GetSales.php",
        method:"GET",
        data: data,
        success: function (res) {
            // console.log(res);
            let resData = JSON.parse(res);
            // console.log(resData);
            ListOfSales = resData;
            // console.log(ListOfSales);
              // alert(res);
        }        
      });
  
  };

function display() {
    


    const cardContainer = document.getElementById("itemDisplay");
    cardContainer.innerHTML = "";
  
    ListOfItems.forEach(function (item) {
      if (item.isDeleted == 0) {
        
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("m-0","p-0","itemCards");
      cardDiv.setAttribute("id", `card-${item.id}`);
      cardDiv.classList.add("card", "text-left", "slide-top", "m-1");
      cardDiv.addEventListener("click", function() {
        EditModal(item.itemName, item.ItemPrice, item.ImgUrl, item.ItemCode);
      });
  
      const cardBodyDiv = document.createElement("div");
      cardBodyDiv.classList.add("card-body", "pt-1", "pb-0");
  
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
  
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("col-md-3", "p-0", "m-0");
  
      const imageElement = document.createElement("img");
      imageElement.classList.add("roundedbuy");
      imageElement.setAttribute("src", item.ImgUrl);
  
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("col-md-8");
  
      const titleElement = document.createElement("h4");
      titleElement.classList.add("card-title");
      titleElement.textContent = item.itemName;
  
      const priceElement = document.createElement("span");
      priceElement.classList.add("card-text","mt-3");
      priceElement.textContent = `Price is ${item.ItemPrice}`;
  
      const gearDiv = document.createElement("div");
      gearDiv.classList.add("col-md-1", "pt-4", "pr-1");
  
      const gearIcon = document.createElement("i");
      gearIcon.classList.add("fa-lg", "fa-solid", "fa-gear", "rotate-center", "float-right", "pt-1");
  
      gearDiv.appendChild(gearIcon);
      contentDiv.appendChild(titleElement);
      contentDiv.appendChild(priceElement);
      imageDiv.appendChild(imageElement);
      rowDiv.appendChild(imageDiv);
      rowDiv.appendChild(contentDiv);
      rowDiv.appendChild(gearDiv);
      cardBodyDiv.appendChild(rowDiv);
      cardDiv.appendChild(cardBodyDiv);
      cardContainer.appendChild(cardDiv);
      }
    });
  }
  

  function EditModal(name, Price, Img, code) {
  // alert(name + Price + Img + code);

  document.getElementById("chartParent").innerHTML = "";

  document.getElementById("PlaceImage").src = Img;
  document.getElementById("itemName").value = name;
  document.getElementById("itemPrice").value = Price;
  document.getElementById("itemCode").value = code;

  sessionStorage.setItem("itemCode", code);
    
  // Filter the sales by itemCode
  const filteredSales = ListOfSales.filter(function(sale) {
    return sale.ItemCode === code;
  });

  // Extract the dates and quantities from the filtered sales
  const dates = filteredSales.map(function(sale) {
    return sale.date;
  });
  const quantities = filteredSales.map(function(sale) {
    return parseInt(sale.Quantity);
  });

  let canvas = document.createElement("canvas");
  canvas.id = "myChart";
  document.getElementById("chartParent").appendChild(canvas);

  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Quantity',
        data: quantities,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
          stepSize: 1 // Set the y-axis step size to 1
          }
        }
      }
    }
  });

  $("#Update_Modal").trigger("click");
}

  

// function EditModal(name, Price, Img, code) {
//   // alert(name + Price + Img + code);

//   document.getElementById("chartParent").innerHTML = "";

//   document.getElementById("PlaceImage").src = Img;
//   document.getElementById("itemName").value = name;
//   document.getElementById("itemPrice").value = Price;
//   document.getElementById("itemCode").value = code;

//   // console.log(ListOfSales);

//   const indexes = [];
//   ListOfSales.forEach(function(sale, index) {
//     if (sale.ItemCode === code) {
//       indexes.push(sale);
//     }
//   });

//   console.log(indexes);


//   let canvas = document.createElement("canvas");

//   canvas.id = "myChart";

//   document.getElementById("chartParent").appendChild(canvas);

//   const ctx = document.getElementById('myChart');

//   new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       datasets: [{
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });





//   $("#Update_Modal").trigger("click");

// }

function EnterIMage() {
  let imageInput = document.getElementById("image");
  imageInput.click();
}

function gotimage() {
  let imageInput = document.getElementById("image");
  let selectedFile = imageInput.files[0];
  selectedFile = URL.createObjectURL(selectedFile);
  console.log('Selected file path:', selectedFile);
  document.getElementById("PlaceImage").src = selectedFile;

  
}



// function UpdateData() {
//   let itemName = document.getElementById("itemName").value;
//   let itemPrice = document.getElementById("itemPrice").value;
//   let itemCode = document.getElementById("itemCode").value;
//   let image = document.getElementById("image")[0].files[0];
//   let OriginalCode = sessionStorage.getItem("itemCode");



//   let update = {
//     name: itemName,
//     Price: itemPrice,
//     Code: itemCode,
//     OriginalCode:OriginalCode,
//   }

//   // alert("don");

//   $.ajax({
          
//     url: "../../PHP/UpdateItems.php",
//     method:"POST",
//     data: update,
//     success: function (res) {
        
//       console.log(res);
//       $("#Update_Modal").trigger("click");
//       location.reload();
//     }
//   });


// }

function UpdateData() {
  let itemName = document.getElementById("itemName").value;
  let itemPrice = document.getElementById("itemPrice").value;
  let itemCode = document.getElementById("itemCode").value;
  let imageFile = document.getElementById("image").files[0];
  let OriginalCode = sessionStorage.getItem("itemCode");

  // Create a FormData object
  let formData = new FormData();
  formData.append("name", itemName);
  formData.append("Price", itemPrice);
  formData.append("Code", itemCode);
  formData.append("OriginalCode", OriginalCode);
  formData.append("image", imageFile);

  // Make the AJAX request
  $.ajax({
    url: "./UpdateItems.php",
    method: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function(res) {
      console.log(res);
      $("#Update_Modal").trigger("click");
      location.reload();
    },
    error: function(xhr, status, error) {
      console.error("Failed to update item:", error);
    }
  });
}



function DeleteData() {
  
  let OriginalCode = sessionStorage.getItem("itemCode");


  // alert("don");

  $.ajax({
          
    url: "../../PHP/DeleteItem.php",
    method:"POST",
    data: {OriginalCode:OriginalCode},
    success: function (res) {
        
      console.log(res);
      $("#Update_Modal").trigger("click");
      location.reload();

    }        
  });
}