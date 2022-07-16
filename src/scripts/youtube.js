yt_search.addEventListener('click', () => {
  const yt_input = document.querySelector('#yt_input').value;
  queryRequest(yt_input);  
})

async function queryRequest(query) {
  if (query.trim() == '')
    query = ' ';

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query: query}),
  }
  
  const response = await fetch('/query',  options);
  const json = await response.json();
  const results = await json.videos;

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

async function save(song, duration) {
  // Download the music into specific file
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({videoID: song}),
  }
  
  // Save it by using an id to get the thumbnail and title
  const req = await fetch('/download', options);
  const json = await req.json();
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
  
  const ytIcon = document.querySelector('.bg-icon img');
  audio.src = `http://localhost:3000/play/${videoID}`;
  bgImg.src = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
  ytIcon.src = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
  bgTitle.textContent = res.title;

  audio.load();
  audio.play();
  pausePlayBtn.src = './icons/play.png';

  // Show background image
  menu.src = './icons/menu.png';
  list.style.bottom = '-100%'
  list.style.transition = 'all 2s';
  change = true;
  controls.style.opacity = 1;
  controls.style.zIndex = 1;
  bgIcon.style.opacity = 1;
}