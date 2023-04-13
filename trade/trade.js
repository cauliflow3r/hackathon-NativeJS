let itemsAPI = "http://localhost:8001/items";
let form = document.querySelector("form");
let itemName = document.querySelector('#inpName')
let itemImage = document.querySelector('#inpImg')
let itemPrice = document.querySelector('#inpPrice')
let itemAddress = document.querySelector('#address')

let btnCreate = document.getElementById("btnCreate");
let cardsContainer = document.querySelector(".cardsContainer")


// Функция для чтения комментариев
async function readItems() {
  let res = await fetch(itemsAPI);
  let data = await res.json();
//   form.innerHTML = "";
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
readItems()

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
