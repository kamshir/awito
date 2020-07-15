'use strict';

const dataBase = JSON.parse(localStorage.getItem('awito')) || []; // Все данные
let counter = dataBase.length; // Счетчик
const modalAdd = document.querySelector('.modal__add'), // Окно добавления объявления
      addAd = document.querySelector('.add__ad'), // Кнопка добавления объявления
      modalBtnSubmit = document.querySelector('.modal__btn-submit'), // Кнопка отправки формы добавления объявления
      modalSubmit = document.querySelector('.modal__submit'), // Форма добавления объявления
      modalItem = document.querySelector(".modal__item"), // Модальное окно товара
      catalog = document.querySelector(".catalog"), // Блок с товарами
      modalBtnWarning = document.querySelector(".modal__btn-warning"), // Предупреждение о заполненни полей
      modalFileInput = document.querySelector('.modal__file-input'), // Кнопка прикрепления фотки
      modalFileBtn = document.querySelector('.modal__file-btn'), // Кнопка добавления фотки
      modalImageAdd = document.querySelector('.modal__image-add'); // Картинка в форме

const textFileBtn = modalFileBtn.textContent; // Текст кнопки добавления фотки
const srcModalImage = modalImageAdd.src; // Путь до изначальной картинки

const searchInput = document.querySelector('.search__input'), // Поле поиска
      menuContainer = document.querySelector('.menu__container'); // Меню навигации 

// Выбирает из формы только input'ы
const elementsModalSubmit = [...modalSubmit.elements].filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');

// Инфа о прикрепляемой фотографии
const infoPhoto = {};

// Сохраненные данные
const saveDB = () => localStorage.setItem('awito', JSON.stringify(dataBase));

// Закртытие модального окна
const closeModal = function(event) {

   const target = event.target; // НА что нажали
   // Если был нажат крестик или вложка или клавиша ESC и нажатый блок не является телом документа
   if (target.closest('.modal__close') || target.classList.contains('modal') || event.code === 'Escape') {
      modalAdd.classList.add('hide'); // Скрывает окно объявления
      modalItem.classList.add('hide'); // Скрывает окно товара
      modalItem.innerHTML = '';
      document.body.removeEventListener('keydown', closeModal); // Удалает событие нажатия клавиши
      modalSubmit.reset(); // Очищает форму
      modalImageAdd.src = srcModalImage;
      modalFileBtn.textContent = textFileBtn;
      checkForm(); // Проверка формы
   }

}

// Проверка формы на валидацию
const checkForm = () => {
   const validForm = elementsModalSubmit.every(elem => elem.value); // Выбирает все значения формы
   modalBtnSubmit.disabled = !validForm; // Блокирует кнопку если форма не заполнена и разблокирует если заполнена
   modalBtnWarning.style.display = validForm ? 'none' : ''; // Если форма заполнена предупреждение скрывается
}

// Отображение всех товаров из БД на странице
const renderCard = (DB = dataBase) => {
   catalog.textContent = ''; // Очищаем весь блок
   // Выгружаем все товары
   DB.forEach(item => {
      // Отображаем каждый товар на странице
      catalog.insertAdjacentHTML('beforeend', `
         <li class="card" data-id="${item.id}">
            <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="${item.nameItem}">
            <div class="card__description">
               <h3 class="card__header">${item.nameItem}</h3>
               <div class="card__price">${item.costItem}</div>
            </div>
         </li>
      `);
   });
};

// Выгружаем данные определенного товара при клике по нему
const showItem = target => {
   // В завимимости от того, на что нажал пользователь (заголовок, цена, описание) - все сводится к родителю "card"
   const card = target.parentNode.classList.contains('card') ? target.parentNode : target.parentNode.parentNode;
   const cardItem = dataBase.find(item => item.id === +card.dataset.id); // Находим нужный элемент по ID
   // Отображаем информацию в модальном окне
   modalItem.insertAdjacentHTML('beforeend', `
      <div class="modal__block">
         <h2 class="modal__header">Купить</h2>
         <div class="modal__content">
            <div><img class="modal__image modal__image-item" src="data:image/jpeg;base64, ${cardItem.image}" alt="test"></div>
            <div class="modal__description">
               <h3 class="modal__header-item">${cardItem.nameItem}</h3>
               <p><strong>Состояние</strong>: <span class="modal__status-item">${cardItem.status}</span></p>
               <p><strong>Описание</strong>:
                  <span class="modal__description-item">${cardItem.descriptionItem}</span>
               </p>
               <p><strong>Цена</strong>: <span class="modal__cost-item">${cardItem.costItem} ₽</span></p>
               <button class="btn">Купить</button>
            </div>
         </div>
         <button class="modal__close">&#10008;</button>
      </div>
   `);
}

// Введение чего то в поле поиска
searchInput.addEventListener('input', event => {
   
   const valueSearch = searchInput.value.trim().toLowerCase();

   // Выдает все результаты поиска в БД
   if (valueSearch.length > 2){
      
      const result = dataBase.filter(item => item.nameItem.toLowerCase().includes(valueSearch) || item.descriptionItem.toLowerCase().includes(valueSearch));
      renderCard(result);

   }

   // Выводит все товары
   else {
      renderCard()
   }

});

// Событие изменения фотки
modalFileInput.addEventListener('change', event => {

   const target = event.target; // На что кликнули

   const reader = new FileReader(); // Считыватель файла

   const file = target.files[0]; // Находит все загруженные файлы

   infoPhoto.filename = file.name; // Имя файла
   infoPhoto.size = file.size; // Размер файла

   reader.readAsBinaryString(file); // Преобразуем в двоичную строку

   // Зарузка фото
   reader.addEventListener('load', event => {
      // Размер меньше 200 кб
      if (infoPhoto.size < 200000) {
         modalFileBtn.textContent = infoPhoto.filename; // Имя файла отоббражается в кнопке загрузки
         infoPhoto.base64 = btoa(event.target.result); // Кодируем строку
         modalImageAdd.src = `data:image/jpeg;base64, ${infoPhoto.base64}`; // Присваиваем строку к пути до файла
      }
      // Файл больше 200 кб
      else {
         modalFileBtn.textContent = 'Файл не должен превышать 200кб'; // Отображается в кнопке загрузки
         modalFileInput.value = ''; // Обнуляется значение
         checkForm(); // Проверяется форма
      }
   });

})

// Проверка заполнения всех полей формы
modalSubmit.addEventListener('input', checkForm);

// Проверка отправки формы
modalSubmit.addEventListener('submit', event => {
   event.preventDefault(); // Запрещает перезапуск страницы
   const itemObj = {}; // СОздает объект формы
   // Перебирает все значения из формы и заносит их в объект
   for (const elem of elementsModalSubmit) {
      itemObj[elem.name] = elem.value;
      itemObj.id = counter++;
   }
   itemObj.image = infoPhoto.base64;
   dataBase.push(itemObj); // добавление объекта в БД
   closeModal({target: modalAdd}); // Закрываем окно
   saveDB(); // Сохранение БД
   renderCard(); // Отображение
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
      showItem(target);
      modalItem.classList.remove('hide'); // Показывает модальное окно товара
      document.body.addEventListener('keydown', closeModal); // Добавляем слушателя при нажатии на кнопку
   }

})

// Нажатие по ссылкам на странице
menuContainer.addEventListener('click', event => {
   const target = event.target;
   if (target.tagName === 'A'){
      const result = dataBase.filter(item => item.category === target.dataset.category);
      renderCard(result);
   }
})

// События закрытие окон
modalItem.addEventListener('click', closeModal);
modalAdd.addEventListener('click', closeModal);
renderCard();