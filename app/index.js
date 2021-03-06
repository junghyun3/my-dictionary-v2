const {
    app,
    BrowserWindow,
    Tray,
    Menu,
    globalShortcut,
    ipcMain,
  } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')
const os = require('os')
  
const toggleWindow = () => {
    if (window.isVisible()) {
      window.hide();
    } else {
      showWindow();
    }
};

const getWindowPosition = () => {
    const windowBounds = window.getBounds();
    const trayBounds = tray.getBounds();
    // console.log("Tray bounds: ", trayBounds.x, trayBounds.width, trayBounds.y, trayBounds.height)
    // Center window horizontally below the tray icon
    const x = Math.round(
      trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
    );
    
    // Position window 4 pixels vertically below the tray icon
    let y = Math.round(trayBounds.y + trayBounds.height + 4);

    // For windows
    platform = os.platform()
    if (platform === 'win32'){
      const winSize = window.getSize()
      // console.log("Win size:", window.getSize())
      y = trayBounds.y - winSize[1]
    }

    return { x: x, y: y };
  };
  
const showWindow = () => {
    const position = getWindowPosition();
    window.setPosition(position.x, position.y, false);
    // console.log(position)
    window.show();
    window.focus();
};

// const assetsDirectory = path.join(__dirname, '../', 'assets');
const iconPath = path.join(__dirname, 'iconTemplate.png');

let tray = undefined;
let window = undefined;

// Don't show the app in the doc
// app.dock.hide();

app.on('ready', () => {
  createTray();
  createWindow();
  createMenu();

  var platform = os.platform();
  var shortcut = ''
  if (platform === 'darwin'){
    shortcut = 'Ctrl+Shift+D';
  } else{
    shortcut = 'Alt+Shift+D';
  }
  globalShortcut.register(shortcut, () => {
    toggleWindow();
  });
});

const hideWindowHandler = () => {
  if (!window.webContents.isDevToolsOpened()) {
    window.hide();
  }
}

const createTray = () => {
    tray = new Tray(iconPath);
    var contextMenu = Menu.buildFromTemplate([
      {label: 'Fix window', type: 'checkbox', checked:true, click: function(event){
        console.log(contextMenu.items[0].checked);
        // checked가 true이면, hideWindowHandler 제거
        // checked가 false이면, hideWindowHandler 설정
        // 기본은 false
        if (typeof window !== "undefined"){
            if(contextMenu.items[0].checked){
              window.removeListener('blur', hideWindowHandler);
            }else{
              window.on('blur', hideWindowHandler);
            }
        }

      }},
      {label: 'Quit', click: function(){app.quit();}}
    ]);
    
    tray.on('right-click', function(event){
      tray.popUpContextMenu(contextMenu);
    });
    tray.on('double-click', toggleWindow);
    tray.on('click', function(event) {
      toggleWindow();
  
      // Show devtools when command clicked
      if (window.isVisible() && process.defaultApp && event.metaKey) {
        window.openDevTools({ mode: 'detach' });
      }
    });
};

const createWindow = () => {
    window = new BrowserWindow({
      width: 360,
      height: 555,
      show: false,
      frame: false,
      fullscreenable: false,
      resizable: false,
      transparent: true,
      webPreferences: {
        // Prevents renderer process code from not running when window is
        // hidden
        backgroundThrottling: false,
        nodeIntegration: true,
        webviewTag: true,
        preload: __dirname + '/preload.js' 
      }
    });
    window.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
    // Hide the window when it loses focus
    // window.on('blur', hideWindowHandler);
};

const createMenu = () => {
  let menuTemplate = [
    {
      label: app.getName(),
      submenu: [{ role: 'quit' }],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
};

// Quit the app when the window is closed
app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('close-me', (evt, arg) => {
  app.quit();
});

ipcMain.on('hide-me', (evt, arg) => {
  window.hide();
});