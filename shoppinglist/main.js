const electron = require('electron');
const path = require('path');
const url = require('url');

// set env
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

//listen for app to be ready
app.on('ready', function(){
    //create new window
    mainWindow = new BrowserWindow({});
    //load html into window
    mainWindow.loadURL(url.format({
        pathname : path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));
    // quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    }); 

    //build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert menu
    Menu.setApplicationMenu(mainMenu);
});

//handle create add window
function createAddWindow(){
//create new window
addWindow = new BrowserWindow({
    width:300,
    height:200,
    title:'Add Shopping List Item'
});
//load html into window
addWindow.loadURL(url.format({
    pathname : path.join(__dirname, 'addWindow.html'),
    protocol: 'file',
    slashes: true
}));
//handle garbage collection
addWindow.on('close', function(){
    addWindow = null;
}); 
}

//create menu template
const mainMenuTemplate = [
    {
        label:'file',
        submenu:[
            {
                label:'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label:'Clear Items',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
            },
            {
                label:'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q':
                'ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

// if osx, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// if osx, add empty object to menu
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                role:'reload'
            },
            {
                label: 'Toggle DevTools',
                accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}