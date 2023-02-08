"use strict";

/*!!!! Сделать рефакторинг кода !!!!*/

let view_log = document.querySelector('#view_log');
let view_reg = document.querySelector('#view_registration');
let reg_or_log = document.querySelector('#reg_or_log');
let log_out_btn = document.querySelector('#log_out_btn');
let reg_btn = document.querySelector('#reg_btn');
let forgot_pass_btn = document.querySelector('#forgot_password');
let reset_btn = document.querySelector('#reset_btn');

view_log.addEventListener('click', getLoginForm);
view_reg.addEventListener('click', getRegistrForm);
reg_btn.addEventListener('click', registrationUser);
forgot_pass_btn.addEventListener('click', viewReset);
reset_btn.addEventListener('click', resetPassword);


function getLoginForm(){
    let log_block_form = document.querySelector('#log_block_form');
    log_block_form.style.display = "block";
    reg_or_log.style.display = "none";
    let log_btn = document.querySelector('#log_btn');
    log_btn.addEventListener('click', getLogin)
}

function getRegistrForm(){
    let reg_block_form = document.querySelector('#registr_block_form');
    reg_block_form.style.display = "block";
    reg_or_log.style.display = "none";
}

function getLogin() {
    let login_input = document.querySelector('#log_input').value;
    let password_input = document.querySelector('#pass_input').value;
    checkLoginAndPassword(login_input, password_input);
}

function checkLoginAndPassword(login, password){
    let flag = false;
    let content = document.querySelector('#content');
    let info = document.querySelector('#info');
    let storage_keys = Object.keys(localStorage);
    for(let key of storage_keys){
        if(key == login && localStorage.getItem(key) == password){
            flag = true;
            log_block_form.style.display = "none";
            content.style.display = "block";
            info.innerHTML = `Welcome, ${login}`;
            log_out_btn.innerHTML = "Log out";
        }
    }
    if(!flag){
        log_block_form.style.display = "none";
        content.style.display = "block";
        info.innerHTML = "Error!";
        log_out_btn.innerHTML = "Back to log in/registration";
    }
    log_out_btn.addEventListener('click', logOut);
}

function registrationUser(){
    let content = document.querySelector('#content');
    let login = document.querySelector('#log_reg_input').value;
    let password = document.querySelector('#pass_reg_input').value;
    let repeat_password = document.querySelector('#repeat_pass_input').value;
    let reg_block_form = document.querySelector('#registr_block_form');
    if(password == repeat_password){
        localStorage.setItem(login, password);
        reg_block_form.style.display = "none";
        content.style.display = "block";
        info.innerHTML = `Welcome, ${login}`;
    } else if (password != repeat_password) {
        content.style.display = "block";
        info.innerHTML = "Error! Passwords don't match";
        log_out_btn.style.display = "none";
    }
    log_out_btn.addEventListener('click', logOut);
}

function logOut(){
    content.style.display = "none";
    reg_or_log.style.display = "block";
}

function viewReset(){
    let reset_pass_block = document.querySelector('#reset_pass_block');
    reset_pass_block.style.display = "block";
    log_block_form.style.display = "none";
}

function resetPassword(){
    let reset_login = document.querySelector('#log_reset_input').value;
    let reset_pass = document.querySelector('#newpass_reset_input').value;
    let reset_last = document.querySelector('#lastpass_reset_input').value;
    let last_pass = localStorage.getItem(reset_login);
    if(reset_last == last_pass){
        localStorage.setItem(reset_login, reset_pass);
    } else {
        content.style.display = "block";
        info.innerHTML = "Error! Last password is wrong";
        log_out_btn.style.display = "none";
    }
}



