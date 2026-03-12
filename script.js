const container = document.querySelector(".container");
const btn = document.querySelector(".switch")
btn.addEventListener('click',()=>{
    container.classList.toggle("dark-mode");
});