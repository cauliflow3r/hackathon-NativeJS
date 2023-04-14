let register = document.querySelector("#register")
let signIn = document.querySelector("#signIn")

register.addEventListener('click',()=>{
    window.location.href = "./registration/register.html"
})
signIn.addEventListener('click',()=>{
    window.location.href = "./login/login.html"
})