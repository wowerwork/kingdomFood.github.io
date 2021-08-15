
let randomId = () => {
	return Math.round(Math.random() * 100) ;
};

generateProducts(burgers,'.burgers');
generateProducts(pizza,'.pizza');
generateProducts(soups,'.soups');
generateProducts(sushi,'.sushi');
generateProducts(rolls,'.rolls');
generateProducts(desserts,'.desserts');
function generateProducts(products,productsBlock){
    
	let out ='';
	for(let productItem of products){
		
		out+=`
    <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12" data-aos="fade-down" >
    <form action="/get-goods-info" class="menu-item" method="POST" data-id="${randomId()}">

        <img src="${productItem.img}" alt="" class="menu-item__img ">
        <h5 class="menu-item__title text-white">${productItem.name}</h5>
        <p class="menu-item__desc">${productItem.desc}</p>
        <div class="pricing text-center d-flex justify-content-between align-items-center">
            <p class="price text-white">${productItem.price} ₽</p>
            <input type="hidden" name="name" value="${productItem.name}">
            <input type="hidden" name="price" value="${productItem.price}">
            <div class="counter">
                <span class="counter_btn text-white" data-direction="minus">-</span>
                <input type="number" value="${productItem.qty}" name="count" class="count text-white"></input>
                <span class="counter_btn text-white" data-direction="plus">+</span>
            </div>


        </div>
        <button type="submit" class="add-to-cart w-100 btn text-white">Добавить в
            корзину</button>

    </form>
</div>
		
		`;

	}
	let prodList = document.querySelector(productsBlock);
	prodList.insertAdjacentHTML('afterbegin', out);
	};

    var itemsCart = [];
var GetCartDetails = [];
var total = 0;
let ProductArray = [];
let counter = function () {
  let btns= document.querySelectorAll('.counter_btn');

  btns.forEach(btn => {
    btn.addEventListener('click', counterState)
  })
  function counterState() {
    let dir = this.dataset.direction,
    inputEl = this.parentElement.querySelector('.count'),
    currentValue = inputEl.value;
    dir === 'plus' ? counterPlus(inputEl,currentValue) : counterMinus(inputEl,currentValue)
  }
  let counterPlus = (el,value) => {
   el.value = +value + 1 
  }
  let counterMinus = (el,value) => {
    if(value - 1) el.value = +value - 1 
   }
}
counter();

document.querySelectorAll('.menu-item').forEach(function (element) {
  element.addEventListener('submit', function (event) {
    let id = this.dataset.id;
    let patt = new RegExp("^[1-9]([0-9]+)?$");
    let qty = this.count.value;

    qty = (patt.test(qty) === true) ? parseInt(qty) : 1;
    let data = {
      "id": id,
      "name": this.name.value,
      "price": this.price.value,
      "qty": qty,
    };

    event.preventDefault();
   
    let CartData = localStorage.getItem("cart");
    if (CartData == null) {
      let StoreData = [];
      StoreData.push(data);
      localStorage.setItem("cart", JSON.stringify(StoreData));

    } else {
      let id = data.id;
      let index = -1;

      this.itemsCart = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < this.itemsCart.length; i++) {
        if (parseInt(id) === parseInt(this.itemsCart[i].id)) {
          this.itemsCart[i].qty += data.qty;
          index = i;

          break;

        }


      }
      if (index == -1) {
        this.itemsCart.push(data);
        localStorage.setItem("cart", JSON.stringify(this.itemsCart));
      } else {
        localStorage.setItem("cart", JSON.stringify(this.itemsCart));

      }
element
      let array = document.querySelector('.cart-content__list').children;
			

			for (item of array){
				console.log(item);
			}  
    }
    
    
element.reset();

    cartDetails();
    loadCart();
    showCart();
    showOrder();
    // location.reload();

  })
  

  function cartDetails() {
    if (localStorage.getItem("cart")) {

      this.GetCartDetails = JSON.parse(localStorage.getItem("cart"));
      
    }
  }
  

  function showCart() {
    let out = '';
    if(Object.keys(GetCartDetails).length != 0){
      for (let GetCartDetail of GetCartDetails) {
        out += `
        <li class="cart-content__item">
                                  <article class="cart-content__product cart-product" data-id="${GetCartDetail.id}">
                                      <h6 class="cart-content__name text-white" title="${GetCartDetail.name}">${GetCartDetail.name}</h6>
                                      <div class="plus-minus">
                <button class="cart-minus text-white" data-id="${GetCartDetail.id}" data-qty="${GetCartDetail.qty}">-</button>
                <input type='number' value="${GetCartDetail.qty}" name="count" class="count text-white" readonly></input>
                <button class="cart-plus text-white" data-id="${GetCartDetail.id}" data-qty="${GetCartDetail.qty}">+</button>
                
              </div>
                                      <span
                                          class="menu-item__price text-white">${GetCartDetail.price * GetCartDetail.qty}&nbsp;₽</span>
                                  </article>
                              </li>
            
        `;
        
      }
        
        document.querySelector('.cart').classList.add('active')
        
      }
      else{
        document.querySelector('.cart').classList.remove('active')
        
      }
   
    document.querySelector('.cart-content__list').innerHTML = out;
    document.querySelector('.fullprice-price').innerHTML = total + '&nbsp;'+'₽';
    document.querySelector('.myorder-price').innerHTML = total + '&nbsp;'+'₽';
  }
 
  function showOrder() {
    let out = '';
    let length = GetCartDetails.length;
    let ProductArray = GetCartDetails;
    
      for (let GetCartDetail of ProductArray) {
        out += `
        <li class="order-window__item">
                              <article class="order-window__product order-product" data-id="${GetCartDetail.id}">
                                  
                                  <div class="order-product__text">
                                      <h3 class="order-window__title order-product__title">${GetCartDetail.name}</h3>
                                      <span class="order-product__price">${GetCartDetail.price * GetCartDetail.qty}&nbsp;₽</span>
                                  </div>
                                  <p class="order-product__qty" >${GetCartDetail.qty}&nbsp;шт</p>
                              </article>
                          </li>
            
        `;
       
      }
        
        
   
    document.querySelector('.order-window__list').innerHTML = out;
    document.querySelector('.order-window__fullprice-price').innerHTML = total + '&nbsp;'+'₽';
    document.querySelector('.order-window__info-item__qty').innerHTML = length + '&nbsp;'+'шт';
  }
  document.onclick = event => {
    if (event.target.classList.contains('cart-plus')) {
      plusF(event.target.dataset.id, event.target.dataset.qty);
    }
    if (event.target.classList.contains('cart-minus')) {
      minusF(event.target.dataset.id, event.target.dataset.qty);
    }
  }
  const plusF = (id, qty) => {
    for (let i = 0; i < this.GetCartDetails.length; i++) {
      if (parseInt(this.GetCartDetails[i].id) === parseInt(id)) {
        this.GetCartDetails[i].qty = parseInt(qty) + 1;

        console.log(this.GetCartDetails[i].qty)
      }

    }
    localStorage.setItem("cart", JSON.stringify(this.GetCartDetails));
    loadCart();
    showCart();
    showOrder();
    
  }
  const minusF = (id, qty) => {
    for (let i = 0; i < this.GetCartDetails.length; i++) {
      if (parseInt(this.GetCartDetails[i].id) === parseInt(id)) {
        if (qty != 1) {
          this.GetCartDetails[i].qty = parseInt(qty) - 1;
          console.log(this.GetCartDetails[i].qty)
        }

      }

    }
    localStorage.setItem("cart", JSON.stringify(this.GetCartDetails));
    loadCart();
    showCart();
    showOrder();
  }
  

  function loadCart() {
    if (localStorage.getItem("cart")) {
      this.GetCartDetails = JSON.parse(localStorage.getItem("cart"));
      this.total = this.GetCartDetails.reduce(function (accumulator, value) {
        return accumulator + (value.price * value.qty)
      }, 0);
    }
  }
  document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){
    showCart();
    cartDetails();
    loadCart();
    showOrder();
    
   
  });
  document.querySelector(".cart__img").onclick = function(){
   
    if(Object.keys(GetCartDetails).length != 0){
      
      document.querySelector(".cart").classList.toggle("active");
      
    }
    else{
      document.querySelector(".cart").classList.remove("active");
    }
    
   }


   
})

const orderWindowOpenProd = document.querySelector(".order-window__btn");
   const orderWindowList = document.querySelector(".order-window__list");
   let flag =0;
   orderWindowOpenProd.addEventListener("click" , (e) => {
if (flag == 0) {
  orderWindowOpenProd.classList.add("open");
  orderWindowList.style.display = "block";
  flag =1;
}
else{
  orderWindowOpenProd.classList.remove("open");
  orderWindowList.style.display = "none";
  flag =0;
}
   })
  

   


 document.querySelector('.order').addEventListener('submit', (e) => {
	e.preventDefault();
	let self = e.currentTarget;
    let OrderProd = localStorage.getItem('cart')
    console.log(localStorage.getItem('cart'));
	let formData = new FormData(self);
	let name = self.querySelector('[name="Имя"]').value;
	let tel = self.querySelector('[name="Телефон"]').value;
	let mail = self.querySelector('[name="Email"]').value;
	formData.append('Товары', OrderProd);
	formData.append('Имя', name);
	formData.append('Телефон', tel);
	formData.append('Email', mail);

	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				alert('Отправлено');
			}
		}
	}

	xhr.open('POST', 'mail.php', true);
	xhr.send(formData);

	self.reset();
});
