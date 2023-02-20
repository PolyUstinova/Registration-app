"use strict";

let view_log = document.querySelector('#view_log');
let view_reg = document.querySelector('#view_registration');
let back_btns = document.querySelectorAll('.back');

let log_btn = document.querySelector('#log_btn');
let reg_or_log = document.querySelector('#reg_or_log');
let log_out_btn = document.querySelector('#log_out_btn');
let reg_btn = document.querySelector('#reg_btn');
let forgot_pass_btn = document.querySelector('#forgot_password');
let reset_btn = document.querySelector('#reset_btn');
let reg_block_form = document.querySelector('#registr_block_form');
let slider = document.querySelector('.slider');

let back_log_btn = document.querySelector('.back_log');
let content = document.querySelector('#content');
let info = document.querySelector('#info');
let p_content = document.querySelector('#p_content');
let img_content = document.querySelector('#img_content');

let adminObj = {"login" : "admin", "password" : "admin123", "role" : "administrator"};
let flag_login = false;
let flag = false;
let role;

