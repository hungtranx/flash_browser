# Flash Browser for Linux

A simple Electron-based browser that allows you to play **Flash web games** on Linux (Debian, Ubuntu, Linux Mint, and similar distros) in 2024 and beyond.

## Why This Exists

Adobe Flash was discontinued in 2020, and modern browsers no longer support Flash content. However, many classic web games still require Flash to run. This browser solves that problem by:

- Using **Electron 11** (Chromium 87) - the last version with Flash support
- Bundling **PepperFlash plugin** for native Flash playback
- Spoofing browser detection for games that check for specific browsers (CocCoc, UC Browser, Coowon)
- Bypassing `swfobject` Flash detection

## Features

- Play Flash games on Linux (Debian, Ubuntu, Mint, etc.)
- Login and server selection support for online Flash games
- Built-in PepperFlash plugin (v32.0.0.363)
- Browser spoofing for games that require CocCoc/UC Browser/Coowon
- Simple browser UI with navigation controls

## Requirements

- **Node.js** (v14 or higher)
- **npm**
- **Linux x64** (Debian, Ubuntu, Linux Mint, or similar)

## Installation

```bash
git clone https://github.com/YOUR_USERNAME/flash-browser.git
cd flash-browser
npm install
```

## Usage

```bash
npm start
```

Then enter the game URL in the address bar and play!

## How It Works

1. **Electron 11** - Uses Chromium 87 which still supports PPAPI Flash
2. **PepperFlash Plugin** - Bundled in `plugins/libpepflashplayer.so`
3. **Browser Spoofing** - Pretends to be CocCoc browser (User-Agent)
4. **swfobject Bypass** - Injects fake `swfobject.hasFlashPlayerVersion()` before page scripts run

## Supported Games

This browser works with Flash games that:
- Require login and server selection
- Check for Flash using `swfobject`
- Require specific browsers (CocCoc, UC Browser, Coowon)
- Use online/cloud databases

## Troubleshooting

### "Couldn't load plugin"
- Make sure you're using Electron 11 (not 12+)
- Check that `plugins/libpepflashplayer.so` exists

### Game says "Flash not detected"
- The `game-preload.js` should handle this
- Check browser console for errors

### GPU crash on startup
- Already handled with `--disable-gpu` flag

## Keywords

Flash player Linux, Flash games Linux, Flash browser Debian, Flash browser Ubuntu, PepperFlash Linux, play Flash games 2024, swfobject bypass, CocCoc browser alternative, UC Browser Flash Linux, Coowon Linux, Flash web games Linux, Electron Flash player

## License

MIT

## Credits

- PepperFlash plugin from [Hadaward/flashplayer-plugin](https://github.com/Hadaward/flashplayer-plugin)
