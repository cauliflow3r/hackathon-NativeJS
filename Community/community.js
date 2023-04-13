let forumAPI = "http://localhost:8001/forum";
let user = document.querySelector("#username");
let comment = document.querySelector("#comment");
let forumContainer = document.querySelector(".forum_container"); // fixed variable name
let postBtn = document.querySelector("#postBtn");
let creationForm = document.querySelector('.forem');
let deleteBtn = document.querySelector("#deleteBtn");

async function readComments() {
  let res = await fetch(forumAPI);
  let data = await res.json();
  forumContainer.innerHTML = ""; // clear previous content
  data.forEach((element) => {
    forumContainer.innerHTML += `<div class="forum">
        <h2>
          <img
            style="width: 30px"
            src="https://www.pngall.com/wp-content/uploads/10/Message-Logo-PNG-Photo.png"
            alt=""
          />
          ${element.name}
        </h2>
        <h3>${element.comment}</h3>
        <div class="btns">
        <button id="deleteBtn" onclick="deleteComment(${element.id})">Delete</button>
        <button id="editBtn">Edit</button>
        </div>
        
      </div>`;
  });
}

readComments();

creationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   Проверка на заполненность полей
  if (!comment.value.trim() || !user.value.trim()) {
    alert("Заполните все поля!");
    return;
  }
  let newComment = {
    name: user.value,
    comment: comment.value,
  };
  createProfile(newComment);
  // console.log(newComment);
});

// Create - добавление новых данных
async function createProfile(objProf) {
  await fetch(forumAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(objProf),
  });

  readComments();
  user.value = "";
  comment.value = "";
}
async function deleteComment(id) {
  await fetch(`${forumAPI}/${id}`, {
    method: "DELETE",
  });
  readComments();
  // console.log("deleted");
}
// deleteBtn.addEventListener("click", deleteComment());







