const {app, BrowserWindow} = require('electron');
const path = require('path');
const config = require(path.join(__dirname, 'package.json'));

const Compute = require('@google-cloud/compute');
const compute = new Compute();
const zone = compute.zone('asia-southeast1-c');
const vm = zone.vm('vpn');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    // backgroundColor: 'lightgray',
    title: config.productName,
    // show: false,
    webPreferences: {
      // nodeIntegration: false,
      // contextIsolation: true,
      defaultEncoding: 'UTF-8',
    }
  });
  // win.setMenu(null);

  // and load the index.html of the app.
  win.loadFile('views/index.html');

  // Emitted when the window is closed.
  win.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.