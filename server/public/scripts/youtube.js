// Send request to the server to get the youtube query results
const resultDocument = document.querySelector('.youtube_results');
const yt_search = document.querySelector('#yt_search');

yt_search.addEventListener('click', () => {
  const yt_input = document.querySelector('#yt_input').value;
  queryRequest(yt_input);  
})

async function queryRequest(query) {
  // Initializing request...
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
        <span id='title'>
          ${title}
        </span>
        <span id='options'> 
          <span>${duration} </span> |
          <a id='save' href='/download/${videoID}' onclick=save('${videoID}')> Save </a> |
          <span id='play' onclick=play('${videoID}')> Play </span>
        </span>
      </span>
    </li>`
  }
  resultDocument.innerHTML = list;
}

async function save(song) {
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
  const {title, thumbnail} = json;

  // Get localstorage and input information there
  const localstorage = localStorage.getItem('songs');
  let songs = (localstorage == null) ? [] : JSON.parse(localstorage);
  songs.push({id: song, title: title, thumbnail: thumbnail});
  localStorage.setItem('songs', JSON.stringify(songs));

  loadLocal();
}

function play(videoID) {
  // Get the music document, append the link and play the link
  // Update the background image, and background icon
  const ytIcon = document.querySelector('.bg-icon img');
  audio.src = `http://localhost:3000/play/${videoID}`;
  bgImg.src = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
  ytIcon.src = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
  
  audio.load();
  audio.play();
  pausePlayBtn.src = './icons/play.png';
}