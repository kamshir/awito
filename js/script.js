'use strict';

const modalAdd = document.querySelector('.modal__add'), // Окно добавления объявления
      addAd = document.querySelector('.add__ad'), // Кнопка добавления объявления
      modalBtnSubmit = document.querySelector('.modal__btn-submit'), // Кнопка отправки формы добавления объявления
      modalSubmit = document.querySelector('.modal__submit'), // Форма добавления объявления
      modalItem = document.querySelector(".modal__item"), // Модальное окно товара
      catalog = document.querySelector(".catalog"); // Блок с товарами

// Открытие окна добавления объявления
addAd.addEventListener('click', () => {
   modalAdd.classList.remove('hide'); // Появление окна
   modalBtnSubmit.disabled = true;  // Отключение кнопки отправки формы
});

// Закрытие модального окна добавления объявления
modalAdd.addEventListener('click', event => {

   const target = event.target; // На что нажали

   // Если нажали на крестик или кликнули за пределами модального окна
   if (target.closest('.modal__close') || target === modalAdd) {
      modalAdd.classList.add('hide'); // Скрывает модальное окно
      modalSubmit.reset(); // Стирает поля формы
   }

});

// Открытие товара в модальном окне
catalog.addEventListener('click', event => {

   const target = event.target; // На что нажали в блоке с классом "Catalog"

   // Если нажали именно в пределах карточки товара
   if (target.closest(".card") || target !== catalog) {
      modalItem.classList.remove('hide'); // Показывает модальное окно товара
   }

})

// Закртые модального окна с товаром
modalItem.addEventListener('click', event => {

   const target = event.target; // Цель нажатия

   // Если кликнули по крестику или за пределами модального окна
   if (target.closest('.modal__close') || target === modalItem) {
      modalItem.classList.add('hide'); // Скрывает окно
   }

})

// Событие нажатия клавиши
document.body.addEventListener('keydown', event => {

   const key = event.keyCode; // Какой код нажатой клавиши

   // Если нажали ESC
   if (key === 27){

      // Если открыто окно с добавлением объявления
      if (!modalAdd.classList.contains('hide')){
         modalAdd.classList.add('hide') // Закрываем окно 
         modalSubmit.reset(); // Стираем данные формы
      }

      // Если открыто окно с товаром
      else if (!modalItem.classList.contains('hide')) {
         modalItem.classList.add('hide') // Скрываем товар
      }

   }

})