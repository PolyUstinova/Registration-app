"use strict";

view_reg.addEventListener('click', getRegistrForm);
view_log.addEventListener('click', getLoginForm);

for(let btn of back_btns){
    btn.addEventListener('click', backToLogorReg);
}

localStorage.setItem("admin", JSON.stringify(adminObj));

//Получение формы авторизации
function getLoginForm(){
    let log_block_form = document.querySelector('#log_block_form');
    log_block_form.style.display = "block";
    reg_or_log.style.display = "none";
    log_btn.addEventListener('click', autorizationUser);
    forgot_pass_btn.addEventListener('click', viewReset);
}

//Получение формы регистрации
function getRegistrForm(){
    reg_block_form.style.display = "block";
    reg_or_log.style.display = "none";
    reg_btn.addEventListener('click', registrationUser);
}

//Авторизация пользователя
function autorizationUser(){
    let login_input = document.querySelector('#log_input').value;
    let password_input = document.querySelector('#pass_input').value;
    let result = checkLoginAndPassword(login_input, password_input);
    if(result == true){
        flag = true;
        log_block_form.style.display = "none";
        content.style.display = "block";
        log_out_btn.style.display = "block";
        p_content.style.display = "none";
        img_content.style.display = "none";
        slider.style.display = "block";
        info.innerHTML = `Welcome, ${login_input}`;
        let object = JSON.parse(localStorage.getItem(login_input));
        role = object["role"];
        checkRole(role);
    }
    log_out_btn.addEventListener('click', logOut);
}

//Проверка логина и пароля
function checkLoginAndPassword(login, password){
    let flag = false;
    let storage_keys = Object.keys(localStorage);
    for(let key of storage_keys){
        let object = JSON.parse(localStorage.getItem(key));
        if(object["login"] == login && object["password"] == password){
            flag = true;
            return true;
        } 
    }
    if(!flag){
        takeErrorBlock("Error! Incorrect login or password");
    }
}

//Проверка роли пользователя
function checkRole(role){
    if(role == "user"){
        p_content.style.display = "block";
        img_content.style.display = "none";
    } else if(role == "administrator"){
        img_content.style.display = "block";
        p_content.style.display = "none";
    }
}

//Регистрация пользователя
function registrationUser(){
    let login = document.querySelector('#log_reg_input').value;
    let password = document.querySelector('#pass_reg_input').value;
    let repeat_password = document.querySelector('#repeat_pass_input').value;
    let reg_block_form = document.querySelector('#registr_block_form');
    checkLogin(login);
    if(password == repeat_password && flag_login == false){
        let obj = {"login" : login, "password" : password, "role" : "user"};
        localStorage.setItem(login, JSON.stringify(obj));
        reg_block_form.style.display = "none";
        content.style.display = "block";
        p_content.style.display = "none";
        img_content.style.display = "none";
        slider.style.display = "none";
        info.innerHTML = `Welcome, ${login}`;
        log_out_btn.style.display = "block";
    } else if (password != repeat_password) {
        takeErrorBlock("Error! Passwords don't match");
    } 
    if (flag_login == true) {
        takeErrorBlock("Error! This login is busy");
        flag_login = false;
    }
    log_out_btn.addEventListener('click', logOut);
}

//Проверка занятости логина
function checkLogin(login){
    let storage_keys = Object.keys(localStorage);
    for(let key of storage_keys){
        let objCheck = JSON.parse(localStorage.getItem(key));
        if(objCheck["login"] == login){
            flag_login = true;
            takeErrorBlock("Error! This login is busy");
        }
    }
}

//Выход из аккаунта
function logOut(){
    content.style.display = "none";
    reg_or_log.style.display = "block";
}

//Получение формы восстановления пароля
function viewReset(){
    let reset_pass_block = document.querySelector('#reset_pass_block');
    reset_pass_block.style.display = "block";
    log_block_form.style.display = "none";
    reg_or_log.style.display = "none";
    content.style.display = "none";
    reset_btn.addEventListener('click', resetPassword);
    back_log_btn.addEventListener('click', backToLog);
}

//Восстановление пароля
function resetPassword(){
    let reset_login = document.querySelector('#log_reset_input').value;
    let reset_pass = document.querySelector('#new_pass_reset_input').value;
    let repeat_reset_pass = document.querySelector('#repeat_pass_reset_input').value;
    let userObj = JSON.parse(localStorage.getItem(reset_login));
    if(repeat_reset_pass == reset_pass && userObj != null){
        let newUserObj = {"login" : reset_login, "password" : reset_pass, "role" : userObj["role"]};
        localStorage.setItem(reset_login, JSON.stringify(newUserObj));
        takeErrorBlock("Password was succesfully changed");
    } else if (repeat_reset_pass != reset_pass){
        takeErrorBlock("Error! Passwords don't match");
    } else if (userObj == null) {
        takeErrorBlock("Error! This login don't exist");
    }
}

//Возврат к выбору авторизации или регистрации
function backToLogorReg(){
    log_block_form.style.display = "none";
    reg_block_form.style.display = "none";
    reset_pass_block.style.display = "none";
    content.style.display = "none";
    reg_or_log.style.display = "block";

}

//Возврат к форме авторизации
function backToLog(){
    reset_pass_block.style.display = "none";
    log_block_form.style.display = "block";
    content.style.display = "none";
}

//Вывод блока с ошибкой
function takeErrorBlock(errorText){
    content.style.display = "block";
    info.innerHTML = errorText;
    log_out_btn.style.display = "none";
    p_content.style.display = "none";
    img_content.style.display = "none";
    slider.style.display = "none";
}