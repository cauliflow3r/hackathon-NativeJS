let username = document.querySelector("#username")
let password = document.querySelector("#password")
let signIn = document.querySelector("#signIn")
let usersAPI = "http://localhost:8001/users"
let formRegistration = document.querySelector('form')

async function readUsers(){
    let res = await fetch(usersAPI)
    let data = await res.json()
    let checker = ""
    data.forEach(elem=>{
      if(elem.name === username.value){
        checker.push(elem)
      }
      if(checker){
        // alert("successful login")
      }else{
        // alert("user doesnt exist but im too tired right now")
      }
      
    })
}
readUsers()
let newUser = {
          username: username.value,
          password: password.value,
          ballance: Math.floor(Math.random()*100),
          status: false
      }
      


// formRegistration.addEventListener("submit", (e) => {
//     e.preventDefault();
//     //   Проверка на заполненность полей
//     if (!username.value.trim() || !password.value.trim()) {
//       alert("Заполните все поля!");
//       return;
//     }
//     let newUser = {
//         username: username.value,
//         password: password.value,
//         ballance: Math.floor(Math.random()*100),
//         status: false
//     }
//     createUser(newUser);
//   });
  
//   async function createUser(objProf) {
//     await fetch(usersAPI, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json; charset=utf-8",
//       },
//       body: JSON.stringify(objProf),
//     });
  
//     readUsers();
//     username.value = "";
//     password.value = "";
//   }


