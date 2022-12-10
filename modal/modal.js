console.log("model.js is connected")
 
//Global Variables

const openBtn = document.querySelector("#openModal");  
const modal = document.querySelector("#modal");
const closeBtn = document.querySelector("#close");

// Functions
const openModal = () => {
modal.style.display = 'flex';
};

const closeModal = () => {
modal.style.display = 'none';
};

//Event Listeners
openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);

setTimeout(closeModal, 10000);