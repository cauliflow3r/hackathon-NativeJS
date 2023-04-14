let itemsAPI = "http://localhost:8001/items";
let form = document.querySelector("form");
let itemName = document.querySelector('#inpName')
let itemImage = document.querySelector('#inpImg')
let itemPrice = document.querySelector('#inpPrice')
let itemAddress = document.querySelector('#address')
// let btnCreate = document.getElementById("btnCreate");
let itemCreationForm = document.querySelector('#itemCreationForm')
let cardsContainer = document.querySelector(".cardsContainer")
let prevBtn = document.querySelector("#prevBtn");
let nextBtn = document.querySelector("#nextBtn");
let inpSearch=document.querySelector("#inpSearch")
let currentPage = 1; 
let pageLength = 1;

let filterValue = "Вcё"
// *EDIT 
let editInpName = document.querySelector("#editInpName")
let editInpImage = document.querySelector("#editInpImage")
let editAddress = document.querySelector("#editAddress")
let editInpPrice = document.querySelector("#editInpPrice")
let editInpDesc = document.querySelector("#editInpDesc")
let btnSave = document.querySelector("#editForm button")
let closeBtn = document.querySelector("#closeEditModal")
// !FILTER
let filterBtns = document.querySelectorAll(".filter button")




async function readItems(search = "") {
  let res =
    filterValue !== "Все"
      ? await fetch(
          `${itemsAPI}?q=${search}&_page=${currentPage}&_limit=6&category=${filterValue}`
        )
      : await fetch(`${API}?q=${search}&_page=${currentPage}&_limit=6&category=${filterValue}`);
  let data = await res.json();
  cardsContainer.innerHTML = ""; 
  console.log(data)
  data.forEach(element => {
    cardsContainer.innerHTML += `<div class="card">
        <img
          src="${element.image}"
          alt="Фото 1"
        />
        <h3>${element.name}</h3>
        <p>${element.price}</p>
        <button onclick="deleteItem(${element.id})">delete</button>
        <button onclick="showModalEdit(${element.id})">edit</button>
      </div>`;
  });
  countPages()
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
  itemImage.value="",
  itemName.value="",
  itemPrice.value="",
  itemAddress.value=""
}
readItems()

// Добавляем слушатель события "click" на кнопку "btnCreate"
itemCreationForm.addEventListener("submit", (e) => {
  e.preventDefault()
  if (!itemName.value.trim() || !itemImage.value.trim()||!itemPrice.value.trim()||!itemAddress.value.trim()) {
    alert("Заполните все поля!");
    return;
  }
  // Получаем данные из формы (предполагаем, что они уже валидированы и подготовлены)
  let itemData = {
    image: itemImage.value,
    name: itemName.value,
    price: itemPrice.value,
    address: itemAddress.value
  };
  // console.log(itemData)
  createItem(itemData); // Отправляем данные на сервер
});

// Функция для расчета общего количества страниц
async function countPages() {
  let res = await fetch(itemsAPI);
  let data = await res.json();
  pageLength = Math.ceil(data.length / 6);
}
prevBtn.addEventListener("click", () => {
  if (currentPage <= 1) return;
  currentPage --;
  readItems();
});
nextBtn.addEventListener("click", () => {
  if (currentPage >= pageLength) return;
  currentPage ++;
  readItems();
});


// Вызываем функцию для расчета общ
inpSearch.addEventListener("input",(e)=>{
  readItems(e.target.value)
})

// !DELETE
async function deleteItem(id) {
  await fetch(`${itemsAPI}/${id}`, {
    method: "DELETE",
  });
  readItems();
}
//!EDIT
// editForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let editedProfile = {
//     image: editInpImage.value,
//     name: editInpName.value,
//     price: editInpPrice.value,
//     address: editAddress.value,
//     description: editInpDesc.value,
//   };
//   console.log(btnSave.id);
//   showModalEdit(editedProfile, btnSave.id);
// });

// async function showModalEdit(editedProfile,id) {
//   try {
//     await fetch(`${itemsAPI}/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json; charset=utf-8",
//       },
//       body: JSON.stringify(editedProfile),
//     });
//     modal.style.display = "none";
//     readItems();
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function showModalEdit(id) {
//   modal.style.display = "flex";
//   let res = await fetch(`${API}/${id}`);
//   let data = await res.json();
//   console.log(data);
//   editInpName.value = data.name;
//   editInpImage.value = data.image;
//   editInpNumber.value = data.number;
//   editInpDesc.value = data.skills;
//   editInpPrice.value = data.price;
//   btnSave.setAttribute("id", data.id);
// }
async function showModalEdit(id) {
  modal.style.display = "flex";
  let res = await fetch(`${itemsAPI}/${id}`);
  let data = await res.json();
  console.log(data);
  editInpName.value = data.name;
  editInpImage.value = data.image;
  editInpPrice.value = data.price;
  editAddress.value = data.address;
  editInpDesc.value = data.skills;
  btnSave.setAttribute("id", data.id);
}

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let editedItem = {
    image: editInpImage.value,
    name: editInpName.value,
    price: editInpPrice.value,
    address: editAddress.value,
    description: editInpDesc.value,
  };
  console.log(btnSave.id);
  editItems(editedItem, btnSave.id);
});

async function editItems(editedProfile, id) {
  try {
    await fetch(`${itemsAPI}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(editedProfile),
    });
    modal.style.display = "none";
    readItems();
  } catch (error) {
    console.error(error);
  }
}

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// !FIlter
filterBtns.forEach((elem) => {
  elem.addEventListener("click", () => {
    // console.log(elem.innerText);
    filterValue = elem.innerHTML;
    // readProfile();
   readItems()
  });
});
