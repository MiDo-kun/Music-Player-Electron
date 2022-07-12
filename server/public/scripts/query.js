// Send request to the server to get the youtube query results
const resultDocument = document.querySelector('.results');

queryRequest();
async function queryRequest() {
  // Initializing request...
  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({query: 'Violet Evergarden'}),
  }
  const response = await fetch('/query', options);
  const json = await response.json();
  const results = await json.videos;

  let list = ''
  for (let i = 0; i < 10; i++) {
    list += `<li>
                <img src='${results[i].metadata.thumbnails[0].url}'> </img>
                <span id='details'>
                  <span id='title'>
                    ${results[i].title}
                  </span>
                  <span id='options'> 
                    <span>${results[i].metadata.duration.simple_text} </span> |
                    <span> Save </span> |
                    <span> Play </span>
                  </span>
                </span>
              </li>`
  }
  resultDocument.innerHTML = list;
}