const {electron, app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

const argv = process.argv.slice(1);
let win

const Store = require('./storage.js')

var store = new Store({
  configName: 'prefs',
  defaults: {
    fullscreen: false,
    windowBounds: { width: 800, height: 600 },
    home: "https://qwark.iearthia.xyz/charm/new-start.html"
  }
})

global['store'] = store

const option = {
  dev: null
}

for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--dev' || argv[i] === '-d') {
    option.dev = true;
  }
}

global['option'] = option

function createWindow () {
  let { width, height } = store.get('windowBounds')
  win = new BrowserWindow({width: width, height: height, icon: __dirname + '/../icon.ico', show: false})

  win.loadURL(url.format({
    pathname: path.join(__dirname, './../html/main.html'),
    protocol: 'file:',
    slashes: true
  }))
  var cont = win.webContents
  if(store.get('fullscreen')) {
    win.maximize();
  }
  
  if (option.dev === true) {
    win.openDevTools()
  }
  win.setMenu(null)
  win.on("page-title-updated", function(event) {
    if (option.dev === true) {
      var newTitle = win.webContents.getTitle() + " - Charm - Dev";
    } else {
      var newTitle = win.webContents.getTitle() + " - Charm";
    }
    
  });
  win.on('close', () => {
    store.set('windowBounds', { width: win.getSize()[0], height: win.getSize()[1] })
    store.set('fullscreen', win.isMaximized())
  })
  win.on('closed', () => {
    win = null
  })
  win.webContents.on('did-finish-load', function() {
    win.show();
  });
}

function getStore() {
  return store;
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})



app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

