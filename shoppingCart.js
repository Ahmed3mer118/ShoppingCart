let content = document.querySelector(".content");
let list = document.querySelector(".list");
let cartList = document.querySelector(".cart-list");
let quantity = document.querySelector(".quantity");
let total = document.querySelector(".total")

let cartIcon = document.getElementById("cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.getElementById("close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});


let products = [
  {
    id: 1,
    image: "image 3.jpg",
    name: "T-shirt",
    price: 35,
  },
  {
    id: 2,
    image: "image 12.png",
    name: "T-shirt",
    price: 35,
  },
  {
    id: 3,
    image: "image 16.jpg",
    name: "T-shirt",
    price: 40,
  },
  {
    id: 4,
    image: "image 18.jpg",
    name: "T-shirt",
    price:  40,
  },
  {
    id: 5,
    image: "image5.png",
    name: "smart watch",
    price: 40,
  },
  {
    id: 6,
    image: "image8.png",
    name: "smart watch",
    price: 40,
  },
  {
    id: 7,
    image: "image3.png",
    name: "T-shirt",
    price: 30,
  },
];

let listCards = [];
if(localStorage.listProduct !=null){
  listCards = JSON.parse(localStorage.listProduct);
}
getProductLocalStorage();

function initApp() {

  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("product-box");
    newDiv.innerHTML = `
      <img src="image/${value.image}">
      <h2 class="title">${value.name}</h2>
      <span class="price">${value.price}$</span>
      <i class='bx bx-shopping-bag add-cart' onclick="addToCart(${value.id})"></i>
    `;
    content.appendChild(newDiv);

  });
}
initApp();


function addToCart(id) {
  // if (listCards[key] == null) {
  //   listCards[key] = products[key];
  //   listCards[key].quantity = 1;
  // }
  let product = products.find(p=>p.id === id);
  let productIndex = listCards.findIndex(p=>p.id === id);
  if(productIndex > -1){
    listCards[productIndex].quantity += 1;
  }
  else{
    listCards.push({...product,quantity:1})
  }
 
  reloadCard();
}

function reloadCard(){
  cartList.innerHTML = "";
  let count = 0 ;
   let totalPrice = 0;

  listCards.forEach((value) => {
    totalPrice +=  value.price * value.quantity;
    count += value.quantity;

      let newDiv = document.createElement("li");
      newDiv.classList.add("box");
      newDiv.innerHTML = `
      <div>  <img src="image/${value.image}"></div>
      <div class="title>${value.name}</div>
      <div>  <span class="price">${value.price.toLocaleString()}$</span></div> 

      <div class="change">
           <button  onclick="changeQuantity(${value.id},${value.quantity - 1})">-</button>
             <div class="count">${value.quantity}</div>
            <button onclick="changeQuantity(${value.id},${value.quantity + 1})">+</button>
       </div>`;
     
      cartList.appendChild(newDiv);
    });

    total.innerText = totalPrice.toLocaleString() + "$";
    quantity.innerText = count;   
    addProductToLocalStorage(listCards)
}
function addProductToLocalStorage(listCards){
  localStorage.setItem("listProduct", JSON.stringify(listCards))
}

function getProductLocalStorage(){
  let data = localStorage.getItem("listProduct")

  if(data){
    let product = JSON.parse(data)
    reloadCard(product)
  }
}


function changeQuantity(id, newQuantity){
  let productIndex = listCards.findIndex(p => p.id ===id);

  if( newQuantity === 0){
    listCards.splice(productIndex,1)
  }else{
    listCards[productIndex].quantity = newQuantity
  }
reloadCard();
}



