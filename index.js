const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600, minHeight: 600, minWidth: 800, backgroundColor: '#212121', frame: false, webPreferences: { nodeIntegration: true } });
    mainWindow.loadFile('views/index.html');
    mainWindow.maximize();
    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});