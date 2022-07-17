// Note: All functionalities in the user interface are here

// If no music played then show the list
if (!audio.src) {
  closeBtn.src = './icons/close.png';
  closeBtn.style.pointerEvents = 'none';
  list.style.bottom = '0%'
  bgImg.style.opacity = 0;
  controls.style.opacity = 0;
  controls.style.zIndex = -1;
  bgIcon.style.opacity = 0;
}

// Close error modal
closeErrorModal.addEventListener('click', () => {
  errorModal.style.opacity = 0;
});

// Display all controls when mouse enters the display area
document.body.addEventListener('mouseover', () => {
  if (closeMenu) {
    bgImg.style.opacity = 0;
    controls.style.opacity = 1;
    bgIcon.style.opacity = 1;
  }
})

// Hide all controls when mouse leaves the display area
document.body.addEventListener('mouseleave', () => {
  if (closeMenu) {
    bgImg.style.opacity = 1;
    controls.style.opacity = 0;
    bgIcon.style.opacity = 0;
  }
})

// Open playlist
openBtn.addEventListener('click',() => {
  closeBtn.style.display = 'block';
  list.style.bottom = '0%'
  list.style.transition = 'all 2s';
  closeMenu = false;
  bgImg.style.opacity = 0;
  controls.style.opacity = 0;
  controls.style.zIndex = -1;
  bgIcon.style.opacity = 0;
})

// Close playlist
closeBtn.addEventListener('click', (e) => {
  closeBtn.style.display = 'none';
  list.style.bottom = '-100%'
  list.style.transition = 'all 2s';
  closeMenu = true;
  controls.style.opacity = 1;
  controls.style.zIndex = 1;
  bgIcon.style.opacity = 1;

  // if (currentIMG  === './icons/menu.png') {
  //   menu.src = './icons/close.png';
  //   list.style.bottom = '0%'
  //   list.style.transition = 'all 2s';
  //   closeMenu = false;
  //   bgImg.style.opacity = 0;
  //   controls.style.opacity = 0;
  //   controls.style.zIndex = -1;
  //   bgIcon.style.opacity = 0;
  // } else {
  //   menu.src = './icons/menu.png';
  //   list.style.bottom = '-100%'
  //   list.style.transition = 'all 2s';
  //   closeMenu = true;
  //   controls.style.opacity = 1;
  //   controls.style.zIndex = 1;
  //   bgIcon.style.opacity = 1;
  // }
})

// Show song list in local playlist
localBtn.addEventListener('click', () => {
  localList.style.display = 'block';  
  ytList.style.display = 'none';
})

// Show song list in YouTube playlist
ytBtn.addEventListener('click', () => {
  localList.style.display = 'none';
  ytList.style.display = 'block';
}) 