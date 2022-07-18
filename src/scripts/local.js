// Load templates and song list
loadLocal();

function loadLocal() {
  parseLocalStorage()

  // If localStorage is empty
  if (localStorageList == false) {
    localEmptyList.style.display = 'block';
  } else {
    localEmptyList.style.display = 'none';
  }

  const localResults = document.querySelector('.results');
  let template = '';
  localStorageList.forEach((song) => {
    template += `<li>
                  <img
                    src="${song.thumbnail}">
                  <span id="details">
                    <span id="title" onclick=playLocal('${song.id}')>
                      ${song.title}
                     </span>
                    <span id="options">
                      <span>${song.duration}</span> |
                      <span id="remove" onclick=removeLocal('${song.id}')> Remove </span> |
                      <span id="play" onclick=playLocal('${song.id}')> Play </span>
                    </span>
                  </span>
                </li>`
  });

  localResults.innerHTML = template;
}

function playLocal(songID) {
  clearInterval(progress);
  setInterval(progress, 500);
  
  closeBtn.style.pointerEvents = 'auto';

  const searchSong = songID;
  localStorageList.forEach((song) => {
    if (song.id == searchSong) {
      img.src = song.thumbnail;
      img.style.filter = 'brightness(0.5)';
      audio.src = `./music/${song.id}.mp3`;
      bgImg.src = song.thumbnail;
      ytIcon.src = song.thumbnail;
      bgTitle.textContent = song.title;

      audio.load();
      audio.play();
      pausePlayBtn.src = './icons/play.png';
    }  
  })
  
  // Show background image
  list.style.bottom = '-100%'
  list.style.transition = 'all 2s';
  closeBtn.style.display = 'none';
  closeMenu = true;
  controls.style.opacity = 1;
  controls.style.zIndex = 1;
  bgIcon.style.opacity = 1;
}

// Remove song locally
function removeLocal(songID) {
  localStorageList.forEach(async (song, index) => {
    if (song.id == songID) {
      localStorageList.splice(index, 1);
      localStorage.setItem('songs', JSON.stringify(localStorageList.reverse()));
      await fetch(`/remove/${song.id}`);
      parseLocalStorage();
    }
  });
  audio.pause();
  loadLocal();
}