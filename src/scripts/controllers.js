// Get current time
function getCurrentTime() {
  audio.currentTime = audio.duration * (slider.value / 100);
}

// Update progress bar
const progress = () =>  {
  const progress = (audio.currentTime / audio.duration) * 100;
  slider.value = progress;
}

// Set volume
function setVolume() {
  audio.volume = volumeValue.value / 100;
}

// Show or remove slider
volumeBtn.addEventListener('click', () => {
  if (showVolume == false) {
    showVolume = true;
    volumeValue.style.opacity = '1';
  } else {
    showVolume = false;
    volumeValue.style.opacity = '0';
  }
})

// Auto-play current status of the player
audio.addEventListener('ended', () => {
  if (repeat)
      audio.setAttribute('loop', '');
  else if (randomShuffle) {
    audio.removeAttribute('loop');
    shuffle();
  }
  else 
    nextTrack();
});

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

// Next track
nextBtn.addEventListener('click', nextTrack);
function nextTrack() {
  const currentId = audio.src.split('/').pop().split('.mp3')[0];

  if (randomShuffle) {
    shuffle();
    return;
  }

  if (repeat) {
    audio.load();
    audio.play();
    return;
  }

  clearInterval(progress);
  setInterval(progress, 500);

  localStorageList.forEach((song, index) => {
    if (song.id == currentId && index < localStorageList.length - 1) {
      audio.src = "./music/" +  localStorageList[index + 1].id + ".mp3";
      audio.play();
      
      bgTitle.innerHTML = localStorageList[index + 1].title;
      bgImg.src = localStorageList[index + 1].thumbnail;
      img.src = localStorageList[index + 1].thumbnail;
      ytIcon.src = localStorageList[index + 1].thumbnail;  
    } 
    else if (song.id == currentId && index == localStorageList.length - 1) {
      audio.src = "./music/" +  localStorageList[0].id + ".mp3";
      audio.play();
      
      bgTitle.innerHTML = localStorageList[0].title;
      bgImg.src = localStorageList[0].thumbnail;
      img.src = localStorageList[0].thumbnail;
      ytIcon.src = localStorageList[0].thumbnail;
    }
  });
}

// Previous track
previousBtn.addEventListener('click', () => {
  clearInterval(progress);
  setInterval(progress, 500);

  if (randomShuffle) {
    shuffle();
    return;
  }

  if (repeat) {
    audio.load();
    audio.play();
    return;
  }

  const currentId = audio.src.split('/').pop().split('.mp3')[0];

  localStorageList.forEach((song, index) => {
    if (song.id == currentId && index > 0) {
      audio.src = "./music/" +  localStorageList[index - 1].id + ".mp3";
      audio.play();
      
      bgTitle.innerHTML = localStorageList[index - 1].title;
      bgImg.src = localStorageList[index - 1].thumbnail;
      img.src = localStorageList[index - 1].thumbnail;
      ytIcon.src = localStorageList[index - 1].thumbnail;
    } 
    else if (song.id == currentId && index == 0) {
      audio.src = "./music/" +  localStorageList[localStorageList.length - 1].id + ".mp3";
      audio.play();
      
      bgTitle.innerHTML = localStorageList[localStorageList.length - 1].title;
      bgImg.src = localStorageList[localStorageList.length - 1].thumbnail;
      img.src = localStorageList[localStorageList.length - 1].thumbnail;
      ytIcon.src = localStorageList[localStorageList.length - 1].thumbnail;
    }
  });
});

// Repeat track
repeatBtn.addEventListener('click', () => {
  clearInterval(progress);
  setInterval(progress, 500);
  
  if (repeat == false) {
    repeat = true;
    randomShuffle = false;
    audio.setAttribute('loop', '');
    repeatBtn.src = './icons/repeat-active.png';
    shuffleBtn.src = './icons/shuffle.png';
  } else {
    repeat = false;
    audio.removeAttribute('loop');
    repeatBtn.src = './icons/repeat.png';
  }
});

// Shuffle track
shuffleBtn.addEventListener('click', () => {
  clearInterval(progress);
  setInterval(progress, 500);

  if (randomShuffle == false) {
    randomShuffle = true;
    repeat = false;
    audio.removeAttribute('loop');
    shuffleBtn.src = './icons/shuffle-active.png';
    repeatBtn.src = './icons/repeat.png';
  }
  else {
    shuffleBtn.src = './icons/shuffle.png';
    randomShuffle = false;
  }
})

function shuffle() {  
  clearInterval(progress);
  setInterval(progress, 500);
  
  const randomIndex = Math.floor(Math.random() * localStorageList.length);
  audio.src = "./music/" +  localStorageList[randomIndex].id + ".mp3";
  audio.play();
  
  bgTitle.innerHTML = localStorageList[randomIndex].title;
  bgImg.src = localStorageList[randomIndex].thumbnail;
  img.src = localStorageList[randomIndex].thumbnail;
  ytIcon.src = localStorageList[randomIndex].thumbnail;
}