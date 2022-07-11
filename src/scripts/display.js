const menu = document.querySelector('#menu');
const img = document.querySelector('.background');
const bgImg = document.querySelector('.background-music');
const list = document.querySelector('.list');
const controls = document.querySelector('.controls');
const bgIcon = document.querySelector('.bg-icon')
let change = true;

// Display all controls when mouse enters the display area
document.body.addEventListener('mouseover', () => {
  if (change) {
    bgImg.style.opacity = 0;
    controls.style.opacity = 1;
    bgIcon.style.opacity = 1;
  }
})

// Hide all controls when mouse leaves the display area
document.body.addEventListener('mouseleave', () => {
  if (change) {
    bgImg.style.opacity = 1;
    controls.style.opacity = 0;
    bgIcon.style.opacity = 0;
  }
})

// Display and close playlist
menu.addEventListener('click', (e) => {
  const currentIMG = e.path[0].attributes[0].nodeValue;
  if (currentIMG  === './icons/menu.png') {
    menu.src = './icons/close.png';
    list.style.bottom = '0%'
    list.style.transition = 'all 2s';
    img.style.filter = 'brightness(40%)';
    change = false;
    bgImg.style.opacity = 0;
    controls.style.opacity = 0;
    bgIcon.style.opacity = 0;
  } else {
    menu.src = './icons/menu.png';
    list.style.bottom = '-100%'
    list.style.transition = 'all 2s';
    img.style.filter = 'brightness(100%)';
    change = true;
    controls.style.opacity = 1;
    bgIcon.style.opacity = 1;
  }
})