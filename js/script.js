


 document.querySelector(".header-burger").onclick = function(){
  document.querySelector(".header-burger").classList.toggle("menu-active");
  document.querySelector(".header-navigation").classList.toggle("menu-active");
  document.querySelector("body").classList.toggle("lock");
 }
 
let modalBtn = document.querySelectorAll("*[data-modal-btn]");
for (let index = 0; index < modalBtn.length; index++) {
  const element = modalBtn[index];
  element.addEventListener("click" , function(){
    let name = element.getAttribute('data-modal-btn');
    let modal = document.querySelector("[data-modal-window='"+name+"']");
    modal.style.display ="flex";
    modal.style.transition ="all .3s ease-in 0s";
    let close = modal.querySelector('.order-window__close');
    close.addEventListener("click",function(){
      modal.style.display ="none";
    })
  })
  
}
window.onclick = function(e){
  if(e.target.hasAttribute('data-modal-window')){
    let modals = document.querySelectorAll("*[data-modal-window]");
    for (let index = 0; index < modals.length; index++){
let element = modals[i];
element.style.display ="none";
    }
  }
}

//Вкладки
var tabNavs = document.querySelectorAll(".nav-tab");
var tabPanes = document.querySelectorAll(".tab-pane");

for (var i = 0; i < tabNavs.length; i++) {

  tabNavs[i].addEventListener("click", function(e){
    e.preventDefault();
    var activeTabAttr = e.target.getAttribute("data-tab");

    for (var j = 0; j < tabNavs.length; j++) {
      var contentAttr = tabPanes[j].getAttribute("data-tab-content");

      if (activeTabAttr === contentAttr) {
        tabNavs[j].classList.add("active");
        tabPanes[j].classList.add("active"); 
      } else {
        tabNavs[j].classList.remove("active");
        tabPanes[j].classList.remove("active");
      }
    };
  });
}

//Слайдер отзывов
const reviewsSlider = new Swiper('.reviews-slider', {
  // Optional parameters
  loop: true,
  slidesPerView:3,
  spaceBetween: 24,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  
 
// Responsive breakpoints
breakpoints: {
  280: {
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  },
  // when window width is >= 320px
  320: {
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
  },
  // when window width is >= 480px
  768: {
    slidesPerView: 2,
    spaceBetween: 24,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  },
  // when window width is >= 640px
  992: {
    slidesPerView: 3,
    spaceBetween: 24,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  }
}
});

