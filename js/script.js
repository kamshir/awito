'use strict';

const dataBase = []; // Данные формы

const modalAdd = document.querySelector('.modal__add'), // Окно добавления объявления
      addAd = document.querySelector('.add__ad'), // Кнопка добавления объявления
      modalBtnSubmit = document.querySelector('.modal__btn-submit'), // Кнопка отправки формы добавления объявления
      modalSubmit = document.querySelector('.modal__submit'), // Форма добавления объявления
      modalItem = document.querySelector(".modal__item"), // Модальное окно товара
      catalog = document.querySelector(".catalog"), // Блок с товарами
      modalBtnWarning = document.querySelector(".modal__btn-warning"); // Предупреждение о заполненни полей

// Выбирает из формы только input'ы
const elementsModalSubmit = [...modalSubmit.elements].filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');

// Закртытие модального окна
const closeModal = function(event) {

   const target = event.target; // НА что нажали
   // Если был нажат крестик или вложка и нажатый блок не является телом документа
   if (target.closest('.modal__close') || target === this && target !== document.body) {
      this.classList.add('hide'); // Закрываем открытое окно
      // Если открыто окно объявления
      if (this === modalAdd){
         modalSubmit.reset(); // Очищает форму
      }
   }

   // Если была нажата клавиша ESC
   if (event.code === 'Escape') {
      modalAdd.classList.add('hide'); // Скрывает окно объявления
      modalItem.classList.add('hide'); // Скрывает окно товара
      modalSubmit.reset(); // Очищает форму
      document.body.removeEventListener('keydown', closeModal); // Удалает событие нажатия клавиши
   }

}

// Проверка заполнения всех полей формы
modalSubmit.addEventListener('input', () => {
   const validForm = elementsModalSubmit.every(elem => elem.value); // Выбирает все значения формы
   modalBtnSubmit.disabled = !validForm; // Блокирует кнопку если форма не заполнена и разблокирует если заполнена
   modalBtnWarning.style.display = validForm ? 'none' : ''; // Если форма заполнена предупреждение скрывается
})

// Проверка отправки формы
modalSubmit.addEventListener('submit', event => {
   event.preventDefault(); // Запрещает перезапуск страницы
   const itemObj = {}; // СОздает объект формы
   // Перебирает все значения из формы и заносит их в объект
   for (const elem of elementsModalSubmit) {
      itemObj[elem.name] = elem.value;
   }
   dataBase.push(itemObj); // добавление объекта в БД
   modalAdd.classList.add('hide'); // Закрываем окно
})

// Открытие окна добавления объявления
addAd.addEventListener('click', () => {
   modalAdd.classList.remove('hide'); // Появление окна
   modalBtnSubmit.disabled = true;  // Отключение кнопки отправки формы
   document.body.addEventListener('keydown', closeModal); // Добавляем слушателя при нажатии на кнопку
});

// Открытие товара в модальном окне
catalog.addEventListener('click', event => {

   const target = event.target; // На что нажали в блоке с классом "Catalog"

   // Если нажали именно в пределах карточки товара
   if (target.closest(".card") || target !== catalog) {
      modalItem.classList.remove('hide'); // Показывает модальное окно товара
      document.body.addEventListener('keydown', closeModal); // Добавляем слушателя при нажатии на кнопку
   }

})

// События закрытие окон
modalItem.addEventListener('click', closeModal);
modalAdd.addEventListener('click', closeModal);