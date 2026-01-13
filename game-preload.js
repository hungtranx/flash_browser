// This preload script runs BEFORE any page scripts
// It spoofs swfobject and Flash detection

// Create swfobject before the page can load its own
// Use Object.defineProperty to prevent page from overwriting it
Object.defineProperty(window, 'swfobject', {
  value: {
  hasFlashPlayerVersion: function(version) {
    console.log('[FlashBrowser] swfobject.hasFlashPlayerVersion called with:', version);
    return true;
  },
  getFlashPlayerVersion: function() {
    return { major: 32, minor: 0, release: 363 };
  },
  embedSWF: function(swfUrl, id, width, height, version, expressInstallSwfurl, flashvars, params, attributes, callback) {
    console.log('[FlashBrowser] swfobject.embedSWF called:', swfUrl);
    const container = document.getElementById(id);
    if (container) {
      const embed = document.createElement('embed');
      embed.setAttribute('src', swfUrl);
      embed.setAttribute('width', width);
      embed.setAttribute('height', height);
      embed.setAttribute('type', 'application/x-shockwave-flash');
      embed.setAttribute('pluginspage', 'http://www.adobe.com/go/getflashplayer');
      embed.setAttribute('allowfullscreen', 'true');
      embed.setAttribute('allowscriptaccess', 'always');
      if (flashvars) {
        const fv = typeof flashvars === 'object'
          ? Object.entries(flashvars).map(([k,v]) => `${k}=${v}`).join('&')
          : flashvars;
        embed.setAttribute('flashvars', fv);
      }
      if (params) {
        for (const [key, val] of Object.entries(params)) {
          embed.setAttribute(key, val);
        }
      }
      container.innerHTML = '';
      container.appendChild(embed);
      if (callback) {
        callback({ success: true, id: id, ref: embed });
      }
    }
  },
  registerObject: function() {},
  getObjectById: function(id) { return document.getElementById(id); },
  createSWF: function() { return null; },
  showExpressInstall: function() {},
  removeSWF: function(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  },
  ua: {
    w3: true,
    pv: [32, 0, 363],
    wk: false,
    ie: false,
    win: true,
    mac: false
  }
  },
  writable: false,
  configurable: false
});

// Also spoof navigator.plugins
const fakeFlashPlugin = {
  name: 'Shockwave Flash',
  filename: 'libpepflashplayer.so',
  description: 'Shockwave Flash 32.0 r0',
  version: '32.0.0.363',
  length: 2,
  0: { type: 'application/x-shockwave-flash', suffixes: 'swf', description: 'Shockwave Flash' },
  1: { type: 'application/futuresplash', suffixes: 'spl', description: 'FutureSplash Player' },
  item: function(i) { return this[i]; },
  namedItem: function(name) { return this[name]; }
};

const fakeMimeType1 = {
  type: 'application/x-shockwave-flash',
  suffixes: 'swf',
  description: 'Shockwave Flash',
  enabledPlugin: fakeFlashPlugin
};

const fakeMimeType2 = {
  type: 'application/futuresplash',
  suffixes: 'spl',
  description: 'FutureSplash Player',
  enabledPlugin: fakeFlashPlugin
};

try {
  Object.defineProperty(navigator, 'plugins', {
    get: function() {
      return {
        length: 1,
        0: fakeFlashPlugin,
        'Shockwave Flash': fakeFlashPlugin,
        item: function(i) { return this[i]; },
        namedItem: function(name) { return this[name]; },
        refresh: function() {}
      };
    },
    configurable: true
  });
} catch(e) {}

try {
  Object.defineProperty(navigator, 'mimeTypes', {
    get: function() {
      return {
        length: 2,
        0: fakeMimeType1,
        1: fakeMimeType2,
        'application/x-shockwave-flash': fakeMimeType1,
        'application/futuresplash': fakeMimeType2,
        item: function(i) { return this[i]; },
        namedItem: function(name) { return this[name]; }
      };
    },
    configurable: true
  });
} catch(e) {}

console.log('[FlashBrowser] Flash/swfobject spoofing loaded in preload');
