yt_search.addEventListener('click', () => {
  const yt_input = document.querySelector('#yt_input').value;
  emptyGIF.style.display = 'none';

  searchVideos(yt_input);
})

async function searchVideos(query) {
  if (query.trim() == '') {
    query = ' ';
    emptyGIF.style.display = 'block';
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: query }),
  }

  const search = await fetch(BACKEND_SERVER + '/search', options);

  if (!search.ok) {
    errorModal.style.opacity = 1;
    return;
  }

  const videos = await search.json();

  const list = videos.map(video => {
    const videoID = video.videoId;
    const title = video.title;
    const thumbnail = video.thumbnail;
    const duration = video.timestamp;

    return `
      <li>
        <img src='${thumbnail}'></img>
        <span id='details'>
          <a id='title' onclick=play('${videoID}')>
            ${title}
          </a>
          <span id='options'> 
            <span>${duration} </span> |
            <a id='save' onclick=save('${videoID}','${duration}')> Save </a> |
            <a id='play' onclick=play('${videoID}')> Play </a>
          </span>
        </span>
      </li>
    `;
  }).join('');

  resultDocument.innerHTML = list;
}

async function play(videoID) {
  clearInterval(progress);
  setInterval(progress, 500);

  fetch(`${BACKEND_SERVER}/play?videoId=${videoID}`).then(async (res) => {
    if (!res.ok) {
      alert("Video is not available!");
      return;
    }
    const video = await res.json();

    const ytIcon = document.querySelector('.bg-icon img');
    const bgLink = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;

    img.style.filter = 'brightness(0.5)';
    audio.src = video.link;
    img.src = bgLink;
    bgImg.src = bgLink;
    ytIcon.src = bgLink;
    bgTitle.textContent = video.title;
    closeBtn.style.pointerEvents = 'auto';

    audio.load();
    audio.play();
    pausePlayBtn.src = './icons/play.png';

    // Show background image
    list.style.bottom = '-100%'
    list.style.transition = 'all 2s';
    closeBtn.style.display = 'none';
    closeMenu = true;
    controls.style.opacity = 1;
    controls.style.zIndex = 1;
    bgIcon.style.opacity = 1;
  })
}

// Download the videoID into specific file
async function save(videoID, audioDuration) {
  const song = videoID;
  const duration = audioDuration;
  console.log(song, duration);
  const res = await fetch(`${BACKEND_SERVER}/download?videoId=${videoID}`)  //   if (!res.ok) {

  if (!res.ok) {
    return alert("Video is not available");
  }

  const video = await res.json();
  console.log(video);

  const thumbnail = `https://img.youtube.com/vi/${song}/maxresdefault.jpg`
  const title = video.title;

  // Get localstorage and input information there
  const localstorage = localStorage.getItem('songs');
  let songs = (localstorage === null) ? [] : JSON.parse(localstorage);
  songs.push({ id: song, title: title, thumbnail: thumbnail, duration: duration });
  console.log(songs);
  localStorage.setItem('songs', JSON.stringify(songs));

  // Update localStorage List
  loadLocal();
}