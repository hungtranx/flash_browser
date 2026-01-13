const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getFlashStatus: () => ipcRenderer.invoke('get-flash-status'),
  getUserAgent: () => ipcRenderer.invoke('get-user-agent'),
  navigate: (url) => ipcRenderer.invoke('navigate', url),
  goBack: () => ipcRenderer.invoke('go-back'),
  goForward: () => ipcRenderer.invoke('go-forward'),
  refresh: () => ipcRenderer.invoke('refresh'),
  getUrl: () => ipcRenderer.invoke('get-url'),
  canGoBack: () => ipcRenderer.invoke('can-go-back'),
  canGoForward: () => ipcRenderer.invoke('can-go-forward'),
});
