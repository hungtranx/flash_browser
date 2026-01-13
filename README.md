# Flash Browser for Linux

A simple Electron-based browser that allows you to play **Flash web games** on Linux (Debian, Ubuntu, Linux Mint, and similar distros) in 2024 and beyond.

## Quick Start (Pre-built App)

### Download & Run

1. Go to [Releases](https://github.com/YOUR_USERNAME/flash-browser/releases)
2. Download `FlashBrowser-1.0.0.AppImage`
3. Make it executable and run:

```bash
chmod +x FlashBrowser-1.0.0.AppImage
./FlashBrowser-1.0.0.AppImage
```

**Note:** If you get a FUSE error, install it first:
```bash
sudo apt install libfuse2
```

That's it! No Node.js required.

---

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
- **Standalone AppImage** - no installation required

## How to Use

### Playing a Flash Game

1. **Start the browser** (double-click AppImage or run from terminal)

2. **Enter the game URL** in the address bar at the top

3. **Press Enter** or click **Go**

4. **Login** to your game account (if required)

5. **Select server** (if required)

6. **Play!** The Flash game should load and run

### Browser Controls

| Button | Function |
|--------|----------|
| ← | Go back to previous page |
| → | Go forward |
| ↻ | Refresh current page |
| ⌂ | Go to blank home page |
| Green dot | Flash plugin loaded successfully |
| Red dot | Flash plugin not found |

---

## Build from Source

If you want to build it yourself or contribute:

### Requirements

- **Node.js** (v14 or higher)
- **npm**
- **Linux x64** (Debian, Ubuntu, Linux Mint, or similar)

### Step 1: Install Node.js and npm

```bash
sudo apt update
sudo apt install nodejs npm
```

### Step 2: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/flash-browser.git
cd flash-browser
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Run in Development Mode

```bash
npm start
```

### Step 5: Build Standalone App

```bash
npm run build
```

Output will be in `dist/FlashBrowser-1.0.0.AppImage`

---

## Project Structure

```
flash-browser/
├── main.js              # Main Electron process
├── preload.js           # Preload script for browser UI
├── game-preload.js      # Flash detection bypass script
├── package.json         # Project configuration
├── renderer/
│   ├── index.html       # Browser UI
│   ├── style.css        # UI styling
│   └── renderer.js      # UI logic
└── plugins/
    └── libpepflashplayer.so   # Flash plugin (Linux)
```

## How It Works

1. **Electron 11** - Uses Chromium 87 which still supports PPAPI Flash
2. **PepperFlash Plugin** - Bundled in `plugins/libpepflashplayer.so`
3. **Browser Spoofing** - Pretends to be CocCoc browser (User-Agent)
4. **swfobject Bypass** - Injects fake `swfobject.hasFlashPlayerVersion()` before page scripts run

## Troubleshooting

### FUSE error when running AppImage
```bash
sudo apt install libfuse2
```

### "Couldn't load plugin"
- Make sure you're using Electron 11 (check `package.json`)
- Verify `plugins/libpepflashplayer.so` exists
- Try reinstalling: `rm -rf node_modules && npm install`

### Game says "Flash not detected" or "Install CocCoc/UC Browser"
- This should be handled automatically by `game-preload.js`
- Check browser console (F12) for errors

### GPU crash on startup / Black screen
- Already handled with `--disable-gpu` flag

### "Cannot find module 'electron'"
```bash
rm -rf node_modules package-lock.json
npm install
```

## Supported Games

This browser works with Flash games that:
- Require login and server selection
- Check for Flash using `swfobject`
- Require specific browsers (CocCoc, UC Browser, Coowon)
- Use online/cloud databases
- Vietnamese Flash games (tested with chanlong.gaba.vn)

## Creating a Release (for maintainers)

1. Build the AppImage:
   ```bash
   npm run build
   ```

2. Go to GitHub repository → **Releases** → **Create new release**

3. Tag: `v1.0.0`, Title: `Flash Browser v1.0.0`

4. Upload `dist/FlashBrowser-1.0.0.AppImage`

5. Publish release

## Keywords

Flash player Linux, Flash games Linux, Flash browser Debian, Flash browser Ubuntu, PepperFlash Linux, play Flash games 2024, swfobject bypass, CocCoc browser alternative, UC Browser Flash Linux, Coowon Linux, Flash web games Linux, Electron Flash player, choi game flash tren linux, trinh duyet flash linux, game flash linux, appimage flash

## License

MIT

## Credits

- PepperFlash plugin from [Hadaward/flashplayer-plugin](https://github.com/Hadaward/flashplayer-plugin)
