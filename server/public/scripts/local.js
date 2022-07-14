let directory = []; // empty first
directoryList()
async function directoryList() {
  const req = await fetch('/directory');
  directory = await req.json()
}

loadLocal();
function loadLocal() {
  const localstorage = localStorage.getItem('songs');
  const localList = (localstorage == null) ? [] : JSON.parse(localstorage);
  const localResults = document.querySelector('.results');

  let template = '';
  localList.forEach((song) => {
    template += `
    <li>
      <img
        src="${song.thumbnail}">
      <span id="details">
        <span id="title">
          ${song.title}
        </span>
        <span id="options">
          <span>43:45 </span> |
          <span id="save"> Save </span> |
          <span id="play" onclick=playLocal('${song.id}')> Play </span>
        </span>
      </span>
    </li>`
  });

  localResults.innerHTML = template;
}

function playLocal(songID) {
  // Get localstorage
  const localstorage = localStorage.getItem('songs');
  const searchSong = songID;
  let songs = JSON.parse(localstorage);

  songs.forEach((song, index) => {
    if (song.id == searchSong) {
      const formattedSongName = song.title.replace(/"/g, '_').replace(/:/g, '_');
      const ytIcon = document.querySelector('.bg-icon img');

      audio.src = `./music/${directory[index]}`;
      bgImg.src = song.thumbnail;
      ytIcon.src = song.thumbnail;
      
      audio.load();
      audio.play();
      pausePlayBtn.src = './icons/play.png';
    }  
  })

}