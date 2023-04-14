let username = document.querySelector("#username")
let password = document.querySelector("#password")
let registerBtn = document.querySelector("#register")
let usersAPI = "http://localhost:8001/users"
let formRegistration = document.querySelector('form')

async function readUsers(){
    let res = await fetch(usersAPI)
    let data = await res.json()
    console.log(data)
}
readUsers()

formRegistration.addEventListener("submit", (e) => {
    e.preventDefault();
    //   Проверка на заполненность полей
    if (!username.value.trim() || !password.value.trim()) {
      alert("Заполните все поля!");
      return;
    }
    let newUser = {
        username: username.value,
        password: password.value,
        ballance: Math.floor(Math.random()*100),
        status: false
    }
    createUser(newUser);
  });
  
  async function createUser(objProf) {
    await fetch(usersAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(objProf),
    });
  
    readUsers();
    username.value = "";
    password.value = "";
  }
  registerBtn.addEventListener('click',()=>{
    window.location.href = "../index.html";
  })

