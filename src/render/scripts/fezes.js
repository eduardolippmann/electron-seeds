const { ipcRenderer } = require('electron');

setupEvents();

function fezes() {
    console.log('clicked fezes!')
    ipcRenderer.send('getColor');
}

function setupEvents() {
    ipcRenderer.on('newColor', (event, color)=> {
        console.log('received ', color);
        document.getElementById("fezes").style.color = color;
    })
}