# Twitter to Bluesky Search Extension

A Chrome/Firefox extension that enhances Twitter browsing by adding quick search buttons to find Twitter users on Bluesky (bsky.app). When searching on Bluesky, it automatically switches to the "People" tab to help you find profiles faster.

## Features

- Adds search icons next to Twitter usernames and display names:
  - "T" icon next to display names
  - "@" icon next to usernames
- Clicking an icon:
  - Opens Bluesky search in a new tab
  - Automatically switches to the "People" tab
  - Searches for the corresponding name/username
- Works seamlessly with Twitter's dynamic content loading
- Supports both twitter.com and x.com domains
- Available for both Chrome and Firefox

## Project Structure

├── src/                  # Source files
│   ├── content.js        # Twitter page content script
│   ├── bsky-handler.js   # Bluesky search page handler
│   └── icons/           # Extension icons
│       ├── icon16.png
│       ├── icon32.png
│       ├── icon48.png
│       └── icon128.png
├── manifest/             # Browser-specific manifests
│   ├── manifest.json     # Chrome manifest
│   └── manifest.firefox.json  # Firefox manifest
├── dist/                 # Built extensions (gitignored)
│   ├── chrome/          # Chrome extension build
│   ├── firefox/         # Firefox extension build
│   └── packages/        # Ready-to-install packages
│       ├── chrome-extension.zip
│       └── firefox-extension.zip
└── package.json         # Build scripts and dependencies

## Development Setup

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Build the extensions:

```bash
npm run build          # builds both Chrome and Firefox
# or individually:
npm run build:chrome   # builds Chrome only
npm run build:firefox  # builds Firefox only
```

The built extensions will be available in:
- `dist/chrome/` - Unpacked Chrome extension
- `dist/firefox/` - Unpacked Firefox extension
- `dist/packages/chrome-extension.zip` - Packaged Chrome extension
- `dist/packages/firefox-extension.zip` - Packaged Firefox extension

## Installation

### Quick Install
1. Download the extension package for your browser:
   - [Chrome Extension Package](dist/packages/chrome-extension.zip)
   - [Firefox Extension Package](dist/packages/firefox-extension.zip)

2. For Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Either:
     - Drag and drop the downloaded ZIP file into the extensions page, or
     - Click "Load unpacked" and select the `dist/chrome` directory

3. For Firefox:
   - Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
   - Click "This Firefox" in the left sidebar
   - Either:
     - Click "Load Temporary Add-on" and select the ZIP file, or
     - Click "Load Temporary Add-on" and select any file in the `dist/firefox` directory

### Development Installation
If you want to modify the extension or contribute to development:

1. Clone this repository
2. Follow the Development Setup instructions above
3. Make your changes to the source files in `src/`
4. Run `npm run build` to rebuild
5. Load the unpacked extension from `dist/chrome` or `dist/firefox`

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
MIT License 