yt_search.addEventListener('click', () => {
  const yt_input = document.querySelector('#yt_input').value;
  emptyGIF.style.display = 'none';

  queryRequest(yt_input);
})

async function queryRequest(query) {
  if (query.trim() == '') {
    query = ' ';
    emptyGIF.style.display = 'block';
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query: query}),
  }
  
  const response = await fetch('/query',  options);
  const json = await response.json();

  if (json.error == 'Error Occured!') {
    errorModal.style.opacity = 1;
    return;
  }

  const results = await json.search.videos;
  let list = ''
  for (let i = 0; i < 10; i++) {
    const videoID = results[i].id;
    const title = results[i].title;
    const thumbnail = results[i].metadata.thumbnails[0].url;
    const duration = results[i].metadata.duration.simple_text;

    list += 
    `<li>
      <img src='${thumbnail}'></img>
      <span id='details'>
        <a id='title' onclick=play('${videoID}')>
          ${title}
        </a>
        <span id='options'> 
          <span>${duration} </span> |
          <a id='save' href='/download/${videoID}' onclick=save('${videoID}','${duration}')> Save </a> |
          <a id='play' onclick=play('${videoID}'> Play </a>
        </span>
      </span>
    </li>`
  }

  resultDocument.innerHTML = list;
}

// Download the videoID into specific file
async function save(song, duration) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({videoID: song}),
  }
  
  // Save it by using an id to get the thumbnail and title
  const req = await fetch('/download', options)
  const json = await req.json();

  if (json.error == 'Error Occured!') {
    errorModal.style.opacity = 1;
    return;
  }

  const thumbnail = `https://img.youtube.com/vi/${song}/maxresdefault.jpg`
  const title = json.title;

  // Get localstorage and input information there
  const localstorage = localStorage.getItem('songs');
  let songs = (localstorage == null) ? [] : JSON.parse(localstorage);
  songs.push({id: song, title: title, thumbnail: thumbnail, duration: duration});
  localStorage.setItem('songs', JSON.stringify(songs));

  // Update localStorage List
  loadLocal();
}

async function play(videoID) {
  clearInterval(progress);
  setInterval(progress, 500);
  
  // Search for the song based on the videoID
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({videoID: videoID}),
  }
  const req = await fetch('/download', options);
  const res = await req.json();
 
  if (res.error == 'Error Occured!') {
    errorModal.style.opacity = 1;
    return;
  }

  const ytIcon = document.querySelector('.bg-icon img');
  const bgLink = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
  
  img.style.filter = 'brightness(0.5)';
  audio.src = `http://localhost:8887/play/${videoID}`;
  img.src = bgLink;
  bgImg.src = bgLink;
  ytIcon.src = bgLink;
  bgTitle.textContent = res.title;
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
}