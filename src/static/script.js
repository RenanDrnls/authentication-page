const email = document.querySelector("#email");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const newUserForm = document.querySelector("#insert-user-form")

function validateFormPass(){
    if((email.value.length > 0) && (username.value.length > 0) && (password.value.length > 0) && (confirmPassword.value.length > 0)){
        if(password.value == confirmPassword.value){
            return true;
        } else {
            alert("The both fields of password not are equals, please check this.");
            return false;
        }
    } else {
        alert("All the fields need information!");
        return false;
    }
}