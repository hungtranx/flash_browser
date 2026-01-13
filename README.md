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

## Step-by-Step Installation Guide

### Step 1: Install Node.js and npm

If you don't have Node.js installed, run these commands:

**Debian/Ubuntu/Linux Mint:**
```bash
# Update package list
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

**Or use NodeSource for newer version:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### Step 2: Download This Project

**Option A: Clone with Git**
```bash
# Install git if needed
sudo apt install git

# Clone the repository
git clone https://github.com/YOUR_USERNAME/flash-browser.git

# Enter the directory
cd flash-browser
```

**Option B: Download ZIP**
1. Click the green "Code" button on GitHub
2. Click "Download ZIP"
3. Extract the ZIP file
4. Open terminal in the extracted folder

### Step 3: Install Dependencies

```bash
# Inside the flash-browser folder, run:
npm install
```

This will download Electron and other required packages. It may take a few minutes.

### Step 4: Run the Browser

```bash
npm start
```

The Flash Browser window will open!

## How to Use

### Playing a Flash Game

1. **Start the browser:**
   ```bash
   npm start
   ```

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

### Example: Playing a Flash Game

```bash
# 1. Open terminal in flash-browser folder
cd flash-browser

# 2. Start the browser
npm start

# 3. In the browser window, enter your game URL:
#    Example: http://yourgame.com/play

# 4. Login with your account

# 5. Select your server

# 6. Game loads and plays!
```

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

### "Couldn't load plugin"
- Make sure you're using Electron 11 (check `package.json`)
- Verify `plugins/libpepflashplayer.so` exists
- Try reinstalling: `rm -rf node_modules && npm install`

### Game says "Flash not detected" or "Install CocCoc/UC Browser"
- This should be handled automatically by `game-preload.js`
- Check browser console (F12) for errors
- Make sure you're using the latest version of this browser

### GPU crash on startup / Black screen
- Already handled with `--disable-gpu` flag
- If still happening, try: `npm start -- --disable-gpu`

### "Cannot find module 'electron'"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Browser opens but shows blank/white screen
```bash
# Check for errors
npm start

# Look at terminal output for error messages
```

## Updating

To get the latest version:

```bash
cd flash-browser
git pull
npm install
npm start
```

## Uninstalling

Simply delete the `flash-browser` folder:

```bash
rm -rf flash-browser
```

## Supported Games

This browser works with Flash games that:
- Require login and server selection
- Check for Flash using `swfobject`
- Require specific browsers (CocCoc, UC Browser, Coowon)
- Use online/cloud databases
- Vietnamese Flash games (tested with chanlong.gaba.vn)

## Keywords

Flash player Linux, Flash games Linux, Flash browser Debian, Flash browser Ubuntu, PepperFlash Linux, play Flash games 2024, swfobject bypass, CocCoc browser alternative, UC Browser Flash Linux, Coowon Linux, Flash web games Linux, Electron Flash player, choi game flash tren linux, trinh duyet flash linux

## License

MIT

## Credits

- PepperFlash plugin from [Hadaward/flashplayer-plugin](https://github.com/Hadaward/flashplayer-plugin)
