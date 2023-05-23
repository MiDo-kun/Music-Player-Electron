const { app, BrowserWindow } = require('electron');
const path = require('path');
const Server = require('./server.js');

// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async () => {
  // Intialized the back-end server here.
  Server();

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 550,
    height: 330,
    autoHideMenuBar: true,
    resizable: false,
    icon: path.join(__dirname, '/src/icons/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, '/src/preload.js'),
    },
  });

  mainWindow.loadURL(__dirname + '/src/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
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
