 console.log("model.js is connected")
 
 //Grabbing Elements
  // Grabbing About the Game button
  const openBtn = document.querySelector("#openModal");

  // Grabbing modal element
  const modal = document.querySelector("#modal");

  // Grabbing close button
  const closeBtn = document.querySelector("#close");

  //Event Handlers
  // Event handler to open the modal
  const openModal = () => {
    modal.style.display = 'flex';
  };

  const closeModal = () => {
    modal.style.display = 'none';
  };

  //Event Listeners
  openBtn.addEventListener("click", openModal);

  closeBtn.addEventListener("click", closeModal);
 //
 
 setTimeout(closeModal, 10000);