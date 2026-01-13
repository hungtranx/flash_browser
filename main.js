const { app, BrowserWindow, BrowserView, ipcMain, session } = require('electron');
const path = require('path');
const fs = require('fs');

// Spoof CocCoc Browser User-Agent (exact version from game's recommended download)
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.136 Safari/537.36 coc_coc_browser/72.0.136';

// Flash spoofing is now handled by game-preload.js

// PepperFlash plugin paths to check
const flashPaths = [
  path.join(__dirname, 'plugins', 'libpepflashplayer.so'),
  path.join(__dirname, 'plugins', 'pepflashplayer.dll'),
  path.join(__dirname, 'plugins', 'PepperFlashPlayer.plugin'),
  '/opt/google/chrome/PepperFlash/libpepflashplayer.so',
  '/usr/lib/pepperflashplugin-nonfree/libpepflashplayer.so',
  '/usr/lib/chromium/PepperFlash/libpepflashplayer.so',
];

// Find the Flash plugin
let flashPath = null;
for (const p of flashPaths) {
  if (fs.existsSync(p)) {
    flashPath = p;
    console.log('Found Flash plugin at:', flashPath);
    break;
  }
}

if (flashPath) {
  app.commandLine.appendSwitch('ppapi-flash-path', flashPath);
  app.commandLine.appendSwitch('ppapi-flash-version', '32.0.0.363');
} else {
  console.warn('Warning: PepperFlash plugin not found!');
  console.warn('Please place libpepflashplayer.so in the plugins/ directory');
}

// Enable plugins and Flash
app.commandLine.appendSwitch('enable-plugins');
app.commandLine.appendSwitch('enable-npapi');
app.commandLine.appendSwitch('allow-outdated-plugins');
app.commandLine.appendSwitch('enable-features', 'AllowContentInitiatedDataUrlNavigations');

// Fix GPU issues on Linux
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('no-sandbox');
app.disableHardwareAcceleration();

let mainWindow;
let browserView;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      plugins: true,
    },
  });

  // Create BrowserView for the game content
  browserView = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      plugins: true,
      webSecurity: false,
      preload: path.join(__dirname, 'game-preload.js'),
    }
  });

  mainWindow.setBrowserView(browserView);

  // Position browserView below toolbar (60px)
  const updateBounds = () => {
    const bounds = mainWindow.getBounds();
    browserView.setBounds({ x: 0, y: 60, width: bounds.width, height: bounds.height - 90 });
  };

  updateBounds();
  mainWindow.on('resize', updateBounds);

  // Set user agent
  browserView.webContents.setUserAgent(USER_AGENT);

  // Intercept ALL HTTP requests and force User-Agent header
  const filter = { urls: ['*://*/*'] };
  browserView.webContents.session.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    details.requestHeaders['User-Agent'] = USER_AGENT;
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  // Intercept HTML responses and inject Flash spoofing BEFORE any page scripts
  browserView.webContents.session.webRequest.onHeadersReceived(filter, (details, callback) => {
    // Remove Content-Security-Policy to allow our injection
    const headers = details.responseHeaders;
    delete headers['content-security-policy'];
    delete headers['Content-Security-Policy'];
    callback({ cancel: false, responseHeaders: headers });
  });

  // Flash spoofing is handled by game-preload.js which runs before page scripts

  // Load the UI
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  // Open DevTools for debugging (remove in production)
  // browserView.webContents.openDevTools({ mode: 'detach' });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers
ipcMain.handle('get-flash-status', () => {
  return {
    found: flashPath !== null,
    path: flashPath,
  };
});

ipcMain.handle('get-user-agent', () => {
  return USER_AGENT;
});

ipcMain.handle('navigate', (event, url) => {
  if (browserView) {
    browserView.webContents.loadURL(url);
  }
});

ipcMain.handle('go-back', () => {
  if (browserView && browserView.webContents.canGoBack()) {
    browserView.webContents.goBack();
  }
});

ipcMain.handle('go-forward', () => {
  if (browserView && browserView.webContents.canGoForward()) {
    browserView.webContents.goForward();
  }
});

ipcMain.handle('refresh', () => {
  if (browserView) {
    browserView.webContents.reload();
  }
});

ipcMain.handle('get-url', () => {
  if (browserView) {
    return browserView.webContents.getURL();
  }
  return '';
});

ipcMain.handle('can-go-back', () => {
  return browserView ? browserView.webContents.canGoBack() : false;
});

ipcMain.handle('can-go-forward', () => {
  return browserView ? browserView.webContents.canGoForward() : false;
});
