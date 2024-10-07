let menu = document.querySelector('#menu-bar');
let nav = document.querySelector('.navbar');
menu.onclick = ()=>{
    menu.classList.toggle('fa-times');
    nav.classList.toggle('nav-path');
}
// remove last classes when scroll 
window.onscroll = ()=>{
    menu.classList.remove('fa-times');
    nav.classList.remove('nav-path');
}