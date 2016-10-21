/* jshint esversion:6*/
const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

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

/*
    TWITTER SETUP
*/

// package for twitter oauth
const OauthTwitter = require('electron-oauth-twitter');
// Put twitter app key and secret as environment variable
process.env.TWITTER_CONSUMER_KEY = 'efpqDyEfcjudWbUYpN5DItq2q';
process.env.TWITTER_CONSUMER_SECRET = 'm8pnXcbKwnnLNoaaV0SIel2anRPXO4pFWIpbKod7WTz6WhQe0C';

// Function to return Twitter login windows
function logWithTwitter(){
    const twitter = new OauthTwitter({
      key: process.env.TWITTER_CONSUMER_KEY,
      secret: process.env.TWITTER_CONSUMER_SECRET,
    });
    return twitter.startRequest();
}
// Export this function to be called in app script 
exports.logWithTwitter = logWithTwitter;
