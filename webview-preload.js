// This script runs before any page scripts
// Spoof Flash detection

(function() {
  'use strict';

  // Create fake Flash plugin
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

  // Create fake mime types
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

  // Override navigator.plugins
  try {
    const pluginArray = {
      length: 1,
      0: fakeFlashPlugin,
      'Shockwave Flash': fakeFlashPlugin,
      item: function(i) { return this[i]; },
      namedItem: function(name) { return this[name]; },
      refresh: function() {}
    };

    Object.defineProperty(navigator, 'plugins', {
      get: function() { return pluginArray; },
      configurable: true
    });
  } catch(e) {
    console.log('Could not override navigator.plugins:', e);
  }

  // Override navigator.mimeTypes
  try {
    const mimeTypeArray = {
      length: 2,
      0: fakeMimeType1,
      1: fakeMimeType2,
      'application/x-shockwave-flash': fakeMimeType1,
      'application/futuresplash': fakeMimeType2,
      item: function(i) { return this[i]; },
      namedItem: function(name) { return this[name]; }
    };

    Object.defineProperty(navigator, 'mimeTypes', {
      get: function() { return mimeTypeArray; },
      configurable: true
    });
  } catch(e) {
    console.log('Could not override navigator.mimeTypes:', e);
  }

  // Override common Flash detection methods
  Object.defineProperty(window, 'swfobject', {
    value: {
      hasFlashPlayerVersion: function() { return true; },
      getFlashPlayerVersion: function() { return { major: 32, minor: 0, release: 363 }; },
      embedSWF: function(swfUrl, id, width, height, version, expressInstallSwfurl, flashvars, params, attributes, callback) {
        // Actually embed the SWF
        const container = document.getElementById(id);
        if (container) {
          const embed = document.createElement('embed');
          embed.setAttribute('src', swfUrl);
          embed.setAttribute('width', width);
          embed.setAttribute('height', height);
          embed.setAttribute('type', 'application/x-shockwave-flash');
          embed.setAttribute('pluginspage', 'http://www.adobe.com/go/getflashplayer');
          if (flashvars) {
            const fv = Object.entries(flashvars).map(([k,v]) => `${k}=${v}`).join('&');
            embed.setAttribute('flashvars', fv);
          }
          if (params) {
            for (const [key, val] of Object.entries(params)) {
              embed.setAttribute(key, val);
            }
          }
          container.innerHTML = '';
          container.appendChild(embed);
          if (callback) callback({ success: true, id: id, ref: embed });
        }
      },
      registerObject: function() {},
      getObjectById: function(id) { return document.getElementById(id); },
      createSWF: function() { return null; },
      showExpressInstall: function() {},
      removeSWF: function(id) { const el = document.getElementById(id); if (el) el.remove(); },
      ua: {
        w3: true,
        pv: [32, 0, 363],
        wk: false,
        ie: false,
        win: false,
        mac: false
      }
    },
    writable: true,
    configurable: true
  });

  // For sites using AC_FL_RunContent (Adobe's Flash detection)
  window.AC_FL_RunContent = function() {
    console.log('AC_FL_RunContent called');
    return true;
  };
  window.AC_GetArgs = function() { return {}; };

  // For ActiveX detection (IE style)
  window.ActiveXObject = window.ActiveXObject || function(type) {
    if (type === 'ShockwaveFlash.ShockwaveFlash') {
      return {
        GetVariable: function(name) {
          if (name === '$version') return 'WIN 32,0,0,363';
          return '';
        }
      };
    }
    throw new Error('ActiveXObject not supported');
  };

  console.log('[Flash Browser] Flash spoofing initialized');
})();
