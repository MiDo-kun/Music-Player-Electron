const express = require("express");
const svdl = require("@blackamda/song_video_dl")
const ytSearch = require("yt-search");
const fs = require('fs');
const path = require("path");
const https = require('https');

const PORT = 8887;
const app = express();
app.use(express.json());

module.exports = () => {
  app.get('/', (req, res) => {
    res.send("Backend Server is working.");
  })

  app.post('/search', async (req, res) => {
    const query = req.body.query;
    const search = await ytSearch(query);

    const filterResults = search.all.filter((result) => result.type === 'video');
    const videos = filterResults.map((video) => {
      return {
        "videoId": video.videoId,
        "title": video.title,
        "thumbnail": video.thumbnail,
        "timestamp": video.timestamp
      }
    });
    res.status(200).json(videos.slice(9));
  })

  app.get('/play', async (req, res) => {
    const videoID = req.query.videoId;
    const config = {
      type: 'audio', // audio or video
      quality: 128, // Quality of the video or audio (kbps or p)
      server: 'en68' // This is optional ('en136', 'id4', 'en60', 'en61', 'en68')
    }

    const result = await svdl.download(`https://www.youtube.com/watch?v=${videoID}`, config)
    if (result.link) {
      return res.json(result);
    }

    return res.status(404).send("Video link does not exists.");
  })

  app.get('/download', async (req, res) => {
    const videoID = req.query.videoId;

    const config = {
      type: 'audio', // audio or video
      quality: 128, // Quality of the video or audio (kbps or p)
      server: 'en68' // This is optional ('en136', 'id4', 'en60', 'en61', 'en68')
    }

    const result = await svdl.download(`https://www.youtube.com/watch?v=${videoID}`, config)
    if (!result.link) {
      return res.status(404).send("Video link does not exists.");
    }

    const fileUrl = result.link;
    const fileName = `${videoID}.mp3`;
    const fileDirectory = `${__dirname}/music/`;
    const audioPath = path.join(fileDirectory, fileName);

    const file = fs.createWriteStream(audioPath);
    let downloadFinished = false;

    https.get(fileUrl, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        downloadFinished = true;
      });
    }).on('error', (error) => {
      return res.status(404).send(`Error downloading file: ${error.message}`);
    });

    // // Check download status every 100ms
    const checkDownloadStatus = setInterval(() => {
      if (downloadFinished) {
        clearInterval(checkDownloadStatus);
        console.log(result);
        return res.status(200).json(result);
      }
    });
  })

  app.get('/remove', async (req, res) => {
    const videoID = req.query.videoId;
    const fileName = `${videoID}.mp3`;
    const fileDirectory = `${__dirname}/music/`;
    const audioPath = path.join(fileDirectory, fileName);

    fs.unlink(audioPath, (err) => {
      if (err) {
        return res.status(404).send(`Error deleting file: ${err.message}`);
      }
      return res.status(200).send(`File ${fileName} has been deleted successfully.`);
    });
  });

  app.listen(PORT, () => {
    console.log(`Music Player Backend Server is working at PORT ${PORT}`);
  })

};