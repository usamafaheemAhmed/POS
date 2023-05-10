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

function display(){
  let length = ListOfItems.length;
  alert(length);



  for (let i = 0; i < ListOfItems.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("text-left");
    card.classList.add("itemCards");
    // card.addEventListener("click",AddToCart);
    card.addEventListener("click", function() {
      // Call the AddToCart function with the parameters
      AddToCart(ListOfItems[i].itemName, ListOfItems[i].ItemPrice, ListOfItems[i].ImgUrl);
    });

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.classList.add("pt-1");
    cardBody.classList.add("pb-0");

    let row = document.createElement("div");
    row.classList.add("row");
    cardBody.appendChild(row);
    
    let col5 = document.createElement("div");
    col5.classList.add("col-md-5");
    col5.classList.add("p-0");
    col5.classList.add("m-0");
    row.appendChild(col5);


    let img = document.createElement("img");
    img.classList.add("roundedItem");
    img.src=ListOfItems[i].ImgUrl;
    col5.appendChild(img);



    let col7 = document.createElement("div");
    col7.classList.add("col-md-7");
    row.appendChild(col7);

    let h4 = document.createElement("h4");
    h4.classList.add("card-title");
    h4.textContent=ListOfItems[i].itemName;
    col7.appendChild(h4);


    let p = document.createElement("p");
    p.classList.add("card-text");
    p.textContent=ListOfItems[i].ItemPrice+"-/Rs";
    col7.appendChild(p);

    card.appendChild(cardBody);



    let container = document.getElementById("ItemsDisplay");
    container.appendChild(card);
  }
}

let CartItemNumber = 0;

function AddToCart(name,price,url){
  // alert(name+" "+price+" "+url);
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

function remove(cardID){
  alert(cardID);
  let card = document.getElementById(cardID);
  console.log(card);
  let container = document.getElementById("buyBoxes");
  container.removeChild(card);
}