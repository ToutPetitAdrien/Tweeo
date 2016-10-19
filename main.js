/* jshint esversion:6*/
const electron = require('electron');
const OauthTwitter = require('electron-oauth-twitter');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

function logWithTwitter(){
    const twitter = new OauthTwitter({
      key: 'efpqDyEfcjudWbUYpN5DItq2q',
      secret: 'm8pnXcbKwnnLNoaaV0SIel2anRPXO4pFWIpbKod7WTz6WhQe0C',
    });

    twitter.startRequest().then((result) => {
        const accessToken = result.oauth_access_token;
        const accessTokenSecret = result.oauth_access_token_secret;
        dialog.showErrorBox('Status', `Token: ${accessToken} \nSecret: ${accessTokenSecret}`);
    }).catch((error) => {
        console.error(error, error.stack);
    });
}
exports.logWithTwitter = logWithTwitter;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow();
  mainWindow.maximize();

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
