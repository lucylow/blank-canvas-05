const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createOverlay() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    x: 100,
    y: 100,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Click-through overlay
  mainWindow.setIgnoreMouseEvents(true);
  
  mainWindow.loadFile('overlay.html');
  
  // Hook game memory reader
  require('./memory-reader.js')(mainWindow);
}

app.whenReady().then(createOverlay);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
