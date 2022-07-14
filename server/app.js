const Innertube = require('youtubei.js');
const express = require('express');
const fs = require('fs');

const app = express();
app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

async function Youtube_API() {
  const youtube = await new Innertube({gl: 'US'});

  // Show search results
  app.post('/query', async function(req, res, next) {
    const query = req.body.query;
    const search = await youtube.search(query, {client: 'YOUTUBE'});
    res.json(search);
    next();
  });

  // Get title, thumbnail
  app.post('/download', async (req, res, next) => {
    const videoID = req.body.videoID;
    const search = await youtube.getDetails(videoID);
    const title = search.title;
    const thumbnail = search.thumbnail.url;

    res.json({title, thumbnail});
  })

  // Download specific video
  app.get('/download/:videoID', async function(req, res, next) {
    const VIDEO_ID = req.params.videoID;
    const search = await youtube.getDetails(VIDEO_ID);
    const VIDEO_TITLE = search.title;

    const options = {
         format: 'mp4',
         type: 'audio',
    };
    const stream = youtube.download(VIDEO_ID, options);
    res.set("content-type", "audio/mp3");
    res.setHeader(
      'Content-Disposition', 
      `attachment; filename=${encodeURI(VIDEO_TITLE)}.mp3`
    );
    stream.pipe(res)
  });

  // Play Youtube Video into mp3
  app.get('/play/:videoID', async function(req, res, next) {
    const VIDEO_ID = req.params.videoID;
    const search = await youtube.getDetails(VIDEO_ID);
    const VIDEO_TITLE = search.title;

    const options = {
         format: 'mp4',
         type: 'audio',
    };
    const stream = youtube.download(VIDEO_ID, options);
    res.set("content-type", "audio/mp3");
    stream.pipe(res)
  })
}

// Get all music in the file and return it as json file
app.get('/directory', async (req, res, next) => {
  await fs.readdir('./public/music/', (err, list) => {
    res.json(list);
  } );
});

app.listen(3000, () => {
  console.log('Running at http://localhost:3000');
  Youtube_API();
})