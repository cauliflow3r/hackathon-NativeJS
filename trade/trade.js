// let itemsAPI = "http://localhost:8001/items";
// let form = document.querySelector("form");
// let itemName = document.querySelector('#inpName')
// let itemImage = document.querySelector('#inpImg')
// let itemPrice = document.querySelector('#inpPrice')
// let itemAddress = document.querySelector('#address')

// let btnCreate = document.getElementById("btnCreate");
// let cardsContainer = document.querySelector(".cardsContainer")
// let prevBtn = document.querySelector("#prevBtn");
// let nextBtn = document.querySelector("#nextBtn");


// // Функция для чтения комментариев
// async function readItems() {
//   let res = await fetch(itemsAPI);
//   let data = await res.json();
// //   form.innerHTML = "";
// console.log(data)
//   data.forEach(element => {
//     cardsContainer.innerHTML += `<div class="card">
//         <img
//           src="${element.image}"
//           alt="Фото 1"
//         />
//         <h3>${element.itemName}</h3>
//         <p>${element.itemPrice}</p>
//       </div>`;
//   });
// }
// readItems()

// // Функция для отправки данных на сервер
// async function createItem(itemData) {
//     await fetch(itemsAPI, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(itemData)
//     });
//       readItems(); 
      
//     }

// // Добавляем слушатель события "click" на кнопку "btnCreate"
// btnCreate.addEventListener("click", () => {
//   // Получаем данные из формы (предполагаем, что они уже валидированы и подготовлены)
//   let itemData = {
//     img: itemImage.value,
//     name: itemName.value,
//     price: itemPrice.value,
//     address: itemAddress.value
//   };
//   createItem(itemData); // Отправляем данные на сервер
// });



// // ! ================= Pagination ==========

// async function countPages() {
//     let res = await fetch(API);
//     let data = await res.json();
//     pageLength = Math.ceil(data.length / 3);
//   }
  
//   prevBtn.addEventListener("click", () => {
//     if (currentPage <= 1) return;
//     currentPage--;
//     createItem();
//   });
  
//   nextBtn.addEventListener("click", () => {
//     if (currentPage >= pageLength) return;
//     currentPage++;
//     createItem();
//   });








let itemsAPI = "http://localhost:8001/items";
let form = document.querySelector("form");
let itemName = document.querySelector('#inpName')
let itemImage = document.querySelector('#inpImg')
let itemPrice = document.querySelector('#inpPrice')
let itemAddress = document.querySelector('#address')

let btnCreate = document.getElementById("btnCreate");
let cardsContainer = document.querySelector(".cardsContainer")
let prevBtn = document.querySelector("#prevBtn");
let nextBtn = document.querySelector("#nextBtn");

let currentPage = 1; 
let pageLength = 1;

// Функция для чтения комментариев
async function readItems() {
  let res = await fetch(itemsAPI);
  let data = await res.json();
  cardsContainer.innerHTML = ""; // очищаем контейнер перед заполнением
  console.log(data)
  data.forEach(element => {
    cardsContainer.innerHTML += `<div class="card">
        <img
          src="${element.image}"
          alt="Фото 1"
        />
        <h3>${element.itemName}</h3>
        <p>${element.itemPrice}</p>
      </div>`;
  });
}

// Функция для отправки данных на сервер
async function createItem(itemData) {
  await fetch(itemsAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(itemData)
  });
  readItems(); 
}

// Добавляем слушатель события "click" на кнопку "btnCreate"
btnCreate.addEventListener("click", () => {
  // Получаем данные из формы (предполагаем, что они уже валидированы и подготовлены)
  let itemData = {
    img: itemImage.value,
    name: itemName.value,
    price: itemPrice.value,
    address: itemAddress.value
  };
  createItem(itemData); // Отправляем данные на сервер
});

// Функция для расчета общего количества страниц
async function countPages() {
  let res = await fetch(itemsAPI);
  let data = await res.json();
  pageLength = Math.ceil(data.length / 3);
}

// Обработчик события на кнопке "prevBtn"
prevBtn.addEventListener("click", () => {
  if (currentPage <= 1) return;
  currentPage--;
  readItems(); // Чтение данных для предыдущей страницы
});

// Обработчик события на кнопке "nextBtn"
nextBtn.addEventListener("click", () => {
  if (currentPage >= pageLength) return;
  currentPage++;
  readItems(); // Чтение данных для следующей страницы
});

// Вызываем функцию для расчета общ

