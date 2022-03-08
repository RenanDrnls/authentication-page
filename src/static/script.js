const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const newUserForm = document.querySelector("#insert-user-form")

function validateFormPass(){
    if(password.value == confirmPassword.value){
        alert("Account created successfully!");
        return true;
    } else {
        alert("The both fields of password not are equals, please check this.");
        return false;
    }
}