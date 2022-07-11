const pausePlayBtn = document.querySelector('#pause-play-btn');
const audio = document.querySelector('#player')
audio.volume = 0.4;

// Play and pause track
pausePlayBtn.addEventListener('click', (e) => {
  const stats  = e.path[0].attributes.src.nodeValue;
  if (stats == './icons/pause.png') {
    e.path[0].attributes.src.nodeValue = './icons/play.png';
    audio.play();
  } else {
    e.path[0].attributes.src.nodeValue = './icons/pause.png';
    audio.pause();
  }
});