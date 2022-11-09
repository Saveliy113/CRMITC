
//          LOGIN FORM       //
const container = document.querySelector('.container')
const loginContainer = document.querySelector('.loginform__container')
const loginForm = document.querySelector('.login__form')
const form = document.querySelector("form")

loginContainer.addEventListener('click', hideLoginForm)
function hideLoginForm(event) {
    if(event.target.className == 'loginform__container')
    if(event.target.className !== 'login__form' && event.target.id !== 'username' && event.target.id !== 'password' && event.target.id !== 'login__btn') {
        loginForm.classList.add('ifHidden')
        loginContainer.classList.add('ifHidden')
    } else console.log('Hellio')
}

function openLogin() {
    loginForm.classList.remove('ifHidden')
    loginContainer.classList.remove('ifHidden')
}