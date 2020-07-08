'use strict';

const modalAdd = document.querySelector('.modal__add'),
      addAd = document.querySelector('.add__ad'),
      modalBtnSubmit = document.querySelector('.modal__btn-submit'),
      modalSubmit = document.querySelector('.modal__submit'),
      modalItem = document.querySelector(".modal__item"),
      catalog = document.querySelector(".catalog"),
      cards = catalog.querySelectorAll(".card");

// Открытие окна
addAd.addEventListener('click', () => {
   modalAdd.classList.remove('hide');
   modalBtnSubmit.disabled = true;
});

// Закрытие модального окна
modalAdd.addEventListener('click', (event) => {

   const target = event.target;

   if (target.closest('.modal__close') || target === modalAdd) {
      modalAdd.classList.add('hide');
      modalSubmit.reset();
   }

});

// Открытие товара в модальном окне

cards.forEach(card => {
   card.addEventListener('click', function(){
      modalItem.classList.remove('hide')
   })
})

// Закртые модального окна с товаром
modalItem.addEventListener('click', event => {

   const target = event.target;

   if (target.closest('.modal__close') || target === modalItem) {
      modalItem.classList.add('hide')
   }

})

document.addEventListener('keydown', event => {

   const key = event.keyCode;

   if (key === 27){

      if (!modalAdd.classList.contains('hide')){
         modalAdd.classList.add('hide')
         modalSubmit.reset();
      }

      else if (!modalItem.classList.contains('hide')) {
         modalItem.classList.add('hide')
      }

   }

})