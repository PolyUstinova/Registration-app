"use strict";

/*!!!! Сделать рефакторинг кода !!!!
допилить дизайн
контент для пользователей*/

let view_log = document.querySelector('#view_log');
let view_reg = document.querySelector('#view_registration');
let reg_or_log = document.querySelector('#reg_or_log');
let log_out_btn = document.querySelector('#log_out_btn');
let reg_btn = document.querySelector('#reg_btn');
let forgot_pass_btn = document.querySelector('#forgot_password');
let reset_btn = document.querySelector('#reset_btn');
let reg_block_form = document.querySelector('#registr_block_form');
let back_btns = document.querySelectorAll('.back');
let back_log_btn = document.querySelector('.back_log');
let content = document.querySelector('#content');
let p_content = document.querySelector('#p_content');
let img_content = document.querySelector('#img_content');
let flag_login = false;

view_reg.addEventListener('click', getRegistrForm);
view_log.addEventListener('click', getLoginForm);

for(let btn of back_btns){
    btn.addEventListener('click', backToLogorReg);
}

let adminObj = {"login" : "admin", "password" : "admin123", "role" : "administrator"};
localStorage.setItem("admin", JSON.stringify(adminObj));

function getLoginForm(){
    let log_block_form = document.querySelector('#log_block_form');
    log_block_form.style.display = "block";
    reg_or_log.style.display = "none";
    let log_btn = document.querySelector('#log_btn');
    log_btn.addEventListener('click', getLogin);
    forgot_pass_btn.addEventListener('click', viewReset);
}

function getRegistrForm(){
    reg_block_form.style.display = "block";
    log_block_form.style.display = "none";
    reg_or_log.style.display = "none";
    reg_btn.addEventListener('click', registrationUser);
}

function getLogin() {
    let login_input = document.querySelector('#log_input').value;
    let password_input = document.querySelector('#pass_input').value;
    checkLoginAndPassword(login_input, password_input);
}

function checkLoginAndPassword(login, password){
    let flag = false;
    let role;
    let content = document.querySelector('#content');
    let info = document.querySelector('#info');
    let storage_keys = Object.keys(localStorage);
    for(let key of storage_keys){
        let object = JSON.parse(localStorage.getItem(key));
        if(object["login"] == login && object["password"] == password){
            flag = true;
            log_block_form.style.display = "none";
            content.style.display = "block";
            p_content.style.display = "none";
            img_content.style.display = "none";
            info.innerHTML = `Welcome, ${login}`;
            log_out_btn.innerHTML = "Log out";
            role = object["role"];
            checkRole(role);
        }
    }
    if(!flag){
        log_block_form.style.display = "none";
        content.style.display = "block";
        info.innerHTML = "Error! Incorrect login or password";
        p_content.style.display = "none";
        img_content.style.display = "none";
        log_out_btn.innerHTML = "Back to log in/registration";
    }
    log_out_btn.addEventListener('click', logOut);
}

function checkRole(role){
    if(role == "user"){
        p_content.style.display = "block";
        img_content.style.display = "none";
    } else if(role == "administrator"){
        img_content.style.display = "block";
        p_content.style.display = "none";
    }

}

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
        info.innerHTML = `Welcome, ${login}`;
        log_out_btn.style.display = "block";
    } else if (password != repeat_password) {
        content.style.display = "block";
        info.innerHTML = "Error! Passwords don't match";
        p_content.style.display = "none";
        img_content.style.display = "none";
        log_out_btn.style.display = "none";
    } 
    if (flag_login == true) {
        content.style.display = "block";
        info.innerHTML = "Error! This login is busy";
        log_out_btn.style.display = "none";
        p_content.style.display = "none";
        img_content.style.display = "none";
        flag_login = false;
    }
    log_out_btn.addEventListener('click', logOut);
}

function checkLogin(login){
    let storage_keys = Object.keys(localStorage);
    for(let key of storage_keys){
        let objCheck = JSON.parse(localStorage.getItem(key));
        if(objCheck["login"] == login){
            flag_login = true;
            content.style.display = "block";
            info.innerHTML = "Error! This login is busy";
            log_out_btn.style.display = "none";
            p_content.style.display = "none";
            img_content.style.display = "none";
        }
    }
}

function logOut(){
    content.style.display = "none";
    reg_or_log.style.display = "block";
}

function viewReset(){
    let reset_pass_block = document.querySelector('#reset_pass_block');
    reset_pass_block.style.display = "block";
    log_block_form.style.display = "none";
    reg_or_log.style.display = "none";
    reset_btn.addEventListener('click', resetPassword);
    back_log_btn.addEventListener('click', backToLog);
}

function resetPassword(){
    let reset_login = document.querySelector('#log_reset_input').value;
    let reset_pass = document.querySelector('#newpass_reset_input').value;
    let repeat_reset_pass = document.querySelector('#repeatpass_reset_input').value;
    let userObj = JSON.parse(localStorage.getItem(reset_login));
    if(repeat_reset_pass == reset_pass){
        let newUserObj = {"login":reset_login, "password":reset_pass, "role":userObj["role"]};
        localStorage.setItem(reset_login, JSON.stringify(newUserObj));
        content.style.display = "block";
        info.innerHTML = "Password was succesfully changed";
        log_out_btn.style.display = "none";
        p_content.style.display = "none";
        img_content.style.display = "none";
    } 
}

function backToLogorReg(){
    log_block_form.style.display = "none";
    reg_block_form.style.display = "none";
    reset_pass_block.style.display = "none";
    content.style.display = "none";
    reg_or_log.style.display = "block";

}

function backToLog(){
    reset_pass_block.style.display = "none";
    log_block_form.style.display = "block";
    content.style.display = "none";
}

