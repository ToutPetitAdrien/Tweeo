const {app, BrowserWindow} = require('electron')

let win

function createWindow () {
    var size = require('electron').screen.getPrimaryDisplay().workAreaSize
    win = new BrowserWindow({
        width: size.width,
        height: size.height,
        center: true
    })
    win.loadURL(`file://${__dirname}/index.html`)
    win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)
