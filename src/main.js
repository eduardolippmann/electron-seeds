// Dependencies
const { app, BrowserWindow, ipcMain } = require('electron');

// Globals
let win; // global reference avoids garbage collector

// Application entry point
main();


function main() {
    app.on('ready', () => {
        createWindow();
        setupEvents();
    });
    
    app.on('window-all-closed', () => {
        // MacOS fix
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });
    
    app.on('activate', () => {
        // MacOS fix
        if (win === null) {
            createWindow()
        }
    });
}

function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            nodeIntegration:true // should never be true but yolo
        }
    });

    // and load the index.html of the app.
    win.loadFile(__dirname + '/render/templates/index.html');

    // Open the DevTools.
    // win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    });
}

function setupEvents() {
    ipcMain.on('getColor', (event)=> {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        event.sender.send('newColor', color);
    })
}