const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const Innertube = require('youtubei.js');
const fs = require('fs');

// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // All server side logic is here
  serverSide();

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 550,
    height: 330,
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, '/src/preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000/');
  // mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except  on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
function serverSide() {
  const app = express();
  app.use('/', express.static(__dirname + '/src'));
  app.use(express.json());
  app.use(express.urlencoded({extended : false}));

  async function Youtube_API() {
  const youtube = await new Innertube({gl: 'US'});

  // Show search results
  app.post('/query', async function(req, res, next) {
    const query = req.body.query;
    const search = await youtube.search(query, {client: 'YOUTUBE'});

    res.json(search);
  });

  // Get title, thumbnail
  app.post('/download', async (req, res, next) => {
    const videoID = req.body.videoID;
    const search = await youtube.getDetails(videoID);
    const title = search.title;

    res.json({title: title});
  })

  // Download specific video
  app.get('/download/:videoID', async function(req, res, next) {
    const VIDEO_ID = req.params.videoID;
    const search = await youtube.getDetails(VIDEO_ID);
    const options = {
      format: 'mp4',
      type: 'audio',
    };

    const stream = youtube.download(VIDEO_ID, options);
    stream.pipe(fs.createWriteStream(`./src/music/${VIDEO_ID}.mp3`, {defaultEncoding: 'utf8'}));
  });

  // Play Youtube Video into mp3
  app.get('/play/:videoID', async function(req, res, next) {
    const VIDEO_ID = req.params.videoID;
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
    await fs.readdir((__dirname + '/src/music/'), (err, list) => {
      res.json(list);
    } );
  });

  app.listen(3000, () => {
    console.log('Running at http://localhost:3000');
    Youtube_API();
  })

  // Remove specific song in the list
  app.get('/remove/:song', async (req, res, next) => {
    const song = req.params.song;
    fs.unlinkSync((__dirname + '/src/music/' + song + '.mp3'));
    res.end();
  });
}