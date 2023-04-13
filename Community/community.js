let forumAPI = "http://localhost:8001/forum";
let user = document.querySelector('#username');
let comment = document.querySelector("#comment");
let forumContainer = document.querySelector(".forum_container"); // fixed variable name
let postBtn = document.querySelector("#postBtn");

async function readComments(){
    let res = await fetch(forumAPI);
    let data = await res.json();
    forumContainer.innerHTML = ""; // clear previous content
    data.forEach(element => {
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
        <hr />
      </div>`;
    });
}

readComments();


postBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //   Проверка на заполненность полей
    // if (
    //   !inpName.value.trim() ||
    //   !inpImg.value.trim() ||
    //   !inpNumber.value.trim() ||
    //   !inpSkills.value.trim() ||
    //   !inpPrice.value.trim()
    // ) {
    //   alert("Заполните все поля!");
    //   return;
    // }
    let newComment = {
              name: user.value,
              comment: comment.value
            };
  createProfile(newComment);
  console.log(newComment)
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

//   let inputs = document.querySelectorAll("form input");
//   inputs.forEach((elem) => {
//     elem.value = "";
//   });
}


// postBtn.addEventListener('click', async () => {
//     let res = await fetch(forumAPI);
//     let data = await res.json();

//     // Create a new comment object
//     let newComment = {
//       name: user.value,
//       comment: comment.value
//     };

//     // Add the new comment to the "forum" array
//     data.push(newComment); // assuming "forum" is an array in your JSON data
//     console.log(data)
//     // Update the server with the new data
//     await fetch(forumAPI, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json; charset=utf-8",
//       },
//       body: JSON.stringify(data),
//     });

//     readComments(); // Update the forum container with the updated comments
// });
